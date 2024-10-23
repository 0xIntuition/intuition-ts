import { useCallback } from 'react'

import { Button } from '@0xintuition/1ui'

import PrivyLogout from '@client/privy-logout'
import { multivaultAbi } from '@lib/abis/multivault'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
// import { User as PrivyUser } from '@privy-io/react-auth'
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'
import { User } from '@privy-io/server-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser, requireUserWallet } from '@server/auth'
import { encodeFunctionData, toHex } from 'viem'
import { baseSepolia } from 'viem/chains'

function hasSmartWallet(user: User | null): boolean {
  if (!user) {
    return false
  }

  if ('smartWallet' in user && user.smartWallet) {
    return true
  }

  const externalWallet = user.linkedAccounts.find(
    (account) =>
      account.type === 'wallet' && account.connectorType === 'injected',
  )

  return !externalWallet
}

export async function loader({ request }: LoaderFunctionArgs) {
  logger('[Loader] Entering app loader')

  const wallet = await requireUserWallet(request)
  const user = await getUser(request)
  logger('wallet', wallet)
  logger('user', user)
  invariant(wallet, 'Unauthorized')

  const userHasSmartWallet = hasSmartWallet(user)
  logger('userHasSmartWallet', userHasSmartWallet)

  // const transactions = [
  //   {
  //     to: '0x25709998B542f1Be27D19Fa0B3A9A67302bc1b94',
  //     value: '300000000000000', // 0.0003 ETH in wei
  //   },
  //   {
  //     to: '0x25709998B542f1Be27D19Fa0B3A9A67302bc1b94',
  //     value: '200000000000000', // 0.0002 ETH in wei
  //   },
  //   {
  //     to: '0x25709998B542f1Be27D19Fa0B3A9A67302bc1b94',
  //     value: '100000000000000', // 0.0001 ETH in wei
  //   },
  // ]

  // when we want to interact with our contract, we'd do it with this format:

  const atomTransactions = [
    {
      to: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665', // multivault contract address
      data: encodeFunctionData({
        abi: multivaultAbi,
        functionName: 'batchCreateAtom',
        args: [[toHex('jpTest7'), toHex('jpTest7b')]],
      }),
      value: '600200002000000',
    },
    {
      to: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665', // multivault contract address
      data: encodeFunctionData({
        abi: multivaultAbi,
        functionName: 'batchCreateAtom',
        args: [[toHex('jojiTest7'), toHex('jojiTest7b')]],
      }),
      value: '600200002000000',
    },
  ]

  return json({
    wallet,
    user,
    atomTransactions,
    userHasSmartWallet,
  })
}

type AtomTransaction = {
  to: string
  data: string
  value: string
}
export default function Playground() {
  const { wallet, user, atomTransactions, userHasSmartWallet } = useLoaderData<{
    wallet: string
    user: User
    atomTransactions: AtomTransaction[]
    userHasSmartWallet: boolean
  }>()

  logger('user has smart wallet', userHasSmartWallet)
  // const smartWallet = user.linkedAccounts.find(
  //   (account) => account.type === 'smart_wallet',
  // )

  const { client } = useSmartWallets()

  logger('user', user)

  const sendBatchTx = useCallback(async () => {
    if (!client) {
      console.error('No smart account client found')
      return
    }

    const txHash = await client.sendTransaction({
      account: client.account,
      calls: atomTransactions.map((tx) => ({
        to: tx.to as `0x${string}`,
        data: tx.data as `0x${string}`,
        value: BigInt(tx.value),
      })),
    })
    logger('batch txHash', txHash)
  }, [client, atomTransactions])

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
      value: BigInt(500000000000000), // 0.0005 ETH in wei
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
      {/* <pre>Smart Wallet: {smartWallet?.address || ''}</pre> */}
      <div className="flex items-center gap-2">
        <Button onClick={signMessage}>Sign Message</Button>
        <Button onClick={sendTx}>Send Tx</Button>
        <Button onClick={sendBatchTx}>Send Batch Tx</Button>
      </div>
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
