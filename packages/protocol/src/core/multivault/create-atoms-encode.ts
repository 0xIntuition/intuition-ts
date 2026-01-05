import { encodeFunctionData, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

/**
 * Encodes calldata for the MultiVault `createAtoms` function.
 * @param data Atom data payloads as hex.
 * @param assets Asset amounts to deposit for each atom.
 * @returns Hex-encoded calldata for `createAtoms`.
 */
export function multiVaultCreateAtomsEncode(data: Hex[], assets: bigint[]) {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'createAtoms',
    args: [data, assets],
  })
}
