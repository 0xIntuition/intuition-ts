import {
  eventParseTripleCreated,
  multiVaultCreateTriples,
  multiVaultGetTripleCost,
  type CreateTriplesInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

/**
 * Creates triples in batch and returns parsed TripleCreated events.
 * @param config Contract address and viem clients.
 * @param data CreateTriples arguments for the MultiVault contract.
 * @param depositAmount Optional additional deposit amount.
 * @returns Transaction hash and decoded event args.
 */
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
