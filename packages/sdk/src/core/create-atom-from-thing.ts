import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  createAtom,
  createAtomCalculateBaseCost,
  eventParseDepositAtomTransaction,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { pinThing } from '../api/pin-thing'

export async function createAtomFromThing(
  config: CreateAtomConfig,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
) {
  const uriRef = await pinThing(data)
  if (!uriRef) {
    throw new Error('Failed to pin thing on IPFS')
  }

  const { address: ethMultiVaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: ethMultiVaultAddress,
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
