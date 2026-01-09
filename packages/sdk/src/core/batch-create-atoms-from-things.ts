import type { PinThingMutationVariables } from '@0xintuition/graphql'
import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { uploadJsonToPinata } from '../external/upload-json-to-pinata'
import type { CreateAtomConfigWithIpfs } from './create-atom-from-ipfs-upload'

/**
 * Pins multiple "things", creates atoms in batch, and returns creation events.
 * @param config Contract address, viem clients, and Pinata API JWT.
 * @param data Array of PinThing mutation variables.
 * @param depositAmount Optional additional deposit amount per atom.
 * @returns Created atom URIs, transaction hash, and decoded event args.
 */
export async function batchCreateAtomsFromThings(
  config: CreateAtomConfigWithIpfs,
  data: PinThingMutationVariables[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config

  const atomCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount ? depositAmount : 0n

  const calculatedCost = (atomCost + depositAmountPerAtom) * BigInt(data.length)

  // Pin each thing and collect their URIs
  const uris: string[] = []
  for (const item of data) {
    const dataIpfs = await uploadJsonToPinata(config.pinataApiJWT, item)
    const uri = `ipfs://${dataIpfs.IpfsHash}`
    uris.push(uri)
  }

  // Prepare the batch args
  const hexUris = uris.map((uri) => toHex(uri))

  // Batch create atoms
  const txHash = await multiVaultCreateAtoms(config, {
    args: [hexUris, hexUris.map(() => atomCost + depositAmountPerAtom)],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atoms onchain')
  }

  const state = await eventParseAtomCreated(publicClient, txHash)

  return {
    uris,
    state: state.map((i) => i.args),
    transactionHash: txHash,
  }
}
