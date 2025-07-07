import {
  batchCreateAtom,
  createAtomCalculateBaseCost,
  CreateAtomConfig,
} from '@0xintuition/protocol'

import { Address } from 'viem'

export async function batchCreateAtomsFromEthereumAccounts(
  config: CreateAtomConfig,
  data: Address[],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const atomBaseCost = await createAtomCalculateBaseCost({
    publicClient,
    address,
  })


  const depositAmountPerAccount = depositAmount
    ? depositAmount * BigInt(data.length)
    : 0n
  const calculatedCost =
    atomBaseCost * BigInt(data.length) + depositAmountPerAccount

  const txHash = await batchCreateAtom(config, {
    args: [data],
    value: calculatedCost,
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  return {
    transactionHash: txHash,
  }
}
