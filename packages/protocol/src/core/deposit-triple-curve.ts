import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type DepositTripleCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositTripleCurveInputs = {
  args: [Address, bigint, bigint]
  value?: bigint
}

export async function depositTripleCurve(
  config: DepositTripleCurveConfig,
  inputs: DepositTripleCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'depositTripleCurve',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
