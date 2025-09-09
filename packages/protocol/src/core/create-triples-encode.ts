import { Hex, encodeFunctionData } from 'viem'
import { MultiVaultAbi } from '../contracts'

export function createTriplesEncode(
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
