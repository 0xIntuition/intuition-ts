import { wagmiConfig } from '@lib/utils/wagmi'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import { addRpcUrlOverrideToChain, PrivyProvider } from '@privy-io/react-auth'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { baseSepolia } from 'viem/chains'

const queryClient = new QueryClient()

// uses pattern to ensure this is set. we'll need this for the base override as well
const alchemyBaseSepoliaRpcUrl =
  typeof window !== 'undefined'
    ? window.ENV?.ALCHEMY_BASE_SEPOLIA_RPC_URL
    : process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL

const baseSepoliaOverride = addRpcUrlOverrideToChain(
  baseSepolia,
  alchemyBaseSepoliaRpcUrl,
)

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'all-users',
    requireUserPasswordOnCreate: false,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'sms', 'discord', 'twitter', 'github'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
  defaultChain: baseSepolia,
  supportedChains: [baseSepoliaOverride],
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
