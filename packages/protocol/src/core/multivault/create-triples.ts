import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type CreateTriplesInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'payable', 'createTriples'>
  value?: bigint
}

export async function multiVaultCreateTriples(
  config: WriteConfig,
  inputs: CreateTriplesInputs,
) {
  if (
    inputs.args[0].length !== inputs.args[1].length ||
    inputs.args[0].length !== inputs.args[2].length ||
    inputs.args[0].length !== inputs.args[3].length
  ) {
    throw new Error('All input arrays must have the same length')
  }

  const { address, walletClient, publicClient } = config
  const { args, value } = inputs
  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'createTriples',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
