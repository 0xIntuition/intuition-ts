import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  defineChain,
} from 'viem'
import { ADMIN } from './constants'
import { getOrDeployAndInit } from './deploy'
import { mnemonicToAccount } from 'viem/accounts'
import { Multivault } from '@0xintuition/protocol'

const local = defineChain({
  id: 1337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
})

export const publicClient = createPublicClient({
  chain: local,
  transport: http(),
})

export const adminClient = createWalletClient({
  chain: local,
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
    value: parseEther('1'),
    to: account.address,
  })

  await publicClient.waitForTransactionReceipt({ hash })

  const wallet = createWalletClient({
    chain: local,
    transport: http(local.rpcUrls.default.http[0], { batch: true }),
    account,
  })

  // @ts-ignore
  const multivault = new Multivault({ public: publicClient, wallet }, address)

  return { multivault, account }
}
