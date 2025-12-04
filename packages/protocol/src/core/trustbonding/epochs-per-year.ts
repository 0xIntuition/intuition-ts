import { TrustBondingAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function trustBondingEpochsPerYear(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: TrustBondingAbi,
    functionName: 'epochsPerYear',
  })
}
