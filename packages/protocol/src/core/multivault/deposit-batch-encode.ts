import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

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
