import type { ContractFunctionArgs } from 'viem'

import { WrappedTrustAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type WrappedTrustWithdrawInputs = {
  args: ContractFunctionArgs<typeof WrappedTrustAbi, 'nonpayable', 'withdraw'>
}

/**
 * Simulates and submits a WrappedTrust `withdraw` transaction.
 * @param config Contract address and viem clients.
 * @param inputs Function args for the withdrawal.
 * @returns Transaction hash from the wallet client.
 */
export async function wrappedTrustWithdraw(
  config: WriteConfig,
  inputs: WrappedTrustWithdrawInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: WrappedTrustAbi,
    functionName: 'withdraw',
    args,
  })

  return await walletClient.writeContract(request)
}
