import { Address, PublicClient, WalletClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type DepositAtomConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositAtomInputs = {
  args: [Address, bigint]
  value?: bigint
}

export async function depositAtom(
  config: DepositAtomConfig,
  inputs: DepositAtomInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account ?? null,
    address,
    abi: EthMultiVaultAbi,
    functionName: 'depositAtom',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
