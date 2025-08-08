import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type BatchRedeemCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type BatchRedeemCurveInputs = {
  args: [bigint, Address, bigint[], bigint[]]
}

export async function batchRedeemCurve(
  config: BatchRedeemCurveConfig,
  inputs: BatchRedeemCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'batchRedeemCurve',
    args,
  })

  return await walletClient.writeContract(request)
}
