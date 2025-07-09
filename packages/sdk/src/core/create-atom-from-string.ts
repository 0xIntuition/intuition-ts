import {
  createAtom,
  createAtomCalculateBaseCost,
  eventParseDepositAtomTransaction,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

export async function createAtomFromString(
  config: CreateAtomConfig,
  data: `${string}`,
  depositAmount?: bigint,
) {
  if (typeof data !== 'string') {
    throw new Error('Not a valid String URI')
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

  const atomData = await eventParseDepositAtomTransaction(publicClient, txHash)

  return {
    uri: data,
    transactionHash: txHash,
    state: atomData,
  }
}
