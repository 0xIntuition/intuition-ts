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
import {
  // API_URL_DEV,
  API_URL_PROD,
  configureClient,
} from '@0xintuition/graphql'

import { CURRENT_ENV } from '@consts/general'
import { json } from '@remix-run/node'
import { setupAPI } from '@server/auth'
import { getEnv } from '@server/env'

// Configure GraphQL client at module initialization using the URLs from the package. For now, we should use the local URL for development
// This can be updated to use the same environment approach that we use in Portal in the future, or leave up to the template user to configure however makes sense for their use case
configureClient({
  apiUrl:
    CURRENT_ENV === 'development'
      ? 'https://prod.base-sepolia.intuition-api.com/v1/graphql'
      : API_URL_PROD,
})

export async function loader() {
  setupAPI()

  return json({
    env: getEnv(),
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
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/Site%20Metadata/site-og-image',
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
      <Providers env={env}>
        <AppLayout />
      </Providers>
    </Document>
  )
}

export function AppLayout() {
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between antialiased">
      <Outlet />
    </main>
  )
}
