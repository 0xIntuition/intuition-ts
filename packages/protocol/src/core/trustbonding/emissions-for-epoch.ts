import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads emissions for a specific epoch from the TrustBonding contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the emissions query.
 * @returns Emissions data as returned by the contract.
 */
export async function trustBondingEmissionsForEpoch(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof TrustBondingAbi,
      'view',
      'emissionsForEpoch'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'emissionsForEpoch',
    args,
  })
}
