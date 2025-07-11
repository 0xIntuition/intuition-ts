import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type CreateTripleConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type CreateTripleInputs = {
  args: [bigint, bigint, bigint]
  value?: bigint
}

export async function createTriple(
  config: CreateTripleConfig,
  inputs: CreateTripleInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account ?? null,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'createTriple',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
