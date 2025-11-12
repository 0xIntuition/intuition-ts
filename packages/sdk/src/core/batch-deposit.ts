import {
  depositBatch,
  eventParseDeposited,
  type DepositBatchInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

export async function batchDepositStatement(
  config: WriteConfig,
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
