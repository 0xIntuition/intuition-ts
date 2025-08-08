import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type BatchDepositCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type BatchDepositCurveInputs = {
  args: [Address, bigint[], bigint[], bigint[]]
  value: bigint
}

export async function batchDepositCurve(
  config: BatchDepositCurveConfig,
  inputs: BatchDepositCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'batchDepositCurve',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
