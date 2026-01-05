import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Converts assets to shares using the MultiVault `convertToShares` view.
 * @param config Contract address and public client.
 * @param inputs Function args for the conversion.
 * @returns Shares amount as returned by the contract.
 */
export async function multiVaultConvertToShares(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'convertToShares'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'convertToShares',
    args,
  })
}
