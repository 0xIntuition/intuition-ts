import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function getUserLastActiveEpoch(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'getUserLastActiveEpoch'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'getUserLastActiveEpoch',
    args,
  })
}
