import { multiVaultAbi, TRIPLE_COST } from '@0xintuition/protocol'

import { createPublicClient, http, WalletClient } from 'viem'

import { getMultiVaultAddressFromConnection } from './helpers/get-multivault-address-from-connection'

export async function batchCreateTriple(
  walletClient: WalletClient,
  inputs: [bigint[], bigint[], bigint[]],
  value?: bigint,
) {
  const _contractAddress = getMultiVaultAddressFromConnection(walletClient)
  const _publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(),
  })

  const { request } = await _publicClient.simulateContract({
    address: _contractAddress,
    abi: multiVaultAbi,
    functionName: 'batchCreateTriple',
    args: inputs,
    value: value ?? BigInt(TRIPLE_COST * inputs[0].length),
  })

  return await walletClient.writeContract({
    ...request,
    account: walletClient.account ?? null,
  })
}
