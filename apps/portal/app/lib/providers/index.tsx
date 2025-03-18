// DEPRECATED: This file is no longer used. Please use the implementation in @client/providers.tsx instead.
// This file is maintained for backward compatibility but will be removed in a future release.

import { WagmiProvider } from '@privy-io/wagmi'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { wagmiConfig } from '../utils/wagmi'
import { AuthProvider } from './auth-provider'
import { PrivyConfig } from './privy'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  children: React.ReactNode
  env?: {
    PRIVY_APP_ID: string
  }
  dehydratedState?: unknown
}

export function Providers({ children, env, dehydratedState }: ProvidersProps) {
  console.warn(
    'DEPRECATED: Using deprecated providers implementation. Please use @client/providers.tsx instead.',
  )

  return (
    <PrivyConfig env={env}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <AuthProvider>
            <HydrationBoundary state={dehydratedState}>
              {children}
            </HydrationBoundary>
          </AuthProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyConfig>
  )
}
