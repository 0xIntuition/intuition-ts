import { useState } from 'react'

import { Button } from '@0xintuition/1ui'

import { usePrivy } from '@privy-io/react-auth'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getDiscordAuthURL } from '../.server/discord'
import { getSession } from '../.server/session'
import { ConnectionCard } from '../components/connection-card'
import type { PrivyUser } from '../types/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)
  const discordAuthUrl = getDiscordAuthURL()

  console.log('Login loader session:', session)
  console.log('Login loader discord user:', session.discordUser)

  return json({
    discordUser: session.discordUser,
    discordAuthUrl,
  })
}

export default function Login() {
  const { discordUser, discordAuthUrl } = useLoaderData<typeof loader>()
  const { user: privyUser, ready, login, logout } = usePrivy()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string>()

  console.log('Login component discordUser:', discordUser)
  console.log('Login component discordUser roles:', discordUser?.roles)

  async function handleStoreUser() {
    if (!privyUser?.wallet?.address) {
      return
    }

    setIsConnecting(true)
    setError(undefined)

    try {
      const response = await fetch('/api/auth/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: privyUser.wallet.address,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to store auth data')
      }
    } catch (error) {
      console.error('Error storing user data:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to store auth data',
      )
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Welcome Intuit</h1>
        <p className="text-gray-400">Connect your accounts to get started</p>
      </div>

      <div className="space-y-4 w-full max-w-md">
        {/* Wallet Connection */}
        <ConnectionCard
          type="wallet"
          isConnected={Boolean(privyUser?.wallet?.address)}
          onConnect={login}
          onDisconnect={logout}
          privyUser={privyUser as PrivyUser}
          isLoading={!ready}
        />

        {/* Discord Connection - Only show after wallet is connected */}
        {privyUser?.wallet?.address && (
          <ConnectionCard
            type="discord"
            isConnected={Boolean(discordUser)}
            onConnect={() => {
              window.location.href = discordAuthUrl
            }}
            discordUser={discordUser || undefined}
          />
        )}

        {/* Complete Setup - Only show when both are connected */}
        {discordUser && privyUser?.wallet?.address && (
          <div className="w-full max-w-md bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Complete Setup</h3>
            <p className="text-sm text-gray-400 mb-4">
              You&apos;re all set! Click below to complete your registration and
              start exploring.
            </p>
            {error && (
              <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                {error}
              </div>
            )}
            <Button
              variant="primary"
              onClick={handleStoreUser}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
