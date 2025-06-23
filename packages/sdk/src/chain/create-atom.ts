import { ATOM_COST, EthMultiVaultAbi } from '@0xintuition/protocol'

import { Address, Hex, PublicClient, WalletClient } from 'viem'

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
    value: value ?? BigInt(ATOM_COST),
  })

  return await config.walletClient.writeContract(request)
}
