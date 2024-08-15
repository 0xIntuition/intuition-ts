import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { formatUnits } from 'viem'
import { useBalance, useBlockNumber } from 'wagmi'

export function useGetWalletBalance(wallet: `0x${string}`) {
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: wallet,
  })

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n) {
      queryClient.invalidateQueries({ queryKey })
    }
  }, [blockNumber, queryClient, queryKey])

  return walletBalance
}
