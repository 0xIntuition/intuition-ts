import type { ContractFunctionArgs } from 'viem'

import { WrappedTrustAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type WrappedTrustDepositInputs = {
  args: ContractFunctionArgs<typeof WrappedTrustAbi, 'payable', 'deposit'>
}

/**
 * Simulates and submits a WrappedTrust `deposit` transaction.
 * @param config Contract address and viem clients.
 * @param inputs Function args for the deposit.
 * @returns Transaction hash from the wallet client.
 */
export async function wrappedTrustDeposit(
  config: WriteConfig,
  inputs: WrappedTrustDepositInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: WrappedTrustAbi,
    functionName: 'deposit',
    args,
  })

  return await walletClient.writeContract(request)
}
