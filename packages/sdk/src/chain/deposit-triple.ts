import { multiVaultAbi, TRIPLE_COST } from '@0xintuition/protocol'

import { Address, PublicClient, WalletClient } from 'viem'

export type DepositTripleConfig = {
  address: Address
  walletClient: WalletClient
  publicClient: PublicClient
}

export type DepositTripleInputs = {
  args: [Address, bigint]
  value?: bigint
}

export async function depositTriple(
  config: DepositTripleConfig,
  inputs: DepositTripleInputs,
) {
  const { address, walletClient, publicClient } = config
  const { args, value } = inputs

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address,
    abi: multiVaultAbi,
    functionName: 'depositTriple',
    args,
    value: value ?? BigInt(TRIPLE_COST),
  })

  return await walletClient.writeContract(request)
}
