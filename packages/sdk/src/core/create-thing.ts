import { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  createAtom,
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

  const atomTransactionHash = await createAtom(config, {
    args: [toHex(uriRef)],
    value: depositAmount,
  })

  if (!atomTransactionHash) {
    throw new Error('Failed to create atom onchain')
  }

  const atomData = await eventParseDepositAtomTransaction(
    config.publicClient ?? config.walletClient,
    atomTransactionHash,
  )

  return {
    uri: uriRef,
    transactionHash: atomTransactionHash,
    state: atomData,
  }
}
