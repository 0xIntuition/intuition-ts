import { Toaster } from '@0xintuition/1ui'
import Providers from '@client/providers'
import { ClientHintCheck, getHints } from '@lib/utils/client-hints'
import { CURRENT_ENV } from '@lib/utils/constants'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { useNonce } from '@lib/utils/nonce-provider'
import type {
  ConnectedWallet as ConnectedPrivyWallet,
  User as PrivyUser,
} from '@privy-io/react-auth'
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
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import { useTheme } from '@routes/actions+/set-theme'
import { isAuthedUser, login } from '@server/auth'
import { getEnv } from '@server/env'
import { formAction } from '@server/form'
import { getTheme } from '@server/theme'
import { QueryClient } from '@tanstack/react-query'
import type { PrivyModuleType, User } from '@types/privy'
import { makeDomainFunction } from 'domain-functions'
import { useEffect, useState } from 'react'
import { ClientOnly } from 'remix-utils/client-only'
import { z } from 'zod'
import './styles/globals.css'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Portal' : 'Error | Intuition Portal' },
    { name: 'description', content: `Intuition Portal` },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await isAuthedUser(request)
  logger('User in Root', user)

  return json({
    user,
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

interface FetcherData {
  didSessionError?: string
  user?: User
  token?: string
  refreshToken?: string
}

export function AppLayout() {
  const { env, user } = useLoaderData<typeof loader>()

  const submit = useSubmit()

  const [privyUser, setPrivyUser] = useState<PrivyUser | null>(null)
  const [privyWallet, setPrivyWallet] = useState<ConnectedPrivyWallet[] | null>(
    null,
  )
  const [privyModule, setPrivyModule] = useState<PrivyModuleType | null>(null)

  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@privy-io/react-auth')
        .then((module) => {
          setPrivyModule(module)
        })
        .catch((error) => console.error('Failed to load Privy module:', error))
    }
  }, [])

  useEffect(() => {
    if (privyModule) {
      const { getAccessToken } = privyModule
      getAccessToken()
        .then((accessToken: string | null) => {
          setAccessToken(accessToken ?? null)
        })
        .catch((error: unknown) => {
          console.error('Error fetching access token:', error)
        })
    }
  }, [privyModule])

  useEffect(() => {
    const wallet = privyWallet?.[0]

    if (
      wallet &&
      wallet.chainId.split(':')[1] !==
        getChainEnvConfig(CURRENT_ENV).chainId.toString()
    ) {
      wallet?.switchChain(getChainEnvConfig(CURRENT_ENV).chainId)
    }
  }, [privyWallet])

  useEffect(() => {
    async function handleLogin() {
      const formData = new FormData()
      formData.set('didSession', privyUser?.id ?? '')
      formData.set('wallet', privyUser?.wallet?.address ?? '')
      formData.set('accessToken', accessToken ?? '')
      submit(formData, {
        method: 'post',
      })
    }

    if (privyWallet && privyUser?.id && accessToken && !user) {
      handleLogin()
    }
  }, [privyWallet, privyUser, accessToken, user, submit])

  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between antialiased">
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
        {privyModule ? (
          <PrivyHookHandler
            privyModule={privyModule}
            setPrivyUser={setPrivyUser}
            setPrivyWallet={setPrivyWallet}
          />
        ) : null}
      </div>
    </main>
  )

  interface PrivyHookHandlerProps {
    privyModule: PrivyModuleType
    setPrivyUser: React.Dispatch<React.SetStateAction<PrivyUser | null>>
    setPrivyWallet: React.Dispatch<
      React.SetStateAction<ConnectedPrivyWallet[] | null>
    >
  }

  function PrivyHookHandler({
    privyModule,
    setPrivyUser,
    setPrivyWallet,
  }: PrivyHookHandlerProps) {
    const { usePrivy, useWallets } = privyModule
    const { user } = usePrivy()
    const { wallets } = useWallets()

    useEffect(() => {
      if (user && wallets) {
        setPrivyUser(user)
        setPrivyWallet(wallets)
      }
    }, [user, wallets, setPrivyUser, setPrivyWallet])

    return <></> // Needs to return this as a workaround from the hook rules
  }
}
