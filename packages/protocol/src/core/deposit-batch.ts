import type { Address, Hex, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type DepositBatchConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositBatchInputs = {
  args: [Address, Hex[], bigint[], bigint[], bigint[]]
  value: bigint
}

export async function depositBatch(
  config: DepositBatchConfig,
  inputs: DepositBatchInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'depositBatch',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
