import { parseEventLogs, type Hex, type PublicClient } from 'viem'

import { MultiVaultAbi } from '../../contracts/MultiVault-abi.js'

/**
 * Waits for a transaction receipt and parses TripleCreated events.
 * @param client Public viem client used to fetch the receipt and logs.
 * @param hash Transaction hash to inspect.
 * @returns Parsed TripleCreated event logs.
 * @throws Error if the transaction reverted.
 */
export async function eventParseTripleCreated(client: PublicClient, hash: Hex) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const events = parseEventLogs({
    abi: MultiVaultAbi,
    logs,
    eventName: 'TripleCreated',
  })

  return events
}
