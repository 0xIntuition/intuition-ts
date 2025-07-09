import { parseEventLogs, type Hex, type PublicClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts/EthMultiVault-abi.js'

export async function eventParseAtomCreated(client: PublicClient, hash: Hex) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const events = parseEventLogs({
    abi: EthMultiVaultAbi,
    logs,
    eventName: 'AtomCreated',
  })

  return events
}
