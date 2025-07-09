import { parseEventLogs, type Hex, type PublicClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts/EthMultiVault-abi.js'

export async function eventParseRedeemAtomTransaction(
  client: PublicClient,
  hash: Hex,
) {
  const { logs, status } = await client.waitForTransactionReceipt({ hash })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const event = parseEventLogs({
    abi: EthMultiVaultAbi,
    logs,
    eventName: 'Redeemed',
  })

  return event[0].args
}
