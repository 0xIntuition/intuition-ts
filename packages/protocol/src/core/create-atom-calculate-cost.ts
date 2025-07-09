import type { Address, PublicClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type CreateAtomCalculateBaseCost = {
  address: Address
  publicClient: PublicClient
}

export async function createAtomCalculateBaseCost(
  config: CreateAtomCalculateBaseCost,
) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: EthMultiVaultAbi,
    functionName: 'getAtomCost',
  })
}
