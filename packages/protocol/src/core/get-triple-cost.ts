import type { Address, PublicClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type GetTripleCostConfig = {
  address: Address
  publicClient: PublicClient
}

export async function getTripleCost(
  config: GetTripleCostConfig,
) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getTripleCost',
  })
}
