import type { Address, Hex, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type CreateAtomsConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type CreateAtomsInputs = {
  args: [Hex[], bigint[]]
  value?: bigint
}

export async function batchCreateAtom(
  config: CreateAtomsConfig,
  inputs: CreateAtomsInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'createAtoms',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
