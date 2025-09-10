import {
  createAtoms,
  getAtomCost,
  eventParseDeposited,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function createAtomFromString(
  config: CreateAtomsConfig,
  data: `${string}`,
  depositAmount?: bigint,
) {
  if (typeof data !== 'string') {
    throw new Error('Not a valid String URI')
  }

  const { address, publicClient } = config
  const atomBaseCost = await getAtomCost({
    publicClient,
    address,
  })

  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await createAtoms(config, {
    args: [[toHex(data)], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseDeposited(publicClient, txHash)

  return {
    uri: data,
    transactionHash: txHash,
    state: events[0].args,
  }
}
