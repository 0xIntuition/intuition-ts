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

  // DEVELOPER NOTE: The address type is the "Account" type.
  // TODO: 2 types need to be supported here:
  // 1. `caip10:eip155:1:0x123...` - CAIP10 format
  // 2. `0x123...` - Ethereum address format
  const uriRef = `caip10:eip155:${data.chainId}:${getAddress(data.address)}`
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
