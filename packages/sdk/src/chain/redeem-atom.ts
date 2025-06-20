import { multiVaultAbi } from '@0xintuition/protocol'

import { Address, PublicClient, WalletClient } from 'viem'

export type RedeemAtomConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type RedeemAtomArgs = {
  args: [bigint, Address, bigint]
}

export async function redeemAtom(
  config: RedeemAtomConfig,
  inputs: RedeemAtomArgs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: multiVaultAbi,
    functionName: 'redeemAtom',
    args,
  })

  return await walletClient.writeContract(request)
}
