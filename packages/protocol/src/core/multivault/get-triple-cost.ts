import { MultiVaultAbi } from '../../contracts'
import { ReadConfig } from '../../types'

/**
 * Reads the base triple cost from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Base triple creation cost as returned by the contract.
 */
export async function multiVaultGetTripleCost(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getTripleCost',
  })
}
