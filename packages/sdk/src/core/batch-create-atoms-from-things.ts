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

  // Pin each thing in parallel and collect their URIs
  const uploadPromises = data.map(async (item, index) => {
    try {
      const dataIpfs = await uploadJsonToPinata(config.pinataApiJWT, item)

      if (!dataIpfs.IpfsHash || dataIpfs.IpfsHash.trim() === '') {
        const itemPreview = JSON.stringify(item).slice(0, 100)
        throw new Error(
          `Invalid IPFS hash received from Pinata for item at index ${index}: ${itemPreview}${JSON.stringify(item).length > 100 ? '...' : ''}`,
        )
      }

      return `ipfs://${dataIpfs.IpfsHash}`
    } catch (error) {
      const itemPreview = JSON.stringify(item).slice(0, 100)
      throw new Error(
        `Failed to upload item at index ${index} to Pinata: ${itemPreview}${JSON.stringify(item).length > 100 ? '...' : ''}. ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  })

  const uris = await Promise.all(uploadPromises)

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
