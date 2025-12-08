import {
  eventParseDeposited,
  multiVaultDeposit,
  type DepositInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

export async function deposit(
  config: WriteConfig,
  data: DepositInputs['args'],
) {
  const { publicClient } = config

  const txHash = await multiVaultDeposit(config, {
    args: data,
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
