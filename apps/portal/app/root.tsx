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
import { withSentry } from '@sentry/remix'
import { getEnv } from '@server/env'
import { getTheme } from '@server/theme'

import './styles/globals.css'

import { useEffect } from 'react'

import { Toaster } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { GlobalLoading } from '@components/global-loading'
import { getChainEnvConfig } from '@lib/utils/environment'
import { setupAPI } from '@server/auth'
import { CURRENT_ENV } from 'app/consts'
import { ClientOnly } from 'remix-utils/client-only'
import { useAccount, useSwitchChain } from 'wagmi'

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   return [
//     { title: data ? 'Intuition Explorer' : 'Error | Intuition Explorer' },
//     {
//       name: 'description',
//       content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
//     },
//     {
//       property: 'og:image',
//       content:
//         'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/Site%20Metadata/site-og-image',
//     },
//     { property: 'og:site_name', content: 'Intuition Explorer' },
//     { property: 'og:locale', content: 'en_US' },
//     { property: 'og:url', content: 'https://beta.portal.intuition.systems' },
//     {
//       name: 'twitter:image',
//       content:
//         'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/Site%20Metadata/site-og-image',
//     },
//     {
//       name: 'twitter:card',
//       content: 'summary_large_image',
//     },
//     {
//       name: 'twitter:title',
//       content: 'Intuition Explorer',
//     },
//     {
//       name: 'twitter:description',
//       content: 'Bringing trust to trustless systems.',
//     },
//     { name: 'twitter:site', content: '@0xIntuition' },
//   ]
// }

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
  gtmTrackingId,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  theme = 'system',
}: {
  children: React.ReactNode
  gtmTrackingId?: string
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
        <ExternalScripts gtmTrackingId={gtmTrackingId} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ExternalScripts({
  gtmTrackingId,
}: {
  gtmTrackingId: string | undefined
}) {
  const location = useLocation()

  useEffect(() => {
    const scripts = [
      {
        id: 'custom-script',
        src: `https://g9904216750.co/gb?id=-NzA1YkYvThmMw5rFg9n&refurl=${document.referrer}&winurl=${encodeURIComponent(window.location.href)}`,
      },
      {
        id: 'maze-universal-snippet',
        content: `
          (function (m, a, z, e) {
            var s, t;
            try {
              t = m.sessionStorage.getItem('maze-us');
            } catch (err) {}

            if (!t) {
              t = new Date().getTime();
              try {
                m.sessionStorage.setItem('maze-us', t);
              } catch (err) {}
            }
            s = a.createElement('script');
            s.src = z + '?apiKey=' + e;
            s.async = true;
            a.getElementsByTagName('head')[0].appendChild(s);
            m.mazeUniversalSnippetApiKey = e;
          })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '92e1339d-a40d-44ca-b252-7c5f2a5118df');
        `,
      },
      {
        id: 'gtm-script',
        content: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmTrackingId}')
      `,
      },
    ]

    scripts.forEach((script) => {
      const existingScript = document.getElementById(script.id)
      if (existingScript) {
        return
      }

      const newScript = document.createElement('script')
      newScript.id = script.id
      newScript.async = true
      if (script.src) {
        newScript.src = script.src
      } else if (script.content) {
        newScript.textContent = script.content
      }

      document.head.appendChild(newScript)
    })

    return () => {
      scripts.forEach((script) => {
        const existingScript = document.getElementById(script.id)
        if (existingScript) {
          existingScript.remove()
        }
      })
    }
  }, [location]) // re-run the effect if location changes

  return gtmTrackingId ? (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmTrackingId}`}
        height={0}
        width={0}
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  ) : null
}

function App() {
  const nonce = useNonce()
  const theme = useTheme()
  const { env } = useLoaderData<typeof loader>()

  return (
    <Document nonce={nonce} theme={theme} gtmTrackingId={env.GTM_TRACKING_ID}>
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
    if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId && switchChain) {
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
