import { useEffect } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'

export function WalletSync() {
  const { address } = useAccount()
  const { user, logout } = usePrivy()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (!user?.wallet?.address || !address) {
      return
    }

    // If wallet addresses don't match, disconnect both
    if (user.wallet.address.toLowerCase() !== address.toLowerCase()) {
      console.log('WalletSync: Wallet address mismatch, disconnecting', {
        privyWallet: user.wallet.address.toLowerCase(),
        connectedWallet: address.toLowerCase(),
      })

      // Handle disconnects sequentially to avoid multiple toasts
      const handleDisconnect = async () => {
        try {
          // Disconnect wallet first (usually faster)
          await disconnect()
          // Then handle Privy logout which might show a toast
          await logout()
        } catch (error) {
          console.error('WalletSync: Error during disconnect:', error)
        }
      }

      handleDisconnect()
    }
  }, [address, user?.wallet?.address, logout, disconnect])

  return null
}
