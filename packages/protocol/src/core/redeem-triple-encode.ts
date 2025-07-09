import { encodeFunctionData, type Address, type Hex } from 'viem'

export function redeemTripleEncode(
  shares: bigint,
  receiver: Address,
  id: bigint,
): Hex {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'redeemTriple',
        inputs: [
          { name: 'shares', type: 'uint256', internalType: 'uint256' },
          { name: 'receiver', type: 'address', internalType: 'address' },
          { name: 'id', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'nonpayable',
      },
    ],
    args: [shares, receiver, id],
  })
}
