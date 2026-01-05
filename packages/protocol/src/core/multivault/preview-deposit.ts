import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type PreviewDepositCurveInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewDeposit'>
}

/**
 * Previews the result of a deposit using the MultiVault `previewDeposit` view.
 * @param config Contract address and viem clients (account used for simulation).
 * @param inputs Function args for the preview call.
 * @returns Previewed shares and fees as returned by the contract.
 */
export async function multiVaultPreviewDeposit(
  config: WriteConfig,
  inputs: PreviewDepositCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'previewDeposit',
    args,
  })
}
