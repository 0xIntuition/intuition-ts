import { encodeFunctionData } from 'viem'

export function createTripleEncode(
  subjectId: bigint,
  predicateId: bigint,
  objectId: bigint,
) {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'createTriple',
        inputs: [
          {
            name: 'subjectId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'predicateId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'objectId',
            type: 'uint256',
            internalType: 'uint256',
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
    args: [subjectId, predicateId, objectId],
  })
}
