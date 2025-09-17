import {
  depositBatch,
  eventParseDeposited,
  type DepositBatchConfig,
  type DepositBatchInputs,
} from '@0xintuition/protocol'

export async function batchDepositStatement(
  config: DepositBatchConfig,
  data: DepositBatchInputs['args'],
) {
  const { publicClient } = config

  const txHash = await depositBatch(config, {
    args: data,
    value: data[4].reduce((sum, item) => sum + item, 0n),
  })

  if (!txHash) {
    throw new Error('Failed to deposit')
  }

  const events = await eventParseDeposited(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: events.map((i) => i.args),
  }
}
