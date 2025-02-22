import React from 'react'

import type { PrivyClientConfig } from '@privy-io/react-auth'
import { PrivyProvider } from '@privy-io/react-auth'
import { base, baseSepolia, mainnet } from 'viem/chains'

const privyConfig: PrivyClientConfig = {
  loginMethods: ['wallet'],
  appearance: {
    theme: 'dark' as const,
    showWalletLoginFirst: true,
  },
  defaultChain: base,
  supportedChains: [mainnet, base, baseSepolia],
}

interface PrivyConfigProps {
  children: React.ReactNode
  env?: {
    PRIVY_APP_ID: string
  }
}

export function PrivyConfig({ children, env }: PrivyConfigProps) {
  return (
    <PrivyProvider
      appId={env?.PRIVY_APP_ID ?? 'clvcwhbx3082nypes1173q3wd'}
      config={privyConfig}
    >
      {children}
    </PrivyProvider>
  )
}
