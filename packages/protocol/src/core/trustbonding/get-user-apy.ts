import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the user APY from the TrustBonding contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the APY query.
 * @returns User APY as returned by the contract.
 */
export async function trustBondingGetUserApy(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof TrustBondingAbi, 'view', 'getUserApy'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'getUserApy',
    args,
  })
}
