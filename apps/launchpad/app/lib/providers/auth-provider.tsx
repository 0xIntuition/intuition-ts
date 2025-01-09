import { createContext, useContext, useEffect, useState } from 'react'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'

import { AuthState } from '../types/auth'
import { AUTH_ERROR_CODES, handleAuthError } from '../utils/auth-errors'

interface AuthContextType extends AuthState {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const initialState: AuthState = {
  isReady: false,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  walletAddress: null,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { ready: privyReady, authenticated, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const revalidator = useRevalidator()
  const [state, setState] = useState<AuthState>(initialState)

  // Watch for wallet changes and update session
  useEffect(() => {
    const updateSession = async () => {
      if (authenticated && wallets.length > 0) {
        const wallet = wallets[0]
        console.log('Wallet connected, updating session:', wallet.address)

        try {
          const response = await fetch('/actions/connect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet: wallet.address }),
          })

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText)
          }
        } catch (error) {
          console.error('Failed to update session:', error)
          setState((prev) => ({
            ...prev,
            error: handleAuthError(error, AUTH_ERROR_CODES.SESSION_ERROR),
          }))
        }
      }
    }

    updateSession()
  }, [authenticated, wallets])

  // Update state when Privy state changes
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isReady: privyReady,
      isAuthenticated: authenticated,
      walletAddress: wallets[0]?.address ?? null,
    }))
  }, [privyReady, authenticated, wallets])

  const connect = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      await login()
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleAuthError(error, AUTH_ERROR_CODES.CONNECTION_FAILED),
      }))
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const disconnect = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await fetch('/actions/disconnect', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to clear session')
      }
      await logout()
      revalidator.revalidate()
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleAuthError(error, AUTH_ERROR_CODES.DISCONNECT_FAILED),
      }))
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const value: AuthContextType = {
    ...state,
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
