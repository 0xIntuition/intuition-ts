import {
  createAtoms,
  eventParseAtomCreated,
  getAtomCost,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { toHex, type Address } from 'viem'

export async function batchCreateAtomsFromEthereumAccounts(
  config: CreateAtomsConfig,
  data: Address[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomCost = await getAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount ? depositAmount : 0n

  const calculatedCost = (atomCost + depositAmountPerAtom) * BigInt(data.length)

  const txHash = await createAtoms(config, {
    args: [
      data.map((i) => toHex(i)),
      data.map(() => atomCost + depositAmountPerAtom),
    ],
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
