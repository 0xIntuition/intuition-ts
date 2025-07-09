import {
  batchCreateTriple,
  createTripleCalculateBaseCost,
  eventParseTripleCreated,
  type BatchCreateTripleConfig,
  type BatchCreateTripleInputs,
} from '@0xintuition/protocol'

export async function batchCreateTripleStatements(
  config: BatchCreateTripleConfig,
  data: BatchCreateTripleInputs['args'],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const tripleBaseCost = await createTripleCalculateBaseCost({
    publicClient,
    address,
  })

  const txHash = await batchCreateTriple(config, {
    args: data,
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
