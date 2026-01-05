import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type PreviewAtomCreateInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewAtomCreate'>
}

/**
 * Previews atom creation costs using the MultiVault `previewAtomCreate` view.
 * @param config Contract address and viem clients (account used for simulation).
 * @param inputs Function args for the preview call.
 * @returns Previewed costs as returned by the contract.
 */
export async function multiVaultPreviewAtomCreate(
  config: WriteConfig,
  inputs: PreviewAtomCreateInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'previewAtomCreate',
    args,
  })
}
