import {
  batchCreateAtom,
  createAtomCalculateBaseCost,
  eventParseAtomCreated,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import type { Address } from 'viem'

export async function batchCreateAtomsFromEthereumAccounts(
  config: CreateAtomConfig,
  data: Address[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address,
  })

  const depositAmountPerAccount = depositAmount
    ? depositAmount * BigInt(data.length)
    : 0n
  const calculatedCost =
    atomBaseCost * BigInt(data.length) + depositAmountPerAccount

  const txHash = await batchCreateAtom(config, {
    args: [data],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const state = await eventParseAtomCreated(publicClient, txHash)

  return {
    uris: data,
    state: state.map((i) => i.args),
    transactionHash: txHash,
  }
}
