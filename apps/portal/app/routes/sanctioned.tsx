import { Button, Icon } from '@0xintuition/1ui'

import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { mainnetClient } from '@server/viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)

  const isSanctioned = wallet
    ? ((await mainnetClient.readContract({
        address: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb',
        abi: chainalysisOracleAbi,
        functionName: 'isSanctioned',
        args: [wallet],
      })) as boolean)
    : false

  if (!isSanctioned) {
    return redirect('/')
  }
}

export default function Sanctioned() {
  return (
    <div className="mt-16 flex h-full w-full flex-col items-center">
      <div className="flex w-[92vw] max-w-[728px] flex-col p-16 max-w-xl gap-2.5">
        <div className="flex items-center text-secondary-foreground/70 gap-2">
          <Icon name="square-x" />
          <span>Access Restricted</span>
        </div>
        <h2 className="text-white text-semibold text-3xl lg:text-4xl">
          Wallet Address Sanctioned
        </h2>
        <p className="text-secondary-foreground/40 text-lg font-medium leading-6">
          We&apos;re sorry, but access to Intuition is restricted due to your
          wallet address being associated with a sanctioned entity. Please
          contact our support team for more information.
        </p>
        <p className="text-secondary-foreground/40 text-lg font-medium leading-6">
          In the meantime, join our Discord community to stay updated and
          connect with us!
        </p>
        <Button className="w-fit mt-3.5" variant="secondary">
          Join our Discord
        </Button>
      </div>
    </div>
  )
}
