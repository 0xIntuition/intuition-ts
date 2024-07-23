import { useEffect } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useSubmit } from '@remix-run/react'
import { useAccount, useDisconnect } from 'wagmi'

export default function PrivyLogout({ wallet }: { wallet: string }) {
  const { address } = useAccount()
  const submit = useSubmit()
  const { logout } = usePrivy()
  const { disconnect } = useDisconnect()
  useEffect(() => {
    const handleLogout = async () => {
      if (address !== wallet) {
        await logout()
        disconnect()
        submit(null, {
          action: '/actions/logout',
          method: 'post',
        })
      }
    }
    handleLogout()
  }, [address, wallet, submit, logout, disconnect])

  return <div></div>
}
