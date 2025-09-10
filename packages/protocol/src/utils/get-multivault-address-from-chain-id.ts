import type { Address } from 'viem'
import { getContractAddressFromChainId } from './get-contract-address-from-chain-id'

export function getMultiVaultAddressFromChainId(chainId: number): Address {
  return getContractAddressFromChainId('MultiVault', chainId)
}
