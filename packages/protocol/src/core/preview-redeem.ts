import type { Address, Hex, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type PreviewRedeemCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type PreviewRedeemCurveInputs = {
  args: [Hex, bigint, bigint]
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
    abi: MultiVaultAbi,
    functionName: 'previewRedeem',
    args,
  })
}
