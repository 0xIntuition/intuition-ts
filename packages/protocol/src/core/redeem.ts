import type {
  Address,
  ContractFunctionArgs,
  PublicClient,
  WalletClient,
} from 'viem'

import { MultiVaultAbi } from '../contracts'

export type RedeemConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type RedeemInputs = {
  args: ContractFunctionArgs<typeof MultiVaultAbi, 'nonpayable', 'redeem'>
}

export async function redeem(config: RedeemConfig, inputs: RedeemInputs) {
  const { address, walletClient, publicClient } = config
  const { args } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: MultiVaultAbi,
    functionName: 'redeem',
    args,
  })

  return await walletClient.writeContract(request)
}
