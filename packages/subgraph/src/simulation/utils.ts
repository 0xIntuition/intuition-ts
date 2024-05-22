import { createPublicClient, createWalletClient, http, parseEther } from 'viem'
import { anvil } from 'viem/chains'
import { ADMIN } from './constants'
import { getOrDeployAndInit } from './deploy'
import { mnemonicToAccount } from 'viem/accounts'
import { Multivault } from '@0xintuition/protocol'

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
})

export const adminClient = createWalletClient({
  chain: anvil,
  transport: http(),
  account: ADMIN,
})

export async function getIntuition(accountIndex: number) {
  const account = mnemonicToAccount(
    'legal winner thank year wave sausage worth useful legal winner thank yellow',
    { accountIndex },
  )

  const address = await getOrDeployAndInit()

  // Faucet
  const hash = await adminClient.sendTransaction({
    account: ADMIN,
    value: parseEther('0.1'),
    to: account.address,
  })

  await publicClient.waitForTransactionReceipt({ hash })

  const wallet = createWalletClient({
    chain: anvil,
    transport: http(),
    account,
  })

  // @ts-ignore
  const multivault = new Multivault({ public: publicClient, wallet }, address)

  return { multivault, account }
}
