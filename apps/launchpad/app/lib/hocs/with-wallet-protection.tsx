import { useEffect } from 'react'

import { useAuth } from '@lib/providers/auth-provider'
import { getSession } from '@lib/session'
import { AUTH_ERROR_CODES, handleAuthError } from '@lib/utils/auth-errors'
import { redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'

/**
 * HOC that protects routes requiring wallet connection
 * Automatically handles redirects and loading states
 */
export function withWalletProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isReady, walletAddress } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (isReady && !isAuthenticated) {
        navigate('/dashboard')
      }
    }, [isReady, isAuthenticated, navigate])

    if (!isReady) {
      return <div>Loading...</div> // Could be replaced with a proper loading component
    }

    if (!walletAddress) {
      throw handleAuthError(
        new Error('Wallet connection required'),
        AUTH_ERROR_CODES.WALLET_REQUIRED,
      )
    }

    return <WrappedComponent {...props} />
  }
}

/**
 * Server-side loader function for protected routes
 */
export async function requireWalletLoader(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  if (!session.has('wallet')) {
    throw redirect('/dashboard')
  }
  return { wallet: session.get('wallet') }
}
