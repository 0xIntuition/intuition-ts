import {
  eventParseTripleCreated,
  multiVaultCreateTriples,
  type CreateTriplesInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

type BatchCreateTripleStatementsResult = {
  transactionHash: Awaited<ReturnType<typeof multiVaultCreateTriples>>
  state: Awaited<ReturnType<typeof eventParseTripleCreated>>[number]['args'][]
}

let hasWarnedAboutDepositAmount = false

/**
 * Creates triples in batch and returns parsed TripleCreated events.
 * @param config Contract address and viem clients.
 * @param data CreateTriples arguments. The call value is the sum of the assets array.
 * @returns Transaction hash and decoded event args.
 */
export function batchCreateTripleStatements(
  config: WriteConfig,
  data: CreateTriplesInputs['args'],
): Promise<BatchCreateTripleStatementsResult>

/**
 * @deprecated `depositAmount` is ignored because each entry in the `data` assets array already carries that triple's full value. Call with only `config` and `data`.
 */
export function batchCreateTripleStatements(
  config: WriteConfig,
  data: CreateTriplesInputs['args'],
  depositAmount: bigint,
): Promise<BatchCreateTripleStatementsResult>

export async function batchCreateTripleStatements(
  config: WriteConfig,
  data: CreateTriplesInputs['args'],
  depositAmount?: bigint,
): Promise<BatchCreateTripleStatementsResult> {
  const { publicClient } = config

  if (
    depositAmount !== undefined &&
    depositAmount !== 0n &&
    !hasWarnedAboutDepositAmount
  ) {
    hasWarnedAboutDepositAmount = true
    console.warn(
      'batchCreateTripleStatements: depositAmount is deprecated and ignored; ' +
        "each entry in the data assets array already carries that triple's full value.",
    )
  }

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
