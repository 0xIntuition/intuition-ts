import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type DepositInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'payable', 'deposit'>
  value?: bigint
}

export async function multiVaultDeposit(
  config: WriteConfig,
  inputs: DepositInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'deposit',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
