import { PinThingMutationVariables } from '@0xintuition/graphql'

import { toHex } from 'viem'

import { pinThing } from '../api/pin-thing'
import { createAtom, CreateAtomConfig } from '../chain/create-atom'
import { eventParseDepositAtomTransaction } from '../events/event-parse-deposit-atom-transaction'

export async function createThing(
  config: CreateAtomConfig,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
) {
  const thingUri = await pinThing(data)
  if (!thingUri) {
    throw new Error('Failed to pin thing on IPFS')
  }

  const atomTransactionHash = await createAtom(config, {
    args: [toHex(thingUri)],
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
    uri: thingUri,
    transactionHash: atomTransactionHash,
    state: atomData,
  }
}
