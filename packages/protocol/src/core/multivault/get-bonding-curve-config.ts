import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function getBondingCurveConfig(config: ReadConfig) {
  const { address, publicClient } = config

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getBondingCurveConfig',
  })
}
