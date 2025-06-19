import { encodeFunctionData } from 'viem'

export function batchCreateTripleEncode(
  subjectId: bigint[],
  predicateId: bigint[],
  objectId: bigint[],
) {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'batchCreateTriple',
        inputs: [
          {
            name: 'subjectIds',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'predicateIds',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'objectIds',
            type: 'uint256[]',
            internalType: 'uint256[]',
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
    args: [subjectId, predicateId, objectId],
  })
}
