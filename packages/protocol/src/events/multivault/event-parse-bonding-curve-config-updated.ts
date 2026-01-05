import { parseEventLogs, type Hex, type PublicClient } from 'viem'

import { MultiVaultAbi } from '../../contracts/MultiVault-abi.js'

/**
 * Waits for a transaction receipt and parses BondingCurveConfigUpdated events.
 * @param client Public viem client used to fetch the receipt and logs.
 * @param hash Transaction hash to inspect.
 * @returns Parsed BondingCurveConfigUpdated event logs.
 * @throws Error if the transaction reverted.
 */
export async function eventParseBondingCurveConfigUpdated(
  client: PublicClient,
  hash: Hex,
) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const events = parseEventLogs({
    abi: MultiVaultAbi,
    logs,
    eventName: 'BondingCurveConfigUpdated',
  })

  return events
}
