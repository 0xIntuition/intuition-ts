import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function getUserUtilizationInEpoch(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'getUserUtilizationInEpoch'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getUserUtilizationInEpoch',
    args,
  })
}
