import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../contracts'

export function redeemBatchEncode(
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
