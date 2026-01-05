import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the system APY from the TrustBonding contract.
 * @param config Contract address and public client.
 * @returns System APY as returned by the contract.
 */
export async function trustBondingGetSystemApy(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'getSystemApy',
  })
}
