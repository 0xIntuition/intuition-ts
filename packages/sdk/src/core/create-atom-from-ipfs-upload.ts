import {
  createAtoms,
  eventParseDeposited,
  getAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { uploadJsonToPinata } from '../external'

type CreateAtomConfigWithIpfs = WriteConfig & {
  pinataApiJWT: string
}

export async function createAtomFromIpfsUpload(
  config: CreateAtomConfigWithIpfs,
  data: unknown,
  depositAmount?: bigint,
) {
  const dataIpfs = await uploadJsonToPinata(config.pinataApiJWT, data)
  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await getAtomCost({
    publicClient,
    address: multivaultAddress,
  })
  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await createAtoms(config, {
    args: [[toHex(dataIpfs.IpfsHash)], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseDeposited(
    config.publicClient ?? config.walletClient,
    txHash,
  )

  return {
    uri: `ipfs://${dataIpfs.IpfsHash}`,
    transactionHash: txHash,
    state: events[0].args,
  }
}
