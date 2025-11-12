import { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../contracts'
import type { ReadConfig } from '../types'

export async function getTriple(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<typeof MultiVaultAbi, 'view', 'getTriple'>
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getTriple',
    args,
  })
}
