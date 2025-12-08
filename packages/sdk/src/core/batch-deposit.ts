import {
  eventParseDeposited,
  multiVaultDepositBatch,
  type DepositBatchInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

export async function batchDeposit(
  config: WriteConfig,
  data: DepositBatchInputs['args'],
) {
  const { publicClient } = config

  const txHash = await multiVaultDepositBatch(config, {
    args: data,
    value: data[4].reduce(
      (sum: number | bigint, item: number | bigint) =>
        BigInt(sum) + BigInt(item),
      0n,
    ),
  })

  if (!txHash) {
    throw new Error('Failed to deposit')
  }

  const events = await eventParseDeposited(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: events.map((i: any) => i.args),
  }
}
