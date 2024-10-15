import { Button } from '@0xintuition/1ui'

import PrivyLogout from '@client/privy-logout'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { User as PrivyUser } from '@privy-io/react-auth'
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser, requireUserWallet } from '@server/auth'
import { baseSepolia } from 'viem/chains'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('[Loader] Entering app loader')

  const wallet = await requireUserWallet(request)
  const user = await getUser(request)
  logger('wallet', wallet)
  logger('user', user)
  invariant(wallet, 'Unauthorized')

  return json({
    wallet,
    user,
  })
}

export default function Playground() {
  const { wallet, user } = useLoaderData<{ wallet: string; user: PrivyUser }>()

  const smartWallet = user.linkedAccounts.find(
    (account) => account.type === 'smart_wallet',
  )
  const { client } = useSmartWallets()

  const sendTx = async () => {
    if (!client) {
      console.error('No smart account client found')
      return
    }

    logger('client', client)
    const txHash = await client.sendTransaction({
      account: client.account,
      chain: baseSepolia,
      to: '0x25709998B542f1Be27D19Fa0B3A9A67302bc1b94',
      value: BigInt(1000000000000000), // 0.001 ETH in wei
    })

    logger('txHash', txHash)
  }

  const signMessage = async () => {
    if (!client) {
      console.error('No smart account client found')
      return
    }

    await client.signMessage({
      message: 'Do u want to build a smart dapp?',
    })
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <pre>Smart Wallet: {smartWallet?.address || ''}</pre>
      <div className="flex items-center gap-2">
        <Button onClick={signMessage}>Sign Message</Button>
        <Button onClick={sendTx}>Send Tx</Button>
      </div>
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
