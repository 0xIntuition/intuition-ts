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

import { Toaster } from '@0xintuition/1ui'
import { configureClient } from '@0xintuition/graphql'

import { LoadingState } from '@components/loading-state'
import { VideoBackground } from '@components/video-background'
import { API_URL_DEV, API_URL_PROD, CURRENT_ENV } from '@consts/general'
import { json } from '@remix-run/node'
import { getEnv } from '@server/env'
import { ClientOnly } from 'remix-utils/client-only'

// Configure GraphQL client at module initialization using the URLs from the package. For now, we should use the local URL for development
// This can be updated to use the same environment approach that we use in Portal in the future, or leave up to the template user to configure however makes sense for their use case
configureClient({
  apiUrl: CURRENT_ENV === 'development' ? API_URL_DEV : API_URL_PROD, // TODO: Update these in GraphQL package and import from there instead
})

export async function loader() {
  return json({
    env: getEnv(),
  })
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Intuition | The All Seeing Eye' },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1740204578/Launchpad%20Assets/all-seeing-eye.webp',
    },
    { property: 'og:site_name', content: 'Intuition | The All Seeing Eye' },
    { property: 'og:locale', content: 'en_US' },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Intuition | The All Seeing Eye',
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
}: {
  children: React.ReactNode
  theme?: string
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { env } = useLoaderData<typeof loader>()

  return (
    <Document theme="dark">
      <Toaster position="top-right" />
      <ClientOnly fallback={<LoadingState />}>
        {() => (
          <Providers env={env}>
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
