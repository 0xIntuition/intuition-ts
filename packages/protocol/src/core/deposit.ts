import type { Address, ContractFunctionArgs, PublicClient, WalletClient } from 'viem'
import { MultiVaultAbi } from '../contracts'

export type DepositConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'payable', 'deposit'>
  value?: bigint
}

export async function deposit(
  config: DepositConfig,
  inputs: DepositInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'deposit',
    args,
    value,
  })

  return await walletClient.writeContract(request)
}
