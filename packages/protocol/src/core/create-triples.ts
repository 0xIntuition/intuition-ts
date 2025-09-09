import type { Address, Hex, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type CreateTriplesConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type CreateTriplesInputs = {
  args: [Hex[], Hex[], Hex[], bigint[]]
  value?: bigint
}

export async function batchCreateTriple(
  config: CreateTriplesConfig,
  inputs: CreateTriplesInputs,
) {
  if (
    inputs.args[0].length !== inputs.args[1].length ||
    inputs.args[0].length !== inputs.args[2].length ||
    inputs.args[0].length !== inputs.args[3].length
  ) {
    throw new Error('All input arrays must have the same length')
  }

  const { address, walletClient, publicClient } = config
  const { args, value } = inputs
  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'createTriples',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
