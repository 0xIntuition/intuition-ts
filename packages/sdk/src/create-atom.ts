import { ATOM_COST, multiVaultAbi } from '@0xintuition/protocol'

import { Address, createPublicClient, Hex, http, WalletClient } from 'viem'

import { getMultiVaultAddressFromConnection } from './helpers/get-multivault-address-from-connection'

export async function createAtom(
  config: {
    walletClient: WalletClient
    address?: Address
  },
  inputs: [Hex],
  value?: bigint,
) {
  const _contractAddress = getMultiVaultAddressFromConnection(
    config.walletClient,
    config.address,
  )
  const _publicClient = createPublicClient({
    chain: config.walletClient.chain,
    transport: http(),
  })

  const { request } = await _publicClient.simulateContract({
    account: config.walletClient.account ?? null,
    address: _contractAddress,
    abi: multiVaultAbi,
    functionName: 'createAtom',
    args: inputs,
    value: value ?? BigInt(ATOM_COST),
  })

  return await config.walletClient.writeContract({
    ...request,
    account: config.walletClient.account ?? null,
  })
}
