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

  return json({
    discordUser: session.discordUser,
    discordAuthUrl,
  })
}

export default function Login() {
  const { discordUser, discordAuthUrl } = useLoaderData<typeof loader>()
  const { user: privyUser, login, logout } = usePrivy()
  const walletAddress = privyUser?.wallet?.address?.toLowerCase()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string>()
  const [isComplete, setIsComplete] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [existingDetails, setExistingDetails] = useState<{
    hasWallet: boolean
    hasDiscord: boolean
  } | null>(null)

  // Handle Discord disconnect
  const handleDiscordDisconnect = async () => {
    try {
      const response = await fetch('/resources/logout', {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to disconnect Discord')
      }
      // Reload the page to reflect the session changes
      window.location.reload()
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to disconnect Discord',
      )
    }
  }

  // Check if user exists when wallet is connected
  useEffect(() => {
    async function checkUserExists() {
      if (!walletAddress) {
        return
      }

      try {
        const response = await fetch(
          `/resources/exists?walletAddress=${walletAddress}`,
        )
        const data = await response.json()
        setUserExists(data.exists)
        setExistingDetails(data.details)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to check user existence',
        )
      }
    }

    checkUserExists()
  }, [walletAddress])

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
    if (!walletAddress) {
      return
    }

    setIsConnecting(true)
    setError(undefined)
    setIsComplete(false)

    try {
      const requestData = {
        walletAddress,
      }

      const response = await fetch('/resources/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to store auth data')
      }

      setIsComplete(true)
      setUserExists(true)
    } catch (error) {
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
          isConnected={Boolean(walletAddress)}
          onConnect={login}
          onDisconnect={logout}
          privyUser={privyUser as PrivyUser}
        />

        {/* Discord Connection - Only show after wallet is connected */}
        {walletAddress && (
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
        {discordUser && walletAddress && (
          <div className="w-full max-w-md rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 p-6 border border-border/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Complete Setup</h3>
              {discordUser.totalPoints ? (
                <span className="text-sm bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                  {discordUser.totalPoints.toLocaleString()} points
                </span>
              ) : null}
            </div>
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
