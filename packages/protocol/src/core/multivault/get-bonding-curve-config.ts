import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the bonding curve configuration from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Bonding curve configuration struct from the contract.
 */
export async function multiVaultGetBondingCurveConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getBondingCurveConfig',
  })
}
