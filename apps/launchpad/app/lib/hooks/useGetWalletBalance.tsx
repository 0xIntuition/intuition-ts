import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { formatUnits } from 'viem'
import { useBalance, useBlockNumber } from 'wagmi'

export function useGetWalletBalance(wallet: `0x${string}`, enabled = true) {
  const queryClient = useQueryClient()

  // Only watch blocks if this instance is enabled
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: {
      enabled,
    },
  })

  const { data: balance, queryKey } = useBalance({
    address: wallet,
    query: {
      enabled,
    },
  })

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  // Log when we're fetching balance
  useEffect(() => {
    if (balance && enabled) {
      console.log(
        `[Wallet] Balance fetched for ${wallet.slice(0, 6)}...: ${walletBalance} ETH`,
      )
    }
  }, [balance, wallet, walletBalance, enabled])

  // Invalidate queries every 5 blocks
  useEffect(() => {
    if (blockNumber && enabled && blockNumber % 5n === 0n) {
      console.log(
        `[Wallet] Refreshing balance at block ${blockNumber.toString()}`,
      )
      queryClient.invalidateQueries({ queryKey })
    }
  }, [blockNumber, queryClient, queryKey, enabled])

  return walletBalance
}
