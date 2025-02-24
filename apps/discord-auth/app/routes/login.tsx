import { useEffect, useState } from 'react'

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
  const [isComplete, setIsComplete] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [existingDetails, setExistingDetails] = useState<{
    hasWallet: boolean
    hasDiscord: boolean
  } | null>(null)

  console.log('Login component discordUser:', discordUser)
  console.log('Login component discordUser roles:', discordUser?.roles)

  // Handle Discord disconnect
  const handleDiscordDisconnect = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to disconnect Discord')
      }
      // Reload the page to reflect the session changes
      window.location.reload()
    } catch (error) {
      console.error('Error disconnecting Discord:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to disconnect Discord',
      )
    }
  }

  // Check if user exists when wallet is connected
  useEffect(() => {
    async function checkUserExists() {
      if (!privyUser?.wallet?.address) {
        return
      }

      try {
        const response = await fetch(
          `/api/auth/exists?walletAddress=${privyUser.wallet.address}`,
        )
        const data = await response.json()
        setUserExists(data.exists)
        setExistingDetails(data.details)
      } catch (error) {
        console.error('Error checking user existence:', error)
      }
    }

    checkUserExists()
  }, [privyUser?.wallet?.address])

  // Get descriptive text based on existing connections
  const getSetupDescription = () => {
    if (!userExists) {
      return "You're all set! Click below to complete your registration and start exploring."
    }

    if (existingDetails?.hasWallet && existingDetails?.hasDiscord) {
      return 'Update your registration with the latest Discord and wallet information.'
    }

    if (existingDetails?.hasWallet) {
      return 'This wallet is already connected to a different Discord account. Connecting will update the Discord association.'
    }

    if (existingDetails?.hasDiscord) {
      return 'This Discord account is already connected to a different wallet. Connecting will update the wallet association.'
    }

    return 'Update your registration with the latest information.'
  }

  // Get button text based on state
  const getButtonText = () => {
    if (isConnecting) {
      return 'Setting up...'
    }
    if (!userExists) {
      return 'Complete Setup'
    }

    if (existingDetails?.hasWallet && existingDetails?.hasDiscord) {
      return 'Update Registration'
    }

    if (existingDetails?.hasWallet) {
      return 'Update Discord Connection'
    }

    if (existingDetails?.hasDiscord) {
      return 'Update Wallet Connection'
    }

    return 'Update Registration'
  }

  async function handleStoreUser() {
    if (!privyUser?.wallet?.address) {
      return
    }

    setIsConnecting(true)
    setError(undefined)
    setIsComplete(false)

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

      setIsComplete(true)
      setUserExists(true)
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
            onDisconnect={handleDiscordDisconnect}
            discordUser={discordUser || undefined}
          />
        )}

        {/* Complete Setup - Only show when both are connected */}
        {discordUser && privyUser?.wallet?.address && (
          <div className="w-full max-w-md bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Complete Setup</h3>
            <p className="text-sm text-gray-400 mb-4">
              {getSetupDescription()}
            </p>
            {error && (
              <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                {error}
              </div>
            )}
            {isComplete && (
              <div className="p-3 mb-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-500">
                {userExists
                  ? 'Registration updated successfully!'
                  : 'Registration completed successfully!'}
              </div>
            )}
            <Button
              variant="primary"
              onClick={handleStoreUser}
              disabled={isConnecting}
              className="w-full"
            >
              {getButtonText()}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
