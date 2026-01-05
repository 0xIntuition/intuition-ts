import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type PreviewRedeemCurveInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewRedeem'>
}

/**
 * Previews the result of a redeem using the MultiVault `previewRedeem` view.
 * @param config Contract address and viem clients (account used for simulation).
 * @param inputs Function args for the preview call.
 * @returns Previewed assets and fees as returned by the contract.
 */
export async function multiVaultPreviewRedeem(
  config: WriteConfig,
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
