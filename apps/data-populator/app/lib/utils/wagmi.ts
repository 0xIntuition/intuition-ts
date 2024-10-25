import { createConfig } from '@privy-io/wagmi'
import { base, baseSepolia } from 'viem/chains'
import { Config } from 'wagmi'

import { transportsMap } from './chains'

export const wagmiConfig: Config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: transportsMap(base.id),
    [baseSepolia.id]: transportsMap(baseSepolia.id),
  },
})
