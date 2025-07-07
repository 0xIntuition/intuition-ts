import {
    createAtom,
    createAtomCalculateBaseCost,
    CreateAtomConfig,
    eventParseDepositAtomTransaction,
} from '@0xintuition/protocol'

import { Address, getAddress, isAddress } from 'viem'

export async function createAtomFromEthereumAccount(
  config: CreateAtomConfig,
  data: {
    address: Address
  },
  depositAmount?: bigint,
) {
  if (!isAddress(getAddress(data.address))) {
    throw new Error('Invalid Ethereum address provided')
  }

  const { address, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address,
  })

  const uriRef: Address = getAddress(data.address)
  const txHash = await createAtom(config, {
    args: [uriRef],
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
