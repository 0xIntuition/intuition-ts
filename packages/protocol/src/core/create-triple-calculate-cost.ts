import type { Address, PublicClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type CreateTripleCalculateBaseCost = {
  address: Address
  publicClient: PublicClient
}

export async function createTripleCalculateBaseCost(
  config: CreateTripleCalculateBaseCost,
) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: EthMultiVaultAbi,
    functionName: 'getTripleCost',
  })
}
