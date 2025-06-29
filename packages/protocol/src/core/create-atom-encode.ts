import { encodeFunctionData, Hex } from 'viem'

export function createAtomEncode(atomUri: Hex) {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'createAtom',
        inputs: [
          {
            name: 'atomUri',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
        stateMutability: 'payable',
      },
    ],
    args: [atomUri],
  })
}
