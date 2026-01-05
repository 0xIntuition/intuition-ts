import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the epoch length from the TrustBonding contract.
 * @param config Contract address and public client.
 * @returns Epoch length as returned by the contract.
 */
export async function trustBondingEpochLength(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof TrustBondingAbi, 'view', 'epochLength'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'epochLength',
    args,
  })
}
