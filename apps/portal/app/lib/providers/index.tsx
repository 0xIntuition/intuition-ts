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
  return (
    <PrivyConfig env={env}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
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
