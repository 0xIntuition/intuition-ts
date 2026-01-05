import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the vault type for a given term from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the vault type lookup.
 * @returns Vault type as returned by the contract.
 */
export async function multiVaultGetVaultType(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'getVaultType'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getVaultType',
    args,
  })
}
