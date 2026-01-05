import type { Address } from 'viem'

import { intuitionDeployments } from '../deployments'

/**
 * Resolves a deployed contract address by name and chain ID.
 * @param name Contract name to look up.
 * @param chainId Chain ID for the deployment.
 * @returns Contract address for the requested deployment.
 * @throws Error if the deployment is missing.
 */
export function getContractAddressFromChainId(
  name: 'MultiVault' | 'BondingCurveRegistry' | 'OffsetProgressiveCurve',
  chainId: number,
): Address {
  const address = intuitionDeployments[name]?.[chainId]
  if (!address) {
    throw new Error(`Contract ${name} not found for chain ID ${chainId}`)
  }
  return address
}
