import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../contracts'
import { WriteConfig } from '../types'

export type PreviewRedeemCurveInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'previewRedeem'>
}

export async function previewRedeem(
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
