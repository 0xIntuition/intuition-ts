import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type RedeemAtomCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type RedeemAtomCurveInputs = {
  args: [bigint, Address, bigint, bigint]
  value?: bigint
}

export async function redeemAtomCurve(
  config: RedeemAtomCurveConfig,
  inputs: RedeemAtomCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'redeemAtomCurve',
    args,
  })

  return await walletClient.writeContract(request)
}
