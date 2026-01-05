import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type CreateAtomsInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'payable', 'createAtoms'>
  value?: bigint
}

/**
 * Simulates and submits a MultiVault `createAtoms` transaction.
 * @param config Contract address and viem clients.
 * @param inputs Function args and optional call value.
 * @returns Transaction hash from the wallet client.
 */
export async function multiVaultCreateAtoms(
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
