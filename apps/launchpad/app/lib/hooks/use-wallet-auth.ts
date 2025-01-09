import { useCallback } from 'react'

import { useAuth } from '@lib/providers/auth-provider'
import { AUTH_ERROR_CODES, handleAuthError } from '@lib/utils/auth-errors'

export function useWalletAuth() {
  const auth = useAuth()

  const ensureWallet = useCallback(() => {
    if (!auth.walletAddress) {
      throw handleAuthError(
        new Error('Wallet connection required'),
        AUTH_ERROR_CODES.WALLET_REQUIRED,
      )
    }
    return auth.walletAddress
  }, [auth.walletAddress])

  const handleConnect = useCallback(async () => {
    if (auth.isLoading) {
      return
    }

    try {
      await auth.connect()
      return true
    } catch (error) {
      return false
    }
  }, [auth])

  const handleDisconnect = useCallback(async () => {
    if (auth.isLoading) {
      return
    }

    try {
      await auth.disconnect()
      return true
    } catch (error) {
      return false
    }
  }, [auth])

  return {
    ...auth,
    ensureWallet,
    handleConnect,
    handleDisconnect,
    isConnected: !!auth.walletAddress,
  }
}
