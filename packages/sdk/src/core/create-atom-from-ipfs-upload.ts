import {
    createAtom,
    CreateAtomConfig,
    eventParseDepositAtomTransaction,
} from '@0xintuition/protocol'

import { toHex } from 'viem'

import { uploadJsonToPinata } from '../external'

type CreateAtomConfigWithIpfs = CreateAtomConfig & {
  pinataApiJWT: string
}

export async function createAtomFromIpfsUpload(
  config: CreateAtomConfigWithIpfs,
  data: unknown,
  depositAmount?: bigint,
) {
  const dataIpfs = await uploadJsonToPinata(config.pinataApiJWT, data)

  const atomTransactionHash = await createAtom(config, {
    args: [toHex(dataIpfs.IpfsHash)],
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
