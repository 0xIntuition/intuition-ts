import { useMemo, useState } from 'react'
import { LoaderFunctionArgs, json, type MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'

import { base, baseSepolia, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { getEnv } from './.server/env'
import { ClientOnly } from 'remix-utils/client-only'
import Providers from './.client/Providers'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Portal' : 'Error | Intuition Portal' },
    { name: 'description', content: `Intuition Portal` },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    env: getEnv(),
  })
}

export function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

const queryClient = new QueryClient() // Set up a tanstack QueryClient. Required for wagmi v2

export default function App() {
  const { env } = useLoaderData<typeof loader>()

  return (
    <Document>
      <ClientOnly>
        {() => (
          <Providers>
            <Outlet />
          </Providers>
        )}
      </ClientOnly>
    </Document>
  )
}
