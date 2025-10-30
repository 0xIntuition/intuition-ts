import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../contracts'
import { WriteConfig } from '../types'

export type DepositBatchInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'payable', 'depositBatch'>
  value: bigint
}

export async function depositBatch(
  config: WriteConfig,
  inputs: DepositBatchInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'depositBatch',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
