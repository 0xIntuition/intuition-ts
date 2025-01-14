import React, { Suspense } from 'react'

import type { PrivyClientConfig } from '@privy-io/react-auth'

const PrivyProvider = React.lazy(() =>
  import('@privy-io/react-auth').then((mod) => ({
    default: mod.PrivyProvider,
  })),
)

const privyConfig: PrivyClientConfig = {
  loginMethods: ['wallet'],
  appearance: {
    theme: 'dark' as const,
    showWalletLoginFirst: true,
  },
}

interface PrivyConfigProps {
  children: React.ReactNode
  env?: {
    PRIVY_APP_ID: string
  }
}

export function PrivyConfig({ children, env }: PrivyConfigProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <PrivyProvider
        appId={env?.PRIVY_APP_ID ?? 'clvcwhbx3082nypes1173q3wd'}
        config={privyConfig}
      >
        {children}
      </PrivyProvider>
    </Suspense>
  )
}
