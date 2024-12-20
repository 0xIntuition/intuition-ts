import { SidebarProvider } from '@0xintuition/1ui'
import { API_URL_LOCAL, configureClient } from '@0xintuition/graphql'

import Providers from '@components/providers'
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import './styles/globals.css'

import { AppSidebar } from '@components/AppSidebar'

// Configure GraphQL client at module initialization using the URLs from the package. For now, we should use the local URL for development
// This can be updated to use the same environment approach that we use in Portal in the future, or leave up to the template user to configure however makes sense for their use case
configureClient({
  apiUrl: API_URL_LOCAL,
})

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
      content: 'Intuition Explorer',
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="relative ml-[16rem] flex min-h-screen w-[calc(100%-16rem)] flex-col antialiased bg-[#131313]">
            {children}
            <ScrollRestoration />
            <Scripts />
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}

export default function App() {
  // TODO: Our Providers aren't wrapped with ClientOnly yet -- we can revisit the necessity once we bring Privy in
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}
