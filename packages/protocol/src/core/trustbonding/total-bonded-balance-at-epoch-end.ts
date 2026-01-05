import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads total bonded balance at epoch end from the TrustBonding contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the epoch query.
 * @returns Total bonded balance as returned by the contract.
 */
export async function trustBondingTotalBondedBalanceAtEpochEnd(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof TrustBondingAbi,
      'view',
      'totalBondedBalanceAtEpochEnd'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'totalBondedBalanceAtEpochEnd',
    args,
  })
}
