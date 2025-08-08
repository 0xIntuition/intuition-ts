import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type RedeemTripleCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type RedeemTripleCurveInputs = {
  args: [bigint, Address, bigint, bigint]
}

export async function redeemTripleCurve(
  config: RedeemTripleCurveConfig,
  inputs: RedeemTripleCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'redeemTripleCurve',
    args,
  })

  return await walletClient.writeContract(request)
}
