import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

/**
 * Creates an atom from a raw string payload and returns the event state.
 * @param config Contract address and viem clients.
 * @param data String payload to store as the atom.
 * @param depositAmount Optional additional deposit amount.
 * @returns Atom data string, transaction hash, and decoded event args.
 */
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
