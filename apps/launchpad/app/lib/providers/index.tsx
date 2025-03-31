import { WagmiProvider } from '@privy-io/wagmi'
import { FeatureFlags } from '@server/env'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { wagmiConfig } from '../utils/wagmi'
import { AuthProvider } from './auth-provider'
import { FeatureFlagsProvider } from './feature-flags-provider'
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
  featureFlags?: FeatureFlags
}

export function Providers({
  children,
  env,
  dehydratedState,
  featureFlags,
}: ProvidersProps) {
  return (
    <PrivyConfig env={env}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <AuthProvider>
            <HydrationBoundary state={dehydratedState}>
              {featureFlags && (
                <FeatureFlagsProvider featureFlags={featureFlags}>
                  {children}
                </FeatureFlagsProvider>
              )}
            </HydrationBoundary>
          </AuthProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyConfig>
  )
}
