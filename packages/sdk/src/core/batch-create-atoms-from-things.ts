import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  createAtoms,
  getAtomCost,
  eventParseAtomCreated,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing } from '../api/pin-thing'

export async function batchCreateAtomsFromThings(
  config: CreateAtomsConfig,
  data: PinThingMutationVariables[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config

  const atomCost = await getAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount
    ? depositAmount
    : 0n

  const calculatedCost =
    (atomCost + depositAmountPerAtom) * BigInt(data.length)

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

  // Batch create atoms
  const txHash = await createAtoms(config, {
    args: [hexUris, hexUris.map(() => atomCost + depositAmountPerAtom)],
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
