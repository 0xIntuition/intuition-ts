import {
  createAtoms,
  getAtomCost,
  eventParseAtomCreated,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function createAtomFromIpfsUri(
  config: CreateAtomsConfig,
  data: `ipfs://${string}`,
  depositAmount?: bigint,
) {
  if (!data.startsWith('ipfs://')) {
    throw new Error('Not a valid IPFS URI')
  }

  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await getAtomCost({
    publicClient,
    address: multivaultAddress,
  })
  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await createAtoms(config, {
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
