import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type PreviewRedeemCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type PreviewRedeemCurveInputs = {
  args: [bigint, bigint, bigint]
}

export async function previewRedeemCurve(
  config: PreviewRedeemCurveConfig,
  inputs: PreviewRedeemCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'previewRedeemCurve',
    args,
  })
}
