import { MultiVaultAbi } from '../../contracts'
import { ReadConfig } from '../../types'

export async function multiVaultGetTripleCost(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getTripleCost',
  })
}
