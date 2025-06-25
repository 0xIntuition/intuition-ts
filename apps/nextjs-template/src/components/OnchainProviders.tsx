'use client'

import type { ReactNode } from 'react'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base, baseSepolia } from 'viem/chains'
import { WagmiProvider } from 'wagmi'

type Props = { children: ReactNode }

const queryClient = new QueryClient()

function OnchainProviders({ children }: Props) {
  const config = getDefaultConfig({
    appName: 'Intuition',
    projectId: 'TEST_123456789',
    chains: [base, baseSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
  })

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default OnchainProviders
