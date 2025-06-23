import { EthMultiVaultAbi } from '@0xintuition/protocol'

import { Hex, parseEventLogs, PublicClient } from 'viem'

export async function eventParseRedeemAtomTransaction(
  client: PublicClient,
  hash: Hex,
) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const depositedEvents = parseEventLogs({
    abi: EthMultiVaultAbi,
    logs,
    eventName: 'Redeemed',
  })

  return depositedEvents[0].args
}
