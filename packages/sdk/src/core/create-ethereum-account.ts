import {
  createAtom,
  CreateAtomConfig,
  eventParseDepositAtomTransaction,
} from '@0xintuition/protocol'

import { Address, getAddress, isAddress, toHex } from 'viem'

export async function createEthereumAccount(
  config: CreateAtomConfig,
  data: {
    chainId: number
    address: Address
  },
  depositAmount?: bigint,
) {
  if (!isAddress(data.address)) {
    throw new Error('Invalid Ethereum address provided')
  }

  const uriRef = `eip155:${data.chainId}:${getAddress(data.address)}`
  const atomTransactionHash = await createAtom(config, {
    args: [toHex(uriRef)],
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
    uri: uriRef,
    transactionHash: atomTransactionHash,
    state: atomData,
  }
}
