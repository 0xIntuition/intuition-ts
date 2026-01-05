import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads a user's utilization for an epoch from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the utilization query.
 * @returns Utilization data as returned by the contract.
 */
export async function multiVaultGetUserUtilizationForEpoch(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'getUserUtilizationForEpoch'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getUserUtilizationForEpoch',
    args,
  })
}
