import {
  createTriples,
  eventParseTripleCreated,
  type CreateTriplesConfig,
  type CreateTriplesInputs,
} from '@0xintuition/protocol'

export async function createTripleStatement(
  config: CreateTriplesConfig,
  data: {
    args: CreateTriplesInputs['args']
    value: bigint
  },
) {
  const { publicClient } = config

  const { args, value } = data
  const txHash = await createTriples(config, {
    args,
    value: value
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
