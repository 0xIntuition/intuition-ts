import { deployments } from '@0xintuition/protocol'

import { Hex, WalletClient } from 'viem'

export function getMultiVaultAddressFromConnection(walletClient: WalletClient) {
  if (!walletClient || !walletClient?.chain) {
    throw new Error('Wallet client is required to batch create atoms')
  }

  const contractAddress = deployments[walletClient.chain.id]
  if (!contractAddress) {
    throw new Error(
      `No contract address found for chain ID ${walletClient.chain.id}`,
    )
  }

  return contractAddress as Hex
}
