import { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type DepositTripleConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositTripleInputs = {
  args: [Address, bigint]
  value?: bigint
}

export async function depositTriple(
  config: DepositTripleConfig,
  inputs: DepositTripleInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'depositTriple',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
