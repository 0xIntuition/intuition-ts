import { createContext, useContext, useState } from 'react'

import { TooltipProvider } from '@0xintuition/1ui'

import { wagmiConfig } from '@lib/utils/wagmi'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import { PrivyProvider } from '@privy-io/react-auth'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Add tooltip context
interface TooltipContextType {
  enabled: boolean
  toggleTooltips: () => void
}

const TooltipContext = createContext<TooltipContextType>({
  enabled: true,
  toggleTooltips: () => {},
})

// Export the hook
export function useTooltips() {
  return useContext(TooltipContext)
}

// const baseSepoliaOverride = addRpcUrlOverrideToChain(
//   baseSepolia,
//   alchemyRpcUrlMap(baseSepolia.id),
// )

// const baseMainnetOverride = addRpcUrlOverrideToChain(
//   base,
//   alchemyRpcUrlMap(base.id),
// )

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
  // TODO: uncomment this when we add support for smart wallet providers
  // defaultChain:
  // import.meta.env.VITE_DEPLOY_ENV === 'development' ? baseSepolia : base,
  // supportedChains: [baseSepoliaOverride, baseMainnetOverride],
}

export default function Providers({
  privyAppId,
  children,
}: {
  privyAppId: string
  children: React.ReactNode
}) {
  const [tooltipsEnabled, setTooltipsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tooltipsEnabled')
      return saved ? JSON.parse(saved) : true
    }
    return true
  })

  const toggleTooltips = () => {
    setTooltipsEnabled((prev: boolean) => {
      const newValue = !prev
      localStorage.setItem('tooltipsEnabled', JSON.stringify(newValue))
      return newValue
    })
  }

  return (
    <TooltipContext.Provider
      value={{ enabled: tooltipsEnabled, toggleTooltips }}
    >
      <TooltipProvider>
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
      </TooltipProvider>
    </TooltipContext.Provider>
  )
}
