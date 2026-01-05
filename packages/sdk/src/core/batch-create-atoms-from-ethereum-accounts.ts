import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex, type Address } from 'viem'

/**
 * Creates atoms in batch for Ethereum account addresses and returns events.
 * @param config Contract address and viem clients.
 * @param data Array of Ethereum account addresses.
 * @param depositAmount Optional additional deposit amount per atom.
 * @returns Atom data addresses, transaction hash, and decoded event args.
 */
export async function batchCreateAtomsFromEthereumAccounts(
  config: WriteConfig,
  data: Address[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomCost = await multiVaultGetAtomCost({
    publicClient,
    address,
  })

  const depositAmountPerAtom = depositAmount ? depositAmount : 0n

  const calculatedCost = (atomCost + depositAmountPerAtom) * BigInt(data.length)

  const txHash = await multiVaultCreateAtoms(config, {
    args: [
      data.map((i) => toHex(i)),
      data.map(() => atomCost + depositAmountPerAtom),
    ],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const state = await eventParseAtomCreated(publicClient, txHash)

  return {
    uris: data,
    state: state.map((i) => i.args),
    transactionHash: txHash,
  }
}
