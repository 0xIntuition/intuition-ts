import {
  createAtoms,
  getAtomCost,
  eventParseAtomCreated,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function batchCreateAtomsFromIpfsUris(
  config: CreateAtomsConfig,
  data: string[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomCost = await getAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount
    ? depositAmount
    : 0n

  const calculatedCost =
    (atomCost + depositAmountPerAtom) * BigInt(data.length)


  const dataFormatted = data.map((i) => toHex(i))

  const txHash = await createAtoms(config, {
    args: [dataFormatted, data.map(() => atomCost + depositAmountPerAtom)],
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
