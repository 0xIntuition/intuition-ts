import {
    batchCreateAtom,
    createAtomCalculateBaseCost,
    CreateAtomConfig,
} from '@0xintuition/protocol'

import { Address, getAddress, toHex } from 'viem'

export async function batchCreateEthereumAccount(
  config: CreateAtomConfig,
  data: {
    address: Address
    chainId?: number
  }[],
  depositAmount?: bigint,
) {
  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: multivaultAddress,
  })

  const results: `0x${string}`[] = []
  for (const item of data) {
    let uriRef: string
    if (!item.chainId) {
      uriRef = getAddress(item.address)
    } else {
      uriRef = `caip10:eip155:${item.chainId}:${getAddress(item.address)}`
    }
    results.push(toHex(uriRef))
  }

  const depositAmountPerAccount = depositAmount
    ? depositAmount * BigInt(data.length)
    : 0n
  const calculatedCost =
    atomBaseCost * BigInt(data.length) + depositAmountPerAccount

  const txHash = await batchCreateAtom(config, {
    args: [results],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  return {
    transactionHash: txHash,
  }
}
