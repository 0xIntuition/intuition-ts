import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  batchCreateAtom,
  createAtomCalculateBaseCost,
  eventParseAtomCreated,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing } from '../api/pin-thing'

export async function batchCreateAtomsFromThings(
  config: CreateAtomConfig,
  data: PinThingMutationVariables[],
  depositAmount?: bigint,
) {
  const { address: ethMultiVaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: ethMultiVaultAddress,
  })

  // Pin each thing and collect their URIs
  const uris: string[] = []
  for (const item of data) {
    const uri = await pinThing(item)
    if (!uri) {
      throw new Error(`Failed to pin thing on IPFS: ${JSON.stringify(item)}`)
    }
    uris.push(uri)
  }

  // Prepare the batch args
  const hexUris = uris.map((uri) => toHex(uri))

  // Calculate total cost
  const depositAmountTotal = depositAmount
    ? depositAmount * BigInt(data.length)
    : 0n
  const calculatedCost = atomBaseCost * BigInt(data.length) + depositAmountTotal

  // Batch create atoms
  const txHash = await batchCreateAtom(config, {
    args: [hexUris],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atoms onchain')
  }

  const state = await eventParseAtomCreated(publicClient, txHash)

  return {
    uris,
    state: state.map((i) => i.args),
    transactionHash: txHash,
  }
}
