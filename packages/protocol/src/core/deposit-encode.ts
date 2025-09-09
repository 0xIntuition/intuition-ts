import { encodeFunctionData, type Address, type Hex } from 'viem'
import { MultiVaultAbi } from '../contracts'

export function depositEncode(receiver: Address, id: Hex, assets: bigint, minShares: bigint): Hex {
  return encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'deposit',
    args: [receiver, id, assets, minShares],
  })
}
