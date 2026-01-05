import { MultiVaultAbi } from '../../contracts'
import { ReadConfig } from '../../types'

/**
 * Reads the base atom cost from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Base atom creation cost as returned by the contract.
 */
export async function multiVaultGetAtomCost(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getAtomCost',
  })
}
