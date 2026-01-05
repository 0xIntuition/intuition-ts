import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the exit fee amount for a redemption from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the fee calculation.
 * @returns Exit fee amount as returned by the contract.
 */
export async function multiVaultExitFeeAmount(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'exitFeeAmount'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'exitFeeAmount',
    args,
  })
}
