import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
}

export function Providers({ children, env }: ProvidersProps) {
  return (
    <PrivyConfig env={env}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <AuthProvider>{children}</AuthProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyConfig>
  )
}
