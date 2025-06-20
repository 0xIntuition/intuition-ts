import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { anvil } from 'viem/chains'

import { ALICE_PK } from './constants'

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
})

export const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
  account: privateKeyToAccount(ALICE_PK),
})
