import {
  createAtom,
  createAtomCalculateBaseCost,
  eventParseDepositAtomTransaction,
  type CreateAtomConfig,
} from '@0xintuition/protocol'

import { getAddress, isAddress, toHex, type Address } from 'viem'

export async function createAtomFromSmartContract(
  config: CreateAtomConfig,
  data: {
    address: Address
    chainId: number
  },
  depositAmount?: bigint,
) {
  if (!isAddress(data.address)) {
    throw new Error('Invalid Ethereum address provided')
  }

  if (!data.chainId) {
    throw new Error('Chain ID is required to create atom')
  }

  const { address, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address,
  })

  const uriRef: string = `caip10:eip155:${data.chainId}:${getAddress(data.address)}`
  const txHash = await createAtom(config, {
    args: [toHex(uriRef)],
    value: atomBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const atomData = await eventParseDepositAtomTransaction(publicClient, txHash)

  return {
    uri: uriRef,
    transactionHash: txHash,
    state: atomData,
  }
}
