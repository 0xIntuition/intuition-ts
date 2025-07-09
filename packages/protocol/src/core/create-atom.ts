import type { Address, Hex, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type CreateAtomConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type CreateAtomInputs = {
  args: [Hex]
  value?: bigint
}

export async function createAtom(
  config: CreateAtomConfig,
  inputs: CreateAtomInputs,
): Promise<Hex> {
  const { address, walletClient, publicClient } = config

  const { args, value } = inputs
  const { request } = await publicClient.simulateContract({
    account: walletClient.account ?? null,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'createAtom',
    args,
    value,
  })

  return await config.walletClient.writeContract(request)
}
