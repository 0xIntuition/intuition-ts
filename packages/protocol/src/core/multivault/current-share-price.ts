import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the current share price from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the share price lookup.
 * @returns Share price as returned by the contract.
 */
export async function multiVaultCurrentSharePrice(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'currentSharePrice'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'currentSharePrice',
    args,
  })
}
