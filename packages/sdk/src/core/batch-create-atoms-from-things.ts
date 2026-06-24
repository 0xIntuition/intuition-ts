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

export type BatchCreateAtomsFromThingsResult = {
  uris: string[]
  state: Array<
    Awaited<ReturnType<typeof eventParseAtomCreated>>[number]['args']
  >
  transactionHash: Awaited<ReturnType<typeof multiVaultCreateAtoms>>
}

/**
 * Pins multiple "things", creates atoms in batch, and returns creation events.
 * @param config Contract address and viem clients.
 * @param data Array of PinThing mutation variables.
 * @param depositAmount Optional additional deposit amount per atom.
 * @returns Created atom URIs, transaction hash, and decoded event args.
 */
export async function batchCreateAtomsFromThings(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  depositAmount?: bigint,
): Promise<BatchCreateAtomsFromThingsResult>
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
  options?: BatchCreateAtomsFromThingsOptions,
): Promise<BatchCreateAtomsFromThingsResult>
export async function batchCreateAtomsFromThings(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  options?: bigint | BatchCreateAtomsFromThingsOptions,
) {
  return batchCreateAtomsFromThingsWithOptions(
    config,
    data,
    typeof options === 'bigint' ? { depositAmount: options } : options ?? {},
  )
}

async function batchCreateAtomsFromThingsWithOptions(
  config: WriteConfig,
  data: PinThingMutationVariables[],
  options: BatchCreateAtomsFromThingsOptions,
): Promise<BatchCreateAtomsFromThingsResult> {
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
  for (const [index, item] of data.entries()) {
    try {
      const uri = await pinThing(item, { pinApiKey, pinApiUrl })
      uris.push(uri)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(
        `Failed to pin item ${index + 1} of ${data.length}: ${message}`,
      )
    }
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
