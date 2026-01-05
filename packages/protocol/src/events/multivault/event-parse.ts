import {
  parseEventLogs,
  type ContractEventName,
  type Hex,
  type PublicClient,
} from 'viem'

import { MultiVaultAbi } from '../../contracts/MultiVault-abi.js'

/**
 * Waits for a transaction receipt and parses a specific MultiVault event.
 * @param client Public viem client used to fetch the receipt and logs.
 * @param hash Transaction hash to inspect.
 * @param eventName Event name to filter for in the receipt logs.
 * @returns Parsed event logs for the requested event name.
 * @throws Error if the transaction reverted.
 */
export async function eventParse(
  client: PublicClient,
  hash: Hex,
  eventName: ContractEventName<typeof MultiVaultAbi>,
) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const events = parseEventLogs({
    abi: MultiVaultAbi,
    logs,
    eventName,
  })

  return events
}
