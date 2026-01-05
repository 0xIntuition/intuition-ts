import { encodeFunctionData, Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

/**
 * Encodes calldata for the MultiVault `createTriples` function.
 * @param subjectIds Subject atom IDs.
 * @param predicateIds Predicate atom IDs.
 * @param objectIds Object atom IDs.
 * @param assets Asset amounts to deposit for each triple.
 * @returns Hex-encoded calldata for `createTriples`.
 */
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
