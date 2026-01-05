import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

/**
 * Encodes calldata for the MultiVault `depositBatch` function.
 * @param receiver Address that will receive the shares.
 * @param termId Term IDs to deposit into.
 * @param curveId Bonding curve IDs for each deposit.
 * @param assets Asset amounts to deposit per term.
 * @param minShares Minimum shares to accept per term.
 * @returns Hex-encoded calldata for `depositBatch`.
 */
export function multiVaultDepositBatchEncode(
  receiver: Address,
  termId: Hex[],
  curveId: bigint[],
  assets: bigint[],
  minShares: bigint[],
): Hex {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'depositBatch',
    args: [receiver, termId, curveId, assets, minShares],
  })
}
