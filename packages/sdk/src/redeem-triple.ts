import { multiVaultAbi } from '@0xintuition/protocol'

import { Address, createPublicClient, http, WalletClient } from 'viem'

import { getMultiVaultAddressFromConnection } from './helpers/get-multivault-address-from-connection'

export async function redeemTriple(
  walletClient: WalletClient,
  inputs: [bigint, Address, bigint],
) {
  const _contractAddress = getMultiVaultAddressFromConnection(walletClient)
  const _publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(),
  })

  const { request } = await _publicClient.simulateContract({
    address: _contractAddress,
    abi: multiVaultAbi,
    functionName: 'redeemTriple',
    args: inputs,
  })

  return await walletClient.writeContract({
    ...request,
    account: walletClient.account ?? null,
  })
}
