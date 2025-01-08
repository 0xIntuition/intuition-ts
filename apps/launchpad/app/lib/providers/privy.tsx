import React, { Suspense } from 'react'

import { ErrorPage } from '@components/ErrorPage'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import { isRouteErrorResponse, useRouteError } from '@remix-run/react'

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

export function PrivyConfig({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <PrivyProvider
        appId="clvcwhbx3082nypes1173q3wd"
        clientId="client-WY2kRkuZcyjbMMefCFndHwN87sf6qbxK1zfseTx3Gp2mC"
        config={privyConfig}
      >
        {children}
      </PrivyProvider>
    </Suspense>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  let statusCode
  let description =
    'There was an error connecting to your wallet. Please try again.'

  if (isRouteErrorResponse(error)) {
    statusCode = error.status
    description = error.data
  }

  return (
    <ErrorPage
      routeName="privy-provider"
      statusCode={statusCode}
      description={description}
    />
  )
}
