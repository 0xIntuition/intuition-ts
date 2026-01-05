import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the triple configuration from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Triple configuration struct from the contract.
 */
export async function multiVaultGetTripleConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getTripleConfig',
  })
}
