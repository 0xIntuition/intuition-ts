import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the entry fee amount for a deposit from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the fee calculation.
 * @returns Entry fee amount as returned by the contract.
 */
export async function multiVaultEntryFeeAmount(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'entryFeeAmount'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'entryFeeAmount',
    args,
  })
}
