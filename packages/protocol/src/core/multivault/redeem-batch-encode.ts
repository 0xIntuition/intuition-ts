import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

/**
 * Encodes calldata for the MultiVault `redeemBatch` function.
 * @param receiver Address that will receive the assets.
 * @param termId Term IDs to redeem from.
 * @param curveId Bonding curve IDs for each redemption.
 * @param shares Shares to redeem per term.
 * @param minAssets Minimum assets to accept per term.
 * @returns Hex-encoded calldata for `redeemBatch`.
 */
export function multiVaultRedeemBatchEncode(
  receiver: Address,
  termId: Hex[],
  curveId: bigint[],
  shares: bigint[],
  minAssets: bigint[],
): Hex {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'redeemBatch',
    args: [receiver, termId, curveId, shares, minAssets],
  })
}
