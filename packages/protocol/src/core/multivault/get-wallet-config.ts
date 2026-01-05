import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the wallet configuration from the MultiVault contract.
 * @param config Contract address and public client.
 * @returns Wallet configuration struct from the contract.
 */
export async function multiVaultGetWalletConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getWalletConfig',
  })
}
