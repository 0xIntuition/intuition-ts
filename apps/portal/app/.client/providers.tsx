import { wagmiConfig } from '@lib/utils/wagmi'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'sms'],
  appearance: {
    showWalletLoginFirst: true,
  },
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      appId={'clvcwhbx3082nypes1173q3wd' as string}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
