import { MultiVaultAbi } from '../contracts'
import type { ReadConfig } from '../types'

export async function getAtom(
  config: ReadConfig,
  inputs: {
    args: [`0x${string}`]
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getAtom',
    args,
  })
}
