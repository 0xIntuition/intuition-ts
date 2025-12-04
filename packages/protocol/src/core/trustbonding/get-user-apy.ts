import type { ContractFunctionArgs } from 'viem'

import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

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
