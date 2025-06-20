import { createPublicClient, http, PublicClient, WalletClient } from 'viem'

export function getPublicClient(
  client: PublicClient | WalletClient,
): PublicClient {
  if (!client || !client?.chain) {
    throw new Error('Client is required to get public client')
  }

  if (client.account) {
    return createPublicClient({
      chain: client.chain,
      transport: http(),
    })
  }

  return client as PublicClient
}
