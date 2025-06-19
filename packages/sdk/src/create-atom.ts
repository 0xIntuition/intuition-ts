import { ATOM_COST, multiVaultAbi } from '@0xintuition/protocol'

import { createPublicClient, Hex, http, WalletClient } from 'viem'

import { getMultiVaultAddressFromConnection } from './helpers/get-multivault-address-from-connection'

export async function createAtom(
  walletClient: WalletClient,
  inputs: [Hex],
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
    functionName: 'createAtom',
    args: inputs,
    value: value ?? BigInt(ATOM_COST),
  })

  return await walletClient.writeContract({
    ...request,
    account: walletClient.account ?? null,
  })
}
