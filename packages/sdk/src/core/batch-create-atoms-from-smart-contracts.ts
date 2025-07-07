import {
    batchCreateAtom,
    createAtomCalculateBaseCost,
    CreateAtomConfig,
} from '@0xintuition/protocol'

import { Address, getAddress, toHex } from 'viem'

export async function batchCreateAtomsFromSmartContracts(
  config: CreateAtomConfig,
  data: {
    address: Address
    chainId: number
  }[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address,
  })

  const results: `0x${string}`[] = []
  for (const item of data) {
     const uriRef = `caip10:eip155:${item.chainId}:${getAddress(item.address)}`
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
