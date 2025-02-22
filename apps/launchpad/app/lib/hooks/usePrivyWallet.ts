import { useEffect, useRef } from 'react'

import { toast } from '@0xintuition/1ui'

import { usePrivy, useWallets } from '@privy-io/react-auth'

interface EthereumProvider {
  request: <T = unknown>(args: {
    method: string
    params?: unknown[]
  }) => Promise<T>
}

export interface PrivyWallet {
  address: string
  chainId: string
  isConnected: boolean
  isReady: boolean
  getEthereumProvider: () => Promise<EthereumProvider>
}

export function usePrivyWallet(): PrivyWallet | null {
  const { ready, logout } = usePrivy()
  const { wallets } = useWallets()
  const activeWallet = wallets[0]
  const previousAddressRef = useRef<string | null>(null)

  // Check for wallet changes
  useEffect(() => {
    if (!ready || !activeWallet) {
      previousAddressRef.current = null
      return
    }

    const checkWalletState = async () => {
      try {
        const provider = await activeWallet.getEthereumProvider()
        const accounts = (await provider.request({
          method: 'eth_accounts',
        })) as string[]

        const currentAddress = activeWallet.address.toLowerCase()
        const realAddress = accounts[0]?.toLowerCase()

        if (realAddress && realAddress !== currentAddress) {
          console.warn('Wallet mismatch:', {
            realAddress,
            privyAddress: currentAddress,
          })
          await logout()
          toast.error('Wallet mismatch detected, please reconnect')
        }
      } catch (error) {
        console.error('Error checking wallet state:', error)
      }
    }

    // Check immediately and when component updates
    checkWalletState()
  }, [ready, activeWallet, logout])

  if (!activeWallet) {
    return null
  }

  return {
    address: activeWallet.address,
    chainId: activeWallet.chainId,
    isConnected: true,
    isReady: ready,
    getEthereumProvider: async () => {
      const provider = await activeWallet.getEthereumProvider()
      return {
        request: provider.request.bind(provider),
      }
    },
  }
}
