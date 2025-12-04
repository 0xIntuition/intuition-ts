import { encodeFunctionData, type Address, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

export function depositEncode(
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
