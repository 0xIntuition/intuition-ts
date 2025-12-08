import {
  eventParseTripleCreated,
  multiVaultCreateTriples,
  multiVaultGetTripleCost,
  type CreateTriplesInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

export async function batchCreateTripleStatements(
  config: WriteConfig,
  data: CreateTriplesInputs['args'],
  depositAmount?: bigint,
) {
  const { address, publicClient } = config
  const tripleBaseCost = await multiVaultGetTripleCost({
    publicClient,
    address,
  })

  const txHash = await multiVaultCreateTriples(config, {
    args: data,
    value: tripleBaseCost + BigInt(depositAmount || 0),
  })

  if (!txHash) {
    throw new Error('Failed to create triple onchain')
  }

  const events = await eventParseTripleCreated(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: events.map((i) => i.args),
  }
}
