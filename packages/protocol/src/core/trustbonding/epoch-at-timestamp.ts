import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the epoch index for a given timestamp from the TrustBonding contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the timestamp lookup.
 * @returns Epoch index as returned by the contract.
 */
export async function trustBondingEpochAtTimestamp(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof TrustBondingAbi,
      'view',
      'epochAtTimestamp'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'epochAtTimestamp',
    args,
  })
}
