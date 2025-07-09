import {
  createTriple as createTripleBase,
  createTripleCalculateBaseCost,
  eventParseTripleCreated,
  type CreateTripleConfig,
  type CreateTripleInputs,
} from '@0xintuition/protocol'

export async function createTripleStatement(
  config: CreateTripleConfig,
  data: {
    args: CreateTripleInputs['args']
    depositAmount?: bigint
  },
) {
  const { address, publicClient } = config
  const tripleBaseCost = await createTripleCalculateBaseCost({
    publicClient,
    address,
  })

  const { args, depositAmount } = data
  const txHash = await createTripleBase(config, {
    args,
    value: tripleBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create triple onchain')
  }

  const event = await eventParseTripleCreated(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: event,
  }
}
