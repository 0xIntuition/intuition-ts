import { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  createAtom,
  createAtomCalculateBaseCost,
  CreateAtomConfig,
  eventParseDepositAtomTransaction,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing } from '../api/pin-thing'

export async function createThing(
  config: CreateAtomConfig,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
) {
  const uriRef = await pinThing(data)
  if (!uriRef) {
    throw new Error('Failed to pin thing on IPFS')
  }

  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: multivaultAddress,
  })

  const txHash = await createAtom(config, {
    args: [toHex(uriRef)],
    value: atomBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const atomData = await eventParseDepositAtomTransaction(publicClient, txHash)

  return {
    uri: uriRef,
    transactionHash: txHash,
    state: atomData,
  }
}
