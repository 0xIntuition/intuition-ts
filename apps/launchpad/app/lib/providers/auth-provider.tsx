import { createContext, useContext, useState } from 'react'

import { toast } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'

import { getPrivyErrorMessage } from '../utils/privy-errors'

interface AuthContextType {
  isReady: boolean
  isAuthenticated: boolean
  isLoading: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { ready: privyReady, authenticated } = usePrivy()
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useLogin({
    onComplete: (params) => {
      logger('Login complete:', params)
      setIsLoading(false)
      toast.success('Wallet Connected')
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
    },
  })
  const revalidator = useRevalidator()

  const connect = async () => {
    setIsLoading(true)
    login()
  }

  const disconnect = async () => {
    try {
      setIsLoading(true)
      await logout()
      revalidator.revalidate()
    } catch (error) {
      console.error('Failed to disconnect:', error)
      if (error instanceof Error) {
        toast.error(getPrivyErrorMessage(error.message))
      } else {
        toast.error('Failed to disconnect. Please try again.')
      }
    } finally {
      setIsLoading(false)
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
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
