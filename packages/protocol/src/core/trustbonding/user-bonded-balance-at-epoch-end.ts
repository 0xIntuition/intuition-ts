import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads a user's bonded balance at epoch end from the TrustBonding contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the epoch query.
 * @returns User bonded balance as returned by the contract.
 */
export async function trustBondingUserBondedBalanceAtEpochEnd(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof TrustBondingAbi,
      'view',
      'userBondedBalanceAtEpochEnd'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'userBondedBalanceAtEpochEnd',
    args,
  })
}
