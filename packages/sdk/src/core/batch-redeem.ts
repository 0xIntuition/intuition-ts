import {
  eventParseRedeemed,
  multiVaultRedeemBatch,
  type RedeemBatchInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

export async function batchRedeem(
  config: WriteConfig,
  data: RedeemBatchInputs['args'],
) {
  const { publicClient } = config

  const txHash = await multiVaultRedeemBatch(config, {
    args: data,
  })

  if (!txHash) {
    throw new Error('Failed to redeem')
  }

  const events = await eventParseRedeemed(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: events.map((i: any) => i.args),
  }
}
