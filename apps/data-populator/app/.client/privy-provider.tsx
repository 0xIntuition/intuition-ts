import React from 'react'

import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth'

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  externalWallets: {
    coinbaseWallet: {
      // Valid connection options include 'eoaOnly' (default), 'smartWalletOnly', or 'all'
      connectionOptions: 'all',
    },
  },
  loginMethods: ['wallet', 'email', 'sms'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
}

export default function ClientOnlyPrivyProvider({
  privyAppId,
  children,
}: {
  privyAppId: string
  children: React.ReactNode
}) {
  return (
    <div>
      <PrivyProvider
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        appId={privyAppId as string}
        config={privyConfig}
      >
        {children}
      </PrivyProvider>
    </div>
  )
}
