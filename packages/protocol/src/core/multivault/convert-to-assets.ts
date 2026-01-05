import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Converts shares to assets using the MultiVault `convertToAssets` view.
 * @param config Contract address and public client.
 * @param inputs Function args for the conversion.
 * @returns Assets amount as returned by the contract.
 */
export async function multiVaultConvertToAssets(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'convertToAssets'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'convertToAssets',
    args,
  })
}
