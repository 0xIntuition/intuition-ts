import {
  createAtom,
  createAtomCalculateBaseCost,
  eventParseDepositAtomTransaction,
  type CreateAtomConfig,
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
  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: multivaultAddress,
  })
  const txHash = await createAtom(config, {
    args: [toHex(dataIpfs.IpfsHash)],
    value: atomBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const atomData = await eventParseDepositAtomTransaction(
    config.publicClient ?? config.walletClient,
    txHash,
  )

  return {
    uri: `ipfs://${dataIpfs.IpfsHash}`,
    transactionHash: txHash,
    state: atomData,
  }
}
