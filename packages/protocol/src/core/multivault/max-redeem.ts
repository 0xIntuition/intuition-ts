import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the maximum redeemable shares for a user and term from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the max redeem query.
 * @returns Maximum redeemable shares as returned by the contract.
 */
export async function multiVaultMaxRedeem(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'maxRedeem'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'maxRedeem',
    args,
  })
}
