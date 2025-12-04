import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

export async function atomDepositFractionAmount(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'atomDepositFractionAmount'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'atomDepositFractionAmount',
    args,
  })
}
