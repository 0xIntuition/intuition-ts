import { encodeFunctionData, Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

export function multiVaultCreateTriplesEncode(
  subjectIds: Hex[],
  predicateIds: Hex[],
  objectIds: Hex[],
  assets: bigint[],
) {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'createTriples',
    args: [subjectIds, predicateIds, objectIds, assets],
  })
}
