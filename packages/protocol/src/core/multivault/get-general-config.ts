import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the general configuration from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns General configuration struct from the contract.
 */
export async function multiVaultGetGeneralConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getGeneralConfig',
  })
}
