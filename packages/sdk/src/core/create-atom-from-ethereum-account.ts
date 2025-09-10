import {
  createAtoms,
  getAtomCost,
  eventParseAtomCreated,
  type CreateAtomsConfig,
} from '@0xintuition/protocol'

import { getAddress, isAddress, type Address } from 'viem'

export async function createAtomFromEthereumAccount(
  config: CreateAtomsConfig,
  data: Address,
  depositAmount?: bigint,
) {
  if (!isAddress(getAddress(data))) {
    throw new Error('Invalid Ethereum address provided')
  }

  const { address, publicClient } = config
  const atomBaseCost = await getAtomCost({
    publicClient,
    address,
  })

  const uriRef: Address = getAddress(data)
  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await createAtoms(config, {
    args: [[uriRef], [assets]],
    value: assets,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const events = await eventParseAtomCreated(publicClient, txHash)

  return {
    uri: uriRef,
    transactionHash: txHash,
    state: events[0].args,
  }
}
