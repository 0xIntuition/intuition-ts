import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

/**
 * Encodes calldata for the MultiVault `deposit` function.
 * @param receiver Address that will receive the shares.
 * @param termId Term ID to deposit into.
 * @param curveId Bonding curve ID for the deposit.
 * @param minShares Minimum shares to accept.
 * @returns Hex-encoded calldata for `deposit`.
 */
export function multiVaultDepositEncode(
  receiver: Address,
  termId: Hex,
  curveId: bigint,
  minShares: bigint,
): Hex {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'deposit',
    args: [receiver, termId, curveId, minShares],
  })
}
