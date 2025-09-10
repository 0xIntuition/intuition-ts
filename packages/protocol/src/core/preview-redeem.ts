import type { Address, ContractFunctionArgs, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type PreviewRedeemCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type PreviewRedeemCurveInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewRedeem'>
}

export async function previewRedeem(
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
