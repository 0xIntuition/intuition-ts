import type { Address, Hex, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type BatchCreateAtomConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type BatchCreateAtomInputs = {
  args: [Hex[]]
  value?: bigint
}

export async function batchCreateAtom(
  config: BatchCreateAtomConfig,
  inputs: BatchCreateAtomInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    address,
    abi: EthMultiVaultAbi,
    functionName: 'batchCreateAtom',
    args,
    value,
  })

  return await walletClient.writeContract({
    ...request,
    account: walletClient.account ?? null,
  })
}
