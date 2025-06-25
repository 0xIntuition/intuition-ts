import {
  createAtom,
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

  const atomTransactionHash = await createAtom(config, {
    args: [toHex(data)],
    value: depositAmount,
  })

  if (!atomTransactionHash) {
    throw new Error('Failed to create atom onchain')
  }

  const atomData = await eventParseDepositAtomTransaction(
    config.publicClient ?? config.walletClient,
    atomTransactionHash,
  )

  return {
    uri: data,
    transactionHash: atomTransactionHash,
    state: atomData,
  }
}
