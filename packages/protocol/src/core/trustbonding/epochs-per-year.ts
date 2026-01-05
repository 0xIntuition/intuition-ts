import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the number of epochs per year from the TrustBonding contract.
 * @param config Contract address and public client.
 * @returns Epochs per year as returned by the contract.
 */
export async function trustBondingEpochsPerYear(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'epochsPerYear',
  })
}
