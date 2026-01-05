import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the previous epoch from the TrustBonding contract.
 * @param config Contract address and public client.
 * @returns Previous epoch as returned by the contract.
 */
export async function trustBondingPreviousEpoch(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'previousEpoch',
  })
}
