import { multiVaultAbi } from '@0xintuition/protocol'

import { Hex, parseEventLogs, PublicClient, WalletClient } from 'viem'

import { getPublicClient } from '../helpers/get-public-client'

export async function eventParseDepositAtomTransaction(
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
    eventName: 'Deposited',
  })

  const sharesAmount = depositedEvents[0].args.sharesForReceiver

  return {
    sharesAmount,
    hash,
    events: parseEventLogs({ abi: multiVaultAbi, logs }),
  }
}
