import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing, type PinThingOptions } from '../api/pin-thing'

export type BatchCreateAtomsFromThingsOptions = PinThingOptions & {
  depositAmount?: bigint
}

function normalizeOptions(
  options?: bigint | BatchCreateAtomsFromThingsOptions,
): BatchCreateAtomsFromThingsOptions {
  if (typeof options === 'bigint') {
    return { depositAmount: options }
  }

  return options ?? {}
}

/**
 * Pins multiple "things", creates atoms in batch, and returns creation events.
 * @param config Contract address and viem clients.
 * @param data Array of PinThing mutation variables.
 * @param options Optional additional deposit amount per atom and pinning options.
 * @returns Created atom URIs, transaction hash, and decoded event args.
 */
export async function batchCreateAtomsFromThings(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  depositAmount?: bigint,
): ReturnType<typeof batchCreateAtomsFromThingsWithOptions>
export async function batchCreateAtomsFromThings(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  options?: BatchCreateAtomsFromThingsOptions,
): ReturnType<typeof batchCreateAtomsFromThingsWithOptions>
export async function batchCreateAtomsFromThings(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  options?: bigint | BatchCreateAtomsFromThingsOptions,
) {
  return batchCreateAtomsFromThingsWithOptions(
    config,
    data,
    normalizeOptions(options),
  )
}

async function batchCreateAtomsFromThingsWithOptions(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  options: BatchCreateAtomsFromThingsOptions,
) {
  const { depositAmount, pinApiKey, pinApiUrl } = options
  const { address, publicClient } = config

  const atomCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount ? depositAmount : 0n

  const calculatedCost = (atomCost + depositAmountPerAtom) * BigInt(data.length)

  // Pin each thing and collect their URIs
  const uris: string[] = []
  for (const item of data) {
    const uri = await pinThing(item, { pinApiKey, pinApiUrl })
    uris.push(uri)
  }

  // Prepare the batch args
  const hexUris = uris.map((uri) => toHex(uri))

  // Batch create atoms
  const txHash = await multiVaultCreateAtoms(config, {
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
