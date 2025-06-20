import { Address, getAddress, isAddress, toHex } from 'viem'

import { createAtom, CreateAtomConfig } from '../chain/create-atom'
import { eventParseDepositAtomTransaction } from '../events/event-parse-deposit-atom-transaction'

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

  const ref = `eip155:${data.chainId}:${getAddress(data.address)}`
  const atomTransactionHash = await createAtom(config, {
    args: [toHex(ref)],
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
    uri: ref,
    transactionHash: atomTransactionHash,
    state: atomData,
  }
}
