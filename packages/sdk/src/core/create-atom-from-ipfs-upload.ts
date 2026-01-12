import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { uploadJsonToPinata } from '../external'

export type CreateAtomConfigWithIpfs = WriteConfig & {
  pinataApiJWT: string
}

/**
 * Uploads JSON to Pinata, creates an atom on-chain, and returns the event state.
 * @param config Contract address, viem clients, and Pinata API JWT.
 * @param data JSON-serializable payload to upload.
 * @param depositAmount Optional additional deposit amount.
 * @returns Created atom URI, transaction hash, and decoded event args.
 */
export async function createAtomFromIpfsUpload(
  config: CreateAtomConfigWithIpfs,
  data: unknown,
  depositAmount?: bigint,
) {
  const dataIpfs = await uploadJsonToPinata(config.pinataApiJWT, data)

  if (!dataIpfs.IpfsHash || dataIpfs.IpfsHash.trim() === '') {
    throw new Error('Invalid IPFS hash received from Pinata')
  }

  const uri = `ipfs://${dataIpfs.IpfsHash}`
  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address: multivaultAddress,
  })
  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await multiVaultCreateAtoms(config, {
    args: [[toHex(uri)], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseAtomCreated(publicClient, txHash)

  return {
    uri,
    transactionHash: txHash,
    state: events[0].args,
  }
}
