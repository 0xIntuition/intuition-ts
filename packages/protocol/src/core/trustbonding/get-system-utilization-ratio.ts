import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the system utilization ratio from the TrustBonding contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the utilization query.
 * @returns System utilization ratio as returned by the contract.
 */
export async function trustBondingGetSystemUtilizationRatio(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof TrustBondingAbi,
      'view',
      'getSystemUtilizationRatio'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'getSystemUtilizationRatio',
    args,
  })
}
