import { encodeFunctionData, type Hex } from 'viem'

export function batchCreateAtomEncode(atomUri: Hex[]) {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'batchCreateAtom',
        inputs: [
          {
            name: 'atomUris',
            type: 'bytes[]',
            internalType: 'bytes[]',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
        ],
        stateMutability: 'payable',
      },
    ],
    args: [atomUri],
  })
}
