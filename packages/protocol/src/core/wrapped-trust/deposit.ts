import type { ContractFunctionArgs } from 'viem'

import { WrappedTrustAbi } from '../../contracts'
import type { WriteConfig } from '../../types'

export type WrappedTrustDepositInputs = {
  args: ContractFunctionArgs<typeof WrappedTrustAbi, 'payable', 'deposit'>
}

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
