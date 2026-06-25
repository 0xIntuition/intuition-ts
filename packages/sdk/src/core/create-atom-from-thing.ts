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

export type CreateAtomFromThingResult = {
  uri: string
  transactionHash: Awaited<ReturnType<typeof multiVaultCreateAtoms>>
  state: Awaited<ReturnType<typeof eventParseAtomCreated>>[number]['args']
}

/**
 * Pins a "thing" to IPFS, creates an atom on-chain, and returns the event state.
 * @param config Contract address and viem clients.
 * @param data PinThing mutation variables used to build the IPFS payload.
 * @param depositAmount Optional additional deposit amount.
 * @returns Created atom URI, transaction hash, and decoded event args.
 */
export async function createAtomFromThing(
  config: WriteConfig,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
): Promise<CreateAtomFromThingResult>
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
  options?: CreateAtomFromThingOptions,
): Promise<CreateAtomFromThingResult>
export async function createAtomFromThing(
  config: WriteConfig,
  data: PinThingMutationVariables,
  options?: bigint | CreateAtomFromThingOptions,
) {
  return createAtomFromThingWithOptions(
    config,
    data,
    typeof options === 'bigint' ? { depositAmount: options } : options ?? {},
  )
}

async function createAtomFromThingWithOptions(
  config: WriteConfig,
  data: PinThingMutationVariables,
  options: CreateAtomFromThingOptions,
): Promise<CreateAtomFromThingResult> {
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
  const createdEvent = events[0]

  if (!createdEvent) {
    throw new Error(`No AtomCreated event found for transaction ${txHash}`)
  }

  return {
    uri: uriRef,
    transactionHash: txHash,
    state: createdEvent.args,
  }
}
