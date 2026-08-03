import {
  eventParseDeposited,
  multiVaultDeposit,
  type DepositInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

type DepositResult = {
  transactionHash: Awaited<ReturnType<typeof multiVaultDeposit>>
  state: any[]
}

/**
 * Deposits assets for a term and returns parsed Deposited events.
 * @param config Contract address and viem clients.
 * @param data Deposit arguments and optional call value for the MultiVault contract.
 * @returns Transaction hash and decoded event args.
 */
export function deposit(
  config: WriteConfig,
  data: DepositInputs,
): Promise<DepositResult>

/**
 * @deprecated Pass `{ args, value? }` instead. Bare args send no call value.
 */
export function deposit(
  config: WriteConfig,
  data: DepositInputs['args'],
): Promise<DepositResult>

export async function deposit(
  config: WriteConfig,
  data: DepositInputs | DepositInputs['args'],
): Promise<DepositResult> {
  const { publicClient } = config
  const inputs = Array.isArray(data)
    ? { args: data as DepositInputs['args'] }
    : (data as DepositInputs)

  const txHash = await multiVaultDeposit(config, inputs)

  if (!txHash) {
    throw new Error('Failed to deposit')
  }

  const events = await eventParseDeposited(publicClient, txHash)

  return {
    transactionHash: txHash,
    state: events.map((i: any) => i.args),
  }
}
