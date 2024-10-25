import { useMemo } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'
import { PublicClient, WalletClient } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

export const useUserClient = (): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  smartWalletClient: any | undefined // TODO: Fix once privy exports SmartAccountClientType
  walletClient: WalletClient | undefined
  publicClient: PublicClient | undefined
  address: `0x${string}` | undefined
  isSmartWalletUser: boolean
  ready: boolean
} => {
  const { client: smartWalletClient } = useSmartWallets()
  const { address: accountAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { user } = usePrivy()

  // 1. Add check if user has a smart wallet
  const isSmartWalletUser = useMemo(() => {
    return (
      user?.linkedAccounts.some((account) => account.type === 'smart_wallet') ??
      false // fallback to default wallet provider
    )
  }, [user])

  // 2. Track address of smart wallet if user has a smart wallet, otherwise track account address
  const address = useMemo(() => {
    return isSmartWalletUser
      ? (smartWalletClient?.account.address as `0x${string}`)
      : accountAddress
  }, [isSmartWalletUser, smartWalletClient, accountAddress])

  const ready = useMemo(() => {
    return isSmartWalletUser
      ? !!publicClient && !!smartWalletClient && !!accountAddress
      : !!publicClient && !!walletClient && !!accountAddress
  }, [
    publicClient,
    walletClient,
    smartWalletClient,
    accountAddress,
    isSmartWalletUser,
  ])

  return {
    smartWalletClient,
    walletClient,
    publicClient,
    address,
    isSmartWalletUser,
    ready,
  }
}
