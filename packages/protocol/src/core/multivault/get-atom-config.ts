import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the atom configuration from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Atom configuration struct from the contract.
 */
export async function multiVaultGetAtomConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getAtomConfig',
  })
}
