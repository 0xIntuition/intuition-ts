import { encodeFunctionData, type Address, type Hex } from 'viem'

export function depositAtomEncode(receiver: Address, id: bigint): Hex {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'depositAtom',
        inputs: [
          { name: 'receiver', type: 'address', internalType: 'address' },
          { name: 'id', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'payable',
      },
    ],
    args: [receiver, id],
  })
}
