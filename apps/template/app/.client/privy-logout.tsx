import { useEffect, useRef } from 'react'

import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useSubmit } from '@remix-run/react'
import { useAccount, useDisconnect } from 'wagmi'

export default function PrivyLogout({ wallet }: { wallet: string }) {
  const { address, isConnected } = useAccount()
  const submit = useSubmit()
  const { logout, ready } = usePrivy()
  const { disconnect } = useDisconnect()
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    logger('PrivyLogout use effect', address, wallet, isConnected)
    let mounted = true
    const handleLogout = async () => {
      if (mounted && ready) {
        if (!address || address !== wallet || !isConnected) {
          // Clear any existing timeout
          if (logoutTimeoutRef.current) {
            clearTimeout(logoutTimeoutRef.current)
          }

          // Set a new timeout
          logoutTimeoutRef.current = setTimeout(async () => {
            // Double-check the conditions before logging out
            if (!address || address !== wallet || !isConnected) {
              await logout()
              disconnect()
              submit(null, {
                action: '/actions/logout',
                method: 'post',
              })
            }
          }, 1500) // 1500ms delay
        }
      }
    }

    handleLogout()

    return () => {
      mounted = false
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
      }
    }
  }, [address, wallet, submit, logout, disconnect, isConnected, ready])

  return null
}
