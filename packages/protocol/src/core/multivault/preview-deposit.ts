import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type PreviewDepositCurveInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewDeposit'>
}

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
