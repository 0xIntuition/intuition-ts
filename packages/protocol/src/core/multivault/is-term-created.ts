import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Checks whether a term has been created in the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the check.
 * @returns True if the term exists, as returned by the contract.
 */
export async function multiVaultIsTermCreated(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'isTermCreated'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'isTermCreated',
    args,
  })
}
