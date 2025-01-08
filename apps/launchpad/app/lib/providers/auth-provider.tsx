import { createContext, useContext, useEffect } from 'react'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useNavigate } from '@remix-run/react'

interface AuthContextType {
  isReady: boolean
  isAuthenticated: boolean
  walletAddress: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { ready: privyReady, authenticated, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const navigate = useNavigate()

  // Watch for wallet changes and update session
  useEffect(() => {
    const updateSession = async () => {
      if (authenticated && wallets.length > 0) {
        const wallet = wallets[0]
        console.log('Wallet connected, updating session:', wallet.address)

        const response = await fetch('/actions/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wallet: wallet.address }),
        })

        if (!response.ok) {
          console.error('Failed to update session:', await response.text())
        }
      }
    }

    updateSession()
  }, [authenticated, wallets])

  const connect = async () => {
    try {
      await login()
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const disconnect = async () => {
    try {
      await fetch('/actions/disconnect', { method: 'POST' })
      await logout()
      navigate('.', { replace: true })
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  const value: AuthContextType = {
    isReady: privyReady,
    isAuthenticated: authenticated,
    walletAddress: wallets[0]?.address ?? null,
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
