import {
  createTriple as createTripleBase,
  createTripleCalculateBaseCost,
  CreateTripleConfig,
  CreateTripleInputs,
  eventParseTripleCreated,
} from '@0xintuition/protocol'

export async function createTripleStatement(
  config: CreateTripleConfig,
  data: {
    args: CreateTripleInputs['args']
    depositAmount?: bigint
  },
) {
  const { address: multivaultAddress, publicClient } = config
  const tripleBaseCost = await createTripleCalculateBaseCost({
    publicClient,
    address: multivaultAddress,
  })

  const { args, depositAmount } = data
  const txHash = await createTripleBase(config, {
    args,
    value: tripleBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create atom onchain')
  }

  const event = await eventParseTripleCreated(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: event,
  }
}
