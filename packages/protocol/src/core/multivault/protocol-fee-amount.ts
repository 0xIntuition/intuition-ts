import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { ReadConfig } from '../../types'

/**
 * Reads the protocol fee amount for a transaction from the MultiVault contract.
 * @param config Contract address and public client.
 * @param inputs Function args for the fee calculation.
 * @returns Protocol fee amount as returned by the contract.
 */
export async function multiVaultProtocolFeeAmount(
  config: ReadConfig,
  inputs: {
    args: ContractFunctionArgs<
      typeof MultiVaultAbi,
      'view',
      'protocolFeeAmount'
    >
  },
) {
  const { address, publicClient } = config
  const { args } = inputs

  return await publicClient.readContract({
    address,
    abi: MultiVaultAbi,
    functionName: 'protocolFeeAmount',
    args,
  })
}
