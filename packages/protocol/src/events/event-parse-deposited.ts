import { parseEventLogs, type Hex, type PublicClient } from 'viem'
import { MultiVaultAbi } from '../contracts/MultiVault-abi.js'

export async function eventParseDeposited(client: PublicClient, hash: Hex) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const events = parseEventLogs({
    abi: MultiVaultAbi,
    logs,
    eventName: 'Deposited',
  })

  return events
}
