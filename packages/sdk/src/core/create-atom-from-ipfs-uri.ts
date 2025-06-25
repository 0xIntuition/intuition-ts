import {
  createAtom,
  createAtomCalculateBaseCost,
  CreateAtomConfig,
  eventParseDepositAtomTransaction,
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

  const atomTransactionHash = await createAtom(config, {
    args: [toHex(data)],
    value: atomBaseCost + BigInt(depositAmount || 0),
  })

  if (!atomTransactionHash) {
    throw new Error('Failed to create atom onchain')
  }

  const atomData = await eventParseDepositAtomTransaction(
    publicClient,
    atomTransactionHash,
  )

  return {
    uri: data,
    transactionHash: atomTransactionHash,
    state: atomData,
  }
}
