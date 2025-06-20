import { multiVaultAbi } from '@0xintuition/protocol'

import { Hex, parseEventLogs, PublicClient, WalletClient } from 'viem'

import { getPublicClient } from '../helpers/get-public-client'

export async function eventParseRedeemAtomTransaction(
  client: PublicClient | WalletClient,
  hash: Hex,
) {
  const _client = getPublicClient(client)

  const { logs, status } = await _client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const depositedEvents = parseEventLogs({
    abi: multiVaultAbi,
    logs,
    eventName: 'Redeemed',
  })

  return depositedEvents[0].args
}
