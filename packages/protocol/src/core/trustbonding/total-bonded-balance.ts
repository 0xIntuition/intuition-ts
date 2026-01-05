import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads total bonded balance from the TrustBonding contract.
 * @param config Contract address and public client.
 * @returns Total bonded balance as returned by the contract.
 */
export async function trustBondingTotalBondedBalance(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'totalBondedBalance',
  })
}
