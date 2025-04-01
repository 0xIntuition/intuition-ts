import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { toast } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'

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
export const AuthContext = createContext<AuthContextType>(defaultAuthContext)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { ready: privyReady, authenticated, user } = usePrivy()
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
      queryClient.clear()
      setIsLoading(false)
    }
  }, [privyReady, authenticated, user])
  const { login } = useLogin({
    onComplete: (params) => {
      logger('Login complete:', params)
      setIsLoading(false)
      reconnectAttempts.current = 0 // Reset reconnect attempts on successful login
      toast.success('Wallet Connected')
      revalidator.revalidate()
    },
    onError: (error: string) => {
      console.error('Login error:', error)
      setIsLoading(false)
      toast.error(getPrivyErrorMessage(error))
    },
  })
  const { logout } = useLogout({
    onSuccess: () => {
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
