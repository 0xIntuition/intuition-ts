import {
  createAtom,
  createAtomCalculateBaseCost,
  CreateAtomConfig,
  eventParseDepositAtomTransaction,
} from '@0xintuition/protocol'

import { Address, getAddress, isAddress, toHex } from 'viem'

export async function createEthereumAccount(
  config: CreateAtomConfig,
  data: {
    address: Address
    chainId?: number
  },
  depositAmount?: bigint,
) {
  if (!isAddress(data.address)) {
    throw new Error('Invalid Ethereum address provided')
  }

  const { address: multivaultAddress, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address: multivaultAddress,
  })

  let uriRef: string
  if (!data.chainId) {
    uriRef = getAddress(data.address)
  } else {
    uriRef = `caip10:eip155:${data.chainId}:${getAddress(data.address)}`
  }
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
