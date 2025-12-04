import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type PreviewAtomCreateInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewAtomCreate'>
}

export async function previewAtomCreate(
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
