import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type RedeemTripleConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type RedeemTripleArgs = {
  args: [bigint, Address, bigint]
}

export async function redeemTriple(
  config: RedeemTripleConfig,
  inputs: RedeemTripleArgs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'redeemTriple',
    args,
  })

  return await walletClient.writeContract(request)
}
