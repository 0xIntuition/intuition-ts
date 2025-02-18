import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { toast } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useLogin, useLogout, usePrivy, useWallets } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'

import { getPrivyErrorMessage } from '../utils/privy-errors'

interface AuthContextType {
  isReady: boolean
  isAuthenticated: boolean
  isLoading: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const defaultAuthContext: AuthContextType = {
  isReady: false,
  isAuthenticated: false,
  isLoading: false,
  connect: async () => {},
  disconnect: async () => {},
}

function getSignMessage(domain: string) {
  const params = new URLSearchParams(window.location.search)
  let fullMessage = `claimr ⚡ Intuition Launchpad\n\n`
  fullMessage += `URI:\n${domain}\n\n`
  if (params.get('ref_id')) {
    fullMessage += `Referral ID:\n${params.get('ref_id')}\n\n`
  }
  fullMessage += `Nonce:\n${nanoid(16)}\n\n`
  fullMessage += `Issued At:\n${new Date().toISOString()}`
  return fullMessage
}

const SIGNATURE_KEY = 'launchpad_signatures'

function saveSignature(address: string, signature: string, message: string) {
  try {
    const signatures = JSON.parse(localStorage.getItem(SIGNATURE_KEY) || '{}')
    signatures[address.toLowerCase()] = { signature, message }
    localStorage.setItem(SIGNATURE_KEY, JSON.stringify(signatures))
  } catch (err) {
    console.error('Failed to save signature:', err)
  }
}

// Clear Claimr signature
function clearStoredSignature(address: string) {
  try {
    const signatures = JSON.parse(localStorage.getItem(SIGNATURE_KEY) || '{}')
    delete signatures[address.toLowerCase()]
    localStorage.setItem(SIGNATURE_KEY, JSON.stringify(signatures))
  } catch (err) {
    console.error('Failed to clear signature:', err)
  }
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { ready: privyReady, authenticated, user } = usePrivy()
  const { wallets } = useWallets()
  const [isLoading, setIsLoading] = useState(false)
  const revalidator = useRevalidator()
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const maxReconnectAttempts = 3
  const reconnectAttempts = useRef(0)
  const queryClient = useQueryClient()

  // Clear any pending reconnect attempts on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  // Handle unexpected disconnects and state changes
  useEffect(() => {
    // Handle unexpected disconnects
    if (privyReady && !authenticated && user?.wallet?.address) {
      logger('Detected unexpected disconnect, attempting to reconnect...')
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current += 1
          connect()
        }, 1000) // Wait 1 second before attempting reconnect
      } else {
        logger('Max reconnect attempts reached')
        toast.error('Connection lost. Please try connecting again.')
        reconnectAttempts.current = 0
      }
    }

    // Handle user data changes
    if (user) {
      revalidator.revalidate()
    }

    // Handle disconnects
    if (!authenticated && privyReady) {
      // Clear Claimr signature if there was a wallet connected
      if (user?.wallet?.address) {
        clearStoredSignature(user.wallet.address)
      }
      queryClient.clear()
      setIsLoading(false)
    }
  }, [privyReady, authenticated, user])

  useEffect(() => {
    if (privyReady) {
      setIsInitializing(false)
    }
  }, [privyReady])

  const { login } = useLogin({
    onComplete: async (params) => {
      logger('Login complete:', params)
      try {
        const walletAddress = params.user.wallet?.address
        if (!walletAddress) {
          logger('No wallet address found')
          toast.warning(
            'Connected without wallet. Some features may be limited.',
          )
          return
        }

        // Get the connected wallet
        const connectedWallet = wallets.find((w) => w.address === walletAddress)

        if (!connectedWallet) {
          logger('No wallet found')
          toast.warning(
            'Connected without wallet. Some features may be limited.',
          )
          return
        }

        // Get the provider for the connected wallet
        const provider = await connectedWallet.getEthereumProvider()

        // Always request a new Claimr signature when connecting
        const message = getSignMessage('https://launchpad.intuition.systems')
        const signature = await provider.request({
          method: 'personal_sign',
          params: [message, walletAddress],
        })

        // Save both signature and message
        saveSignature(walletAddress, signature, message)

        logger('Signature obtained:', signature)
        toast.success('Wallet Connected')
      } catch (err) {
        console.error('Failed to sign message:', err)
        toast.error('Failed to sign message. Some features may be limited.')
      } finally {
        setIsLoading(false)
        reconnectAttempts.current = 0
        revalidator.revalidate()
      }
    },
    onError: (error: string) => {
      console.error('Login error:', error)
      setIsLoading(false)
      toast.error(getPrivyErrorMessage(error))
    },
  })

  const { logout } = useLogout({
    onSuccess: () => {
      // Clear Claimr signature if there was a wallet connected
      if (user?.wallet?.address) {
        clearStoredSignature(user.wallet.address)
      }
      setIsLoading(false)
      toast.warning('Wallet Disconnected')
      revalidator.revalidate()
      // Handle any cleanup after successful logout
      reconnectAttempts.current = 0
    },
  })

  const connect = async () => {
    try {
      setIsLoading(true)
      await login()
    } catch (error) {
      console.error('Connect error:', error)
      setIsLoading(false)
      if (error instanceof Error) {
        toast.error(getPrivyErrorMessage(error.message))
      } else {
        toast.error('Failed to connect. Please try again.')
      }
    }
  }

  const disconnect = async () => {
    try {
      setIsLoading(true)
      await logout()
    } catch (error) {
      console.error('Failed to disconnect:', error)
      if (error instanceof Error) {
        toast.error(getPrivyErrorMessage(error.message))
      } else {
        toast.error('Failed to disconnect. Please try again.')
      }
    } finally {
      setIsLoading(false)
      reconnectAttempts.current = 0 // Reset reconnect attempts on disconnect
    }
  }

  const value: AuthContextType = {
    isReady: privyReady,
    isAuthenticated: authenticated,
    isLoading,
    connect,
    disconnect,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
