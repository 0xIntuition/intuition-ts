import { useEffect } from 'react'

import { toast } from '@0xintuition/1ui'

import { usePrivy } from '@privy-io/react-auth'

/**
 * Test utility for auth flows
 * This is used to verify that auth is working correctly
 */
export function useTestAuth() {
  const { ready, authenticated, user } = usePrivy()

  useEffect(() => {
    if (!ready) {
      return
    }

    // Test auth state
    console.info('Auth State:', {
      ready,
      authenticated,
      hasUser: !!user,
      wallet: user?.wallet?.address,
    })

    // Test social linking if enabled
    if (process.env.ENABLE_SOCIAL_LINKING === 'true') {
      console.info('Social Linking:', {
        linkedAccounts: user?.linkedAccounts,
      })
    }
  }, [ready, authenticated, user])

  return {
    testConnect: async () => {
      try {
        // Test wallet connection
        const provider = await window.ethereum?.request({
          method: 'eth_requestAccounts',
        })
        console.info('Wallet Connected:', provider)
        toast.success('Wallet connection test passed')
        return true
      } catch (error) {
        console.error('Wallet Connection Test Failed:', error)
        toast.error('Wallet connection test failed')
        return false
      }
    },

    testDisconnect: async () => {
      try {
        // Test wallet disconnection
        await window.ethereum?.request({ method: 'wallet_disconnect' })
        console.info('Wallet Disconnected')
        toast.success('Wallet disconnection test passed')
        return true
      } catch (error) {
        console.error('Wallet Disconnection Test Failed:', error)
        toast.error('Wallet disconnection test failed')
        return false
      }
    },
  }
}
