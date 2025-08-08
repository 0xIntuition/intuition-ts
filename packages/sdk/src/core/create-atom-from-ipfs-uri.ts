import {
  createAtom,
  createAtomCalculateBaseCost,
  eventParseDeposited,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function createAtomFromIpfsUri(
  config: CreateAtomConfig,
  data: `ipfs://${string}`,
  depositAmount?: bigint,
) {
  if (!data.startsWith('ipfs://')) {
    throw new Error('Not a valid IPFS URI')
  }

  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: multivaultAddress,
  })

  const txHash = await createAtom(config, {
    args: [toHex(data)],
    value: atomBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseDeposited(publicClient, txHash)

  return {
    uri: data,
    transactionHash: txHash,
    state: events[0].args,
  }
}
