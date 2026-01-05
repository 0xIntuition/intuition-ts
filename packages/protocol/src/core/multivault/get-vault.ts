import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads a vault struct from the MultiVault `getVault` view function.
 * @param config Contract address and public client.
 * @param inputs Function args for the vault lookup.
 * @returns Contract response for the vault.
 */
export async function multiVaultGetVault(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'getVault'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getVault',
    args,
  })
}
