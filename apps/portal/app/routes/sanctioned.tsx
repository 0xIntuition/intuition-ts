import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import { SessionContext } from '@middleware/session'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { mainnetClient } from '@server/viem'

export async function loader({ context }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  const user = session.get('user')

  const isSanctioned = user?.details?.wallet?.address
    ? ((await mainnetClient.readContract({
        address: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb',
        abi: chainalysisOracleAbi,
        functionName: 'isSanctioned',
        args: [user?.details?.wallet?.address],
      })) as boolean)
    : false

  if (!isSanctioned) {
    return redirect('/')
  }
}

export default function Sanctioned() {
  return (
    <div className="mt-16 flex h-full w-full flex-col items-center gap-8">
      <div className="flex w-[92vw] max-w-[728px] flex-col items-center justify-center gap-8 p-16 text-center">
        Sanctioned!
      </div>
    </div>
  )
}
