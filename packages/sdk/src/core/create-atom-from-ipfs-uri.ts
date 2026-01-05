import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

/**
 * Creates an atom from an IPFS URI and returns the creation event state.
 * @param config Contract address and viem clients.
 * @param data IPFS URI to store as the atom payload.
 * @param depositAmount Optional additional deposit amount.
 * @returns Created atom URI, transaction hash, and decoded event args.
 */
export async function createAtomFromIpfsUri(
  config: WriteConfig,
  data: `ipfs://${string}`,
  depositAmount?: bigint,
) {
  if (!data.startsWith('ipfs://')) {
    throw new Error('Not a valid IPFS URI')
  }

  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address: multivaultAddress,
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
