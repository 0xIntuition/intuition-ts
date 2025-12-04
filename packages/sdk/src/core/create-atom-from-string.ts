import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function createAtomFromString(
  config: WriteConfig,
  data: `${string}`,
  depositAmount?: bigint,
) {
  if (typeof data !== 'string') {
    throw new Error('Not a valid String URI')
  }

  const { address, publicClient } = config
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await multiVaultCreateAtoms(config, {
    args: [[toHex(data)], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseAtomCreated(publicClient, txHash)

  return {
    uri: data,
    transactionHash: txHash,
    state: events[0].args,
  }
}
