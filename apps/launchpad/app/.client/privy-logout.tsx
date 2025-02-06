import { useEffect, useRef } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useSubmit } from '@remix-run/react'
import { useAccount, useDisconnect } from 'wagmi'

export default function PrivyLogout({ wallet }: { wallet: string }) {
  const { address, isConnected } = useAccount()
  const submit = useSubmit()
  const { logout, ready, authenticated } = usePrivy()
  const { disconnect } = useDisconnect()
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    let mounted = true
    const handleLogout = async () => {
      // Only proceed if Privy is ready and authenticated
      if (mounted && ready && authenticated) {
        // Only proceed if we have initialized and either:
        // 1. The wallet is connected but the address doesn't match
        // 2. The wallet is explicitly disconnected
        if (
          hasInitialized.current &&
          ((isConnected && address?.toLowerCase() !== wallet?.toLowerCase()) ||
            !isConnected)
        ) {
          // Clear any existing timeout
          if (logoutTimeoutRef.current) {
            clearTimeout(logoutTimeoutRef.current)
          }

          // Set a new timeout
          logoutTimeoutRef.current = setTimeout(async () => {
            // Double-check all conditions before logging out
            if (
              (isConnected &&
                address?.toLowerCase() !== wallet?.toLowerCase()) ||
              !isConnected
            ) {
              await logout()
              disconnect()
            }
          }, 1500) // 1500ms delay
        }
      }
    }

    // Mark as initialized after the first render where we're ready and authenticated
    if (!hasInitialized.current && ready && authenticated) {
      hasInitialized.current = true
    }

    handleLogout()

    return () => {
      mounted = false
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
      }
    }
  }, [
    address,
    wallet,
    submit,
    logout,
    disconnect,
    isConnected,
    ready,
    authenticated,
  ])

  return null
}
