import { CURRENT_ENV } from '@lib/utils/constants'
import { getChainEnvConfig } from '@lib/utils/environment'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  type MetaFunction,
} from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import { QueryClient } from '@tanstack/react-query'
import { User } from '@types/user'
import { makeDomainFunction } from 'domain-functions'
import { useEffect, useState } from 'react'
import { ClientOnly } from 'remix-utils/client-only'
import { z } from 'zod'
import Providers from './.client/providers'
import { login } from './.server/auth'
import { getEnv } from './.server/env'
import { formAction } from './.server/form'
import { getTheme } from './.server/theme'
import { ClientHintCheck, getHints } from './lib/utils/client-hints'
import { useNonce } from './lib/utils/nonce-provider'
import { useTheme } from './routes/actions+/set-theme'
import './styles/globals.css'
import logger from '@lib/utils/logger'

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

const schema = z.object({
  didSession: z.string(),
  wallet: z.string(),
  accessToken: z.string(),
})

const mutation = makeDomainFunction(schema)(async (values) => {
  return values
})

export async function action({ request }: ActionFunctionArgs) {
  const resp = await formAction({
    request,
    schema,
    mutation,
  })
  if (resp.ok) {
    await login(request)
  }
  return null
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
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const queryClient = new QueryClient() // Set up a tanstack QueryClient. Required for wagmi v2

export default function App() {
  const nonce = useNonce()
  const theme = useTheme()

  return (
    <Document nonce={nonce} theme={theme}>
      <ClientOnly>
        {() => (
          <Providers>
            <AppLayout />
          </Providers>
        )}
      </ClientOnly>
    </Document>
  )
}

interface FetcherData {
  didSessionError?: string
  user?: User
  token?: string
  refreshToken?: string
}

export function AppLayout() {
  const { env } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<FetcherData>()
  const submit = useSubmit()
  const { user, login, logout, getAccessToken } = usePrivy()
  const { wallets } = useWallets()
  const wallet = wallets?.[0]
  const [accessToken, setAccessToken] = useState<string | null>(null)

  logger('accessToken', accessToken)
  useEffect(() => {
    getAccessToken().then((token) => {
      setAccessToken(token)
    })
  }, [])

  async function handleLogout() {
    logout()
    fetcher.submit({}, { method: 'post', action: '/actions/auth/logout' })
  }
  async function handleLogin() {
    const formData = new FormData()
    formData.set('didSession', user?.id ?? '')
    formData.set('wallet', user?.wallet?.address ?? '')
    formData.set('accessToken', accessToken ?? '')
    submit(formData, {
      method: 'post',
    })
  }

  // Detect Wrong Network  @TODO: Change approach to be based on env
  useEffect(() => {
    if (
      wallet &&
      wallet.chainId.split(':')[1] !==
        getChainEnvConfig(CURRENT_ENV).chainId.toString()
    ) {
      wallet.switchChain(getChainEnvConfig(CURRENT_ENV).chainId)
    }
  }, [wallet])

  // Trigger remix auth action if user has a did session and has signed
  useEffect(() => {
    if (wallet && user?.id && accessToken) {
      handleLogin()
    }
  }, [wallet, user, accessToken])

  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between antialiased">
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>
    </main>
  )
}
