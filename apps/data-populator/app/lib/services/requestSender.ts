import { getUserWallet } from '@server/auth'

import { getSender as getBackendSender } from './evm'

export async function getSender(nodeRequest?: Request): Promise<string> {
  if (nodeRequest) {
    const walletAddr = await getUserWallet(nodeRequest)
    console.log('Server-side getSender returned wallet address: ', walletAddr)
    if (walletAddr) {
      return walletAddr
    }
  }
  console.log('Server-side getSender returned BACK-END WALLET')
  return (await getBackendSender()).toString()
}
