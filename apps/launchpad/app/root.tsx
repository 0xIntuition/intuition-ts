import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import { Providers } from './lib/providers'

import './styles/globals.css'
import './styles/shimmer-animations.css'

import { Toaster } from '@0xintuition/1ui'
import { configureClient } from '@0xintuition/graphql'

import { LoadingState } from '@components/loading-state'
import { VideoBackground } from '@components/video-background'
import { API_URL_DEV, API_URL_PROD, CURRENT_ENV } from '@consts/general'
import { json } from '@remix-run/node'
import { getEnv, getFeatureFlags } from '@server/env'
import { ClientOnly } from 'remix-utils/client-only'

// Configure GraphQL client at module initialization using the URLs from the package. For now, we should use the local URL for development
// This can be updated to use the same environment approach that we use in Portal in the future, or leave up to the template user to configure however makes sense for their use case
configureClient({
  apiUrl: CURRENT_ENV === 'development' ? API_URL_DEV : API_URL_PROD, // TODO: Update these in GraphQL package and import from there instead
})

export async function loader() {
  console.log('HASURA_POINTS_ENDPOINT:', process.env.HASURA_POINTS_ENDPOINT)
  return json({
    env: getEnv(),
    featureFlags: getFeatureFlags(),
  })
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Intuition Launchpad' },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1740069816/Launchpad%20Assets/Site%20Metadata/launchpad-og-image_snmcvd.png',
    },
    { property: 'og:site_name', content: 'Intuition Launchpad' },
    { property: 'og:locale', content: 'en_US' },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Intuition Launchpad',
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function Document({
  children,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  theme = 'system',
  env,
}: {
  children: React.ReactNode
  theme?: string
  env?: any
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* Expose selected environment variables to the client */}
        {env && (
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(env)}`,
            }}
          />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { env, featureFlags } = useLoaderData<typeof loader>()

  return (
    <Document theme="dark" env={env}>
      <Toaster position="top-right" />
      <ClientOnly fallback={<LoadingState />}>
        {() => (
          <Providers env={env} featureFlags={featureFlags}>
            <AppLayout />
          </Providers>
        )}
      </ClientOnly>
    </Document>
  )
}

export function AppLayout() {
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between antialiased !bg-transparent">
      <VideoBackground />
      <Outlet />
    </main>
  )
}
