import type { Address } from 'viem'

import { intuitionDeployments } from '../deployments'

export function getContractAddressFromChainId(
  name: 'EthMultiVault' | 'BondingCurveRegistry' | 'OffsetProgressiveCurve',
  chainId: number,
): Address {
  const address = intuitionDeployments[name]?.[chainId]
  if (!address) {
    throw new Error(`Contract ${name} not found for chain ID ${chainId}`)
  }
  return address
}
