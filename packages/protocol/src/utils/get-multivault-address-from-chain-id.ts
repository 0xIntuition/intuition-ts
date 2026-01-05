import type { Address } from 'viem'

import { getContractAddressFromChainId } from './get-contract-address-from-chain-id'

/**
 * Resolves the MultiVault contract address for a given chain ID.
 * @param chainId Chain ID for the deployment.
 * @returns MultiVault contract address.
 * @throws Error if the deployment is missing.
 */
export function getMultiVaultAddressFromChainId(chainId: number): Address {
  return getContractAddressFromChainId('MultiVault', chainId)
}
