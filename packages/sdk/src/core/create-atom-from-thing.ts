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
 * Pins a "thing" to IPFS, creates an atom on-chain, and returns the event state.
 * @param config Contract address, viem clients, and Pinata API JWT.
 * @param data PinThing mutation variables used to build the IPFS payload.
 * @param depositAmount Optional additional deposit amount.
 * @returns Created atom URI, transaction hash, and decoded event args.
 */
export async function createAtomFromThing(
  config: CreateAtomConfigWithIpfs,
  data: PinThingMutationVariables,
  depositAmount?: bigint,
) {
  const dataIpfs = await uploadJsonToPinata(config.pinataApiJWT, data)
  const uriRef = `ipfs://${dataIpfs.IpfsHash}`

  const { address: ethMultiVaultAddress, publicClient } = config
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address: ethMultiVaultAddress,
  })

  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await multiVaultCreateAtoms(config, {
    args: [[toHex(uriRef)], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseAtomCreated(publicClient, txHash)

  return {
    uri: uriRef,
    transactionHash: txHash,
    state: events[0].args,
  }
}
