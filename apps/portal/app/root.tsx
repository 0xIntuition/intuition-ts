import { useMemo, useState } from 'react'
import { LoaderFunctionArgs, json, type MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { RainbowKitProvider, darkTheme, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { phantomWallet, rabbyWallet } from '@rainbow-me/rainbowkit/wallets'
import { WagmiProvider, http, useAccount, useDisconnect, useSwitchChain, useWalletClient } from 'wagmi'
import { base, baseSepolia, mainnet, type Chain } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

import { getEnv } from './.server/env'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Portal' : 'Error | Intuition Portal' },
    { name: 'description', content: `Intuition Portal` },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    env: getEnv(),
  })
}

export function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const queryClient = new QueryClient() // Set up a tanstack QueryClient. Required for wagmi v2

export default function App() {
  const { env } = useLoaderData<typeof loader>()
  const { wallets } = getDefaultWallets()

  const [{ config, chains }] = useState(() => {
    const testChains = [baseSepolia] // @TODO: Change this during the chains refactor since it's a different approach

    const chains: readonly [Chain, ...Chain[]] = [mainnet, ...testChains]

    const config = getDefaultConfig({
      appName: 'Intuition Portal',
      projectId: env.WALLETCONNECT_PROJECT_ID!,
      chains,
      ssr: true,
      wallets: [
        ...wallets,
        {
          groupName: 'Other',
          wallets: [phantomWallet, rabbyWallet],
        },
      ], // Frame should already show up if it is installed
      transports: {
        [mainnet.id]: http(env.ALCHEMY_MAINNET_RPC_URL!),
        [baseSepolia.id]: http(env.ALCHEMY_BASE_SEPOLIA_RPC_URL!),
        [base.id]: http(env.ALCHEMY_BASE_RPC_URL!),
      },
    })
    return { config, chains }
  })

  return (
    <Document>
      {config && chains && (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
              <Outlet />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      )}
    </Document>
  )
}
