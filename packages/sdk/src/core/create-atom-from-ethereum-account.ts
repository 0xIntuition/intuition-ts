import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { getAddress, isAddress, toHex, type Address } from 'viem'

export async function createAtomFromEthereumAccount(
  config: WriteConfig,
  data: Address,
  depositAmount?: bigint,
) {
  if (!isAddress(getAddress(data))) {
    throw new Error('Invalid Ethereum address provided')
  }

  const { address, publicClient } = config
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const uriRef: Address = getAddress(data)
  const assets = atomBaseCost + BigInt(depositAmount || 0)
  const txHash = await multiVaultCreateAtoms(config, {
    args: [[toHex(uriRef)], [assets]],
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
