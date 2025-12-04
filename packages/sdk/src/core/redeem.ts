import {
  eventParseRedeemed,
  multiVaultRedeem,
  type RedeemInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

export async function redeem(config: WriteConfig, data: RedeemInputs['args']) {
  const { publicClient } = config

  const txHash = await multiVaultRedeem(config, {
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
