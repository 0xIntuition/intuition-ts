import { useEffect } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useSubmit } from '@remix-run/react'
import { useAccount, useDisconnect } from 'wagmi'

export default function PrivyLogout({ wallet }: { wallet: string }) {
  const { address, isConnected } = useAccount()
  const submit = useSubmit()
  const { logout, ready } = usePrivy()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    let mounted = true
    const handleLogout = async () => {
      if (mounted && address && address !== wallet && isConnected && ready) {
        await logout()
        disconnect()
        submit(null, {
          action: '/actions/logout',
          method: 'post',
        })
      }
    }
    handleLogout()
    return () => {
      mounted = false
    }
  }, [address, wallet, submit, logout, disconnect, isConnected, ready])

  return null
}
