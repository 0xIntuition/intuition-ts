import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type DepositAtomCurveConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositAtomCurveInputs = {
  args: [Address, bigint, bigint]
  value?: bigint
}

export async function depositAtomCurve(
  config: DepositAtomCurveConfig,
  inputs: DepositAtomCurveInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'depositAtomCurve',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
