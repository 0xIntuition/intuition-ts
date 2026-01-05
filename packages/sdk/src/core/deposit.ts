import {
  eventParseDeposited,
  multiVaultDeposit,
  type DepositInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

/**
 * Deposits assets for a term and returns parsed Deposited events.
 * @param config Contract address and viem clients.
 * @param data Deposit arguments for the MultiVault contract.
 * @returns Transaction hash and decoded event args.
 */
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
