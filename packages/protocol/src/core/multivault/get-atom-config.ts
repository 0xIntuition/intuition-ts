import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function getAtomConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getAtomConfig',
  })
}
