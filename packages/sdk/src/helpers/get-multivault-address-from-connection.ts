import { deployments } from '@0xintuition/protocol'

import { Address, Hex, WalletClient } from 'viem'

export function getMultiVaultAddressFromConnection(
  walletClient: WalletClient,
  address?: Address,
) {
  if (!walletClient || !walletClient?.chain) {
    throw new Error('Wallet client is required to batch create atoms')
  }

  const contractAddress = address ? address : deployments[walletClient.chain.id]
  if (!contractAddress) {
    throw new Error(
      `No contract address found for chain ID ${walletClient.chain.id}`,
    )
  }

  return contractAddress as Hex
}
