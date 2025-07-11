import type { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type BatchCreateTripleConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type BatchCreateTripleInputs = {
  args: [bigint[], bigint[], bigint[]]
  value?: bigint
}

export async function batchCreateTriple(
  config: BatchCreateTripleConfig,
  inputs: BatchCreateTripleInputs,
) {
  if (
    inputs.args[0].length !== inputs.args[1].length ||
    inputs.args[0].length !== inputs.args[2].length
  ) {
    throw new Error('All input arrays must have the same length')
  }

  const { address, walletClient, publicClient } = config
  const { args, value } = inputs
  const { request } = await publicClient.simulateContract({
    address,
    abi: EthMultiVaultAbi,
    functionName: 'batchCreateTriple',
    args,
    value,
  })

  return await walletClient.writeContract({
    ...request,
    account: walletClient.account ?? null,
  })
}
