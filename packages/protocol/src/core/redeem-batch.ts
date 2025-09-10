import type { Address, ContractFunctionArgs, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type RedeemBatchConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type RedeemBatchInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'nonpayable', 'redeemBatch'>
}

export async function redeemBatch(
  config: RedeemBatchConfig,
  inputs: RedeemBatchInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'redeemBatch',
    args,
  })

  return await walletClient.writeContract(request)
}


