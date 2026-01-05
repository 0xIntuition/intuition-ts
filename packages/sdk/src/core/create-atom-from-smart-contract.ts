import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { getAddress, isAddress, toHex, type Address } from 'viem'

/**
 * Creates an atom for a smart contract CAIP-10 address and returns the event state.
 * @param config Contract address and viem clients.
 * @param data Smart contract address and chain ID.
 * @param depositAmount Optional additional deposit amount.
 * @returns Created atom URI, transaction hash, and decoded event args.
 */
export async function createAtomFromSmartContract(
  config: WriteConfig,
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
  const atomBaseCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const uriRef: string = `caip10:eip155:${data.chainId}:${getAddress(data.address)}`
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
