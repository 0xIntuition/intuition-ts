import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the current epoch from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Current epoch as returned by the contract.
 */
export async function multiVaultCurrentEpoch(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'currentEpoch',
  })
}
