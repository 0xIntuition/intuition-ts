import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

/**
 * Encodes calldata for the MultiVault `redeem` function.
 * @param receiver Address that will receive the assets.
 * @param termId Term ID to redeem from.
 * @param curveId Bonding curve ID for the redemption.
 * @param shares Shares to redeem.
 * @param minAssets Minimum assets to accept.
 * @returns Hex-encoded calldata for `redeem`.
 */
export function multiVaultRedeemEncode(
  receiver: Address,
  termId: Hex,
  curveId: bigint,
  shares: bigint,
  minAssets: bigint,
): Hex {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'redeem',
    args: [receiver, termId, curveId, shares, minAssets],
  })
}
