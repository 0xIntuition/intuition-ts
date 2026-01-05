import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Checks whether a term ID represents a counter triple in the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the check.
 * @returns True if the term is a counter triple, as returned by the contract.
 */
export async function multiVaultIsCounterTriple(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'isCounterTriple'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'isCounterTriple',
    args,
  })
}
