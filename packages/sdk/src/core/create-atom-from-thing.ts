import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  createAtoms,
  getAtomCost,
  eventParseAtomCreated,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing } from '../api/pin-thing'

export async function createAtomFromThing(
  config: CreateAtomsConfig,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
) {
  const uriRef = await pinThing(data)
  if (!uriRef) {
    throw new Error('Failed to pin thing on IPFS')
  }

  const { address: ethMultiVaultAddress, publicClient } = config
  const atomBaseCost = await getAtomCost({
    publicClient,
    address: ethMultiVaultAddress,
  })

  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await createAtoms(config, {
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
