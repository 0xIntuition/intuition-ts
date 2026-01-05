import {
  eventParseRedeemed,
  multiVaultRedeemBatch,
  type RedeemBatchInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

/**
 * Redeems shares for multiple terms and returns parsed Redeemed events.
 * @param config Contract address and viem clients.
 * @param data RedeemBatch arguments for the MultiVault contract.
 * @returns Transaction hash and decoded event args.
 */
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
