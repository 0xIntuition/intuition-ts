import type { Address, PublicClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type GetAtomCostConfig = {
  address: Address
  publicClient: PublicClient
}

export async function getAtomCost(
  config: GetAtomCostConfig,
) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getAtomCost',
  })
}
