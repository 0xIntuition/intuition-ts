import { encodeFunctionData, type Hex } from 'viem'

import { MultiVaultAbi } from '../../contracts'

export function createAtomsEncode(data: Hex[], assets: bigint[]) {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'createAtoms',
    args: [data, assets],
  })
}
