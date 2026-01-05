import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the inverse triple ID for a given triple from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the inverse triple lookup.
 * @returns Inverse triple ID as returned by the contract.
 */
export async function multiVaultGetInverseTripleId(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'getInverseTripleId'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getInverseTripleId',
    args,
  })
}
