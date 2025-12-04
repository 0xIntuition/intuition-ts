import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { getAddress, toHex, type Address } from 'viem'

export async function batchCreateAtomsFromSmartContracts(
  config: WriteConfig,
  data: {
    address: Address
    chainId: number
  }[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount ? depositAmount : 0n

  const calculatedCost = (atomCost + depositAmountPerAtom) * BigInt(data.length)

  const results: `0x${string}`[] = []
  for (const item of data) {
    const uriRef = `caip10:eip155:${item.chainId}:${getAddress(item.address)}`
    results.push(toHex(uriRef))
  }

  const txHash = await multiVaultCreateAtoms(config, {
    args: [results, data.map(() => atomCost + depositAmountPerAtom)],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atoms onchain')
  }

  const state = await eventParseAtomCreated(publicClient, txHash)

  return {
    uris: results,
    state: state.map((i) => i.args),
    transactionHash: txHash,
  }
}
