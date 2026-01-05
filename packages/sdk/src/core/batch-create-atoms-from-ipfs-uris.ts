import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

/**
 * Creates atoms in batch from IPFS URIs and returns creation events.
 * @param config Contract address and viem clients.
 * @param data Array of IPFS URIs.
 * @param depositAmount Optional additional deposit amount per atom.
 * @returns Created atom URIs, transaction hash, and decoded event args.
 */
export async function batchCreateAtomsFromIpfsUris(
  config: WriteConfig,
  data: string[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount ? depositAmount : 0n

  const calculatedCost = (atomCost + depositAmountPerAtom) * BigInt(data.length)

  const dataFormatted = data.map((i) => toHex(i))

  const txHash = await multiVaultCreateAtoms(config, {
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
