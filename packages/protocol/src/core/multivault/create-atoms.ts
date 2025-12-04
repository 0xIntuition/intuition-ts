import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type CreateAtomsInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'payable', 'createAtoms'>
  value?: bigint
}

export async function createAtoms(
  config: WriteConfig,
  inputs: CreateAtomsInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'createAtoms',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
