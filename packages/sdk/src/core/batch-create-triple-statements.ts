import {
  eventParseTripleCreated,
  multiVaultCreateTriples,
  type CreateTriplesInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

/**
 * Creates triples in batch and returns parsed TripleCreated events.
 * @param config Contract address and viem clients.
 * @param data CreateTriples arguments for the MultiVault contract.
 * @param depositAmount Deprecated and ignored. Each asset in data is the total value for its triple.
 * @returns Transaction hash and decoded event args.
 */
export async function batchCreateTripleStatements(
  config: WriteConfig,
  data: CreateTriplesInputs['args'],
  depositAmount?: bigint,
) {
  const { publicClient } = config
  void depositAmount

  const txHash = await multiVaultCreateTriples(config, {
    args: data,
    value: data[3].reduce((sum, assets) => sum + assets, 0n),
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
