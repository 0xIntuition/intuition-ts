import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the current epoch from the TrustBonding contract.
 * @param config Contract address and public client.
 * @returns Current epoch as returned by the contract.
 */
export async function trustBondingCurrentEpoch(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'currentEpoch',
  })
}
