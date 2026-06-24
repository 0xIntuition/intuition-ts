import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing, type PinThingOptions } from '../api/pin-thing'

export type CreateAtomFromThingOptions = PinThingOptions & {
  depositAmount?: bigint
}

function normalizeOptions(
  options?: bigint | CreateAtomFromThingOptions,
): CreateAtomFromThingOptions {
  if (typeof options === 'bigint') {
    return { depositAmount: options }
  }

  return options ?? {}
}

/**
 * Pins a "thing" to IPFS, creates an atom on-chain, and returns the event state.
 * @param config Contract address and viem clients.
 * @param data PinThing mutation variables used to build the IPFS payload.
 * @param options Optional additional deposit amount and pinning options.
 * @returns Created atom URI, transaction hash, and decoded event args.
 */
export async function createAtomFromThing(
  config: WriteConfig,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
): ReturnType<typeof createAtomFromThingWithOptions>
export async function createAtomFromThing(
  config: WriteConfig,
  data: PinThingMutationVariables,
  options?: CreateAtomFromThingOptions,
): ReturnType<typeof createAtomFromThingWithOptions>
export async function createAtomFromThing(
  config: WriteConfig,
  data: PinThingMutationVariables,
  options?: bigint | CreateAtomFromThingOptions,
) {
  return createAtomFromThingWithOptions(config, data, normalizeOptions(options))
}

async function createAtomFromThingWithOptions(
  config: WriteConfig,
  data: PinThingMutationVariables,
  options: CreateAtomFromThingOptions,
) {
  const { depositAmount, pinApiKey, pinApiUrl } = options
  const uriRef = await pinThing(data, { pinApiKey, pinApiUrl })

  const { address: ethMultiVaultAddress, publicClient } = config
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address: ethMultiVaultAddress,
  })

  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await multiVaultCreateAtoms(config, {
    args: [[toHex(uriRef)], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseAtomCreated(publicClient, txHash)

  return {
    uri: uriRef,
    transactionHash: txHash,
    state: events[0].args,
  }
}
