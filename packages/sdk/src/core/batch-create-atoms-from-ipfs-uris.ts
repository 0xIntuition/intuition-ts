import {
  batchCreateAtom,
  createAtomCalculateBaseCost,
  eventParseAtomCreated,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function batchCreateAtomsFromIpfsUris(
  config: CreateAtomConfig,
  data: string[],
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

  const dataFormatted = data.map((i) => toHex(i))

  const txHash = await batchCreateAtom(config, {
    args: [dataFormatted],
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
