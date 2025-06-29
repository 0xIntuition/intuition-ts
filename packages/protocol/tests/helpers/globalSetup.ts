import 'dotenv/config'

import { startProxy } from '@viem/anvil'

export default async function () {
  return await startProxy({
    port: 8545, // By default, the proxy will listen on port 8545.
    host: '::', // By default, the proxy will listen on all interfaces.
    options: {
      forkUrl: process.env.MAINNET_RPC_URL,
      forkBlockNumber: 22782330,
      // You can specify the chain ID if you want to use a different one than the default
      chainId: 123,
    },
  })
}
