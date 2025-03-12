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
  useRouteError,
} from '@remix-run/react'

import './styles/globals.css'

import { Toaster } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Investors' : 'Error | Intuition Investors' },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/investor-landing/site_og_image_strategic',
    },
    { property: 'og:site_name', content: 'Intuition Investors' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:url', content: 'https://beta.portal.intuition.systems' }, //TODO: Update
    {
      name: 'twitter:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/investor-landing/site_og_image_strategic',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Intuition Investors',
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
    },
  })
}

export function Document({
  children,
  nonce,
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-background">
        <main className="relative flex min-h-screen w-full flex-col justify-between antialiased bg-gradient-to-br from-foreground/10 to-background/50">
          <div className="z-10 flex-1">{children}</div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function App() {
  const nonce = useNonce()

  return (
    <Document nonce={nonce}>
      <Toaster position="top-right" />
      <AppLayout />
    </Document>
  )
}

export function AppLayout() {
  return <Outlet />
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

export default App
