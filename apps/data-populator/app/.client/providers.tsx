import { alchemyRpcUrlMap } from '@lib/utils/chains'
import { wagmiConfig } from '@lib/utils/wagmi'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import { addRpcUrlOverrideToChain, PrivyProvider } from '@privy-io/react-auth'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base, baseSepolia } from 'viem/chains'

const queryClient = new QueryClient()

const baseSepoliaOverride = addRpcUrlOverrideToChain(
  baseSepolia,
  alchemyRpcUrlMap(baseSepolia.id),
)

const baseMainnetOverride = addRpcUrlOverrideToChain(
  base,
  alchemyRpcUrlMap(base.id),
)

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'sms', 'github'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
  defaultChain:
    import.meta.env.VITE_DEPLOY_ENV === 'development' ? baseSepolia : base,
  supportedChains: [baseSepoliaOverride, baseMainnetOverride],
}

export default function Providers({
  privyAppId,
  children,
}: {
  privyAppId: string
  children: React.ReactNode
}) {
  return (
    <PrivyProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      appId={privyAppId as string}
      config={privyConfig}
    >
      <SmartWalletsProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </SmartWalletsProvider>
    </PrivyProvider>
  )
}
