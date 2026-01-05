import type { ContractFunctionArgs } from 'viem'

import { MultiVaultAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type RedeemBatchInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'nonpayable', 'redeemBatch'>
}

/**
 * Simulates and submits a MultiVault `redeemBatch` transaction.
 * @param config Contract address and viem clients.
 * @param inputs Function args for batch redeeming shares.
 * @returns Transaction hash from the wallet client.
 */
export async function multiVaultRedeemBatch(
  config: WriteConfig,
  inputs: RedeemBatchInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'redeemBatch',
    args,
  })

  return await walletClient.writeContract(request)
}
