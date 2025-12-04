import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function trustBondingHasClaimedRewardsForEpoch(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof TrustBondingAbi,
      'view',
      'hasClaimedRewardsForEpoch'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'hasClaimedRewardsForEpoch',
    args,
  })
}
