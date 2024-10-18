import Providers from '@client/providers'
import { ClientHintCheck, getHints } from '@lib/utils/client-hints'
import { useNonce } from '@lib/utils/nonce-provider'
import { json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
  useRouteError,
} from '@remix-run/react'
import { useTheme } from '@routes/actions+/set-theme'
import { getEnv } from '@server/env'
import { getTheme } from '@server/theme'

import './styles/globals.css'

import { useEffect, useMemo, useState } from 'react'

import { Toaster } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { createSupabaseServerClient } from '@server/supabase'
import { createBrowserClient } from '@supabase/auth-helpers-remix'
import { CURRENT_ENV } from 'app/consts'
import { ClientOnly } from 'remix-utils/client-only'
import { useAccount, useSwitchChain } from 'wagmi'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data
        ? 'Intuition Data Populator'
        : 'Error | Intuition Data Populator',
    },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/Site%20Metadata/site-og-image',
    },
    { property: 'og:site_name', content: 'Intuition Data Populator' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:url', content: 'https://beta.portal.intuition.systems' },
    {
      name: 'twitter:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/Site%20Metadata/site-og-image',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Intuition Data Populator',
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const env = getEnv()

  return json({
    env,
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  })
}

export function Document({
  children,
  nonce,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  theme = 'system',
}: {
  children: React.ReactNode
  nonce?: string
  theme?: string
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {nonce && <ClientHintCheck nonce={nonce} />}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="relative flex min-h-screen w-full flex-col justify-between antialiased">
          <div className="z-10 flex-1">{children}</div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function App() {
  const nonce = useNonce()
  const theme = useTheme()
  const { env } = useLoaderData<typeof loader>()

  return (
    <Document nonce={nonce} theme={theme}>
      <Toaster position="top-right" />
      <ClientOnly>
        {() => (
          <Providers privyAppId={env.PRIVY_APP_ID}>
            <AppLayout />
          </Providers>
        )}
      </ClientOnly>
    </Document>
  )
}

export function AppLayout() {
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId && switchChain) {
      switchChain({
        chainId: getChainEnvConfig(CURRENT_ENV).chainId,
      })
    }
  }, [chain, switchChain])

  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  let statusCode
  let title
  let description

  if (isRouteErrorResponse(error)) {
    statusCode = error.status
    if (error.status === 404) {
      title = 'Page not found'
      description = `Unfortunately, the page you are looking for does not exist.\n If you believe this is a mistake, please let us know and we'll get it sorted out.`
    } else {
      title = error.statusText
      description = error.data
    }
  }

  return (
    <Document>
      <ErrorPage
        isAtRoot
        routeName="root"
        statusCode={statusCode}
        title={title}
        description={description}
      />
    </Document>
  )
}

export default App
