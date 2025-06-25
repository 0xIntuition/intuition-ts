import { Address } from 'viem'

import { getContractAddressFromChainId } from './get-contract-address-from-chain-id'

export function getEthMultiVaultAddressFromChainId(chainId: number): Address {
  return getContractAddressFromChainId('EthMultiVault', chainId)
}
