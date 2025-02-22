import { useCallback, useEffect, useState } from 'react'

import logger from '@lib/utils/logger'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import type { Abi, Address, Hash, TransactionReceipt } from 'viem'
import {
  createPublicClient,
  custom,
  encodeFunctionData,
  publicActions,
} from 'viem'

interface UsePrivyContractConfig {
  address: Address
  abi: Abi
  functionName: string
}

interface UsePrivyContractReturn {
  write: (args?: unknown[]) => Promise<Hash | undefined>
  isLoading: boolean
  error: Error | null
  receipt: TransactionReceipt | null
  reset: () => void
}

export function usePrivyContract(
  config: UsePrivyContractConfig,
): UsePrivyContractReturn {
  const { ready } = usePrivy()
  const { wallets } = useWallets()
  const activeWallet = wallets[0]
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null)

  // Reset state when config changes
  useEffect(() => {
    setError(null)
    setReceipt(null)
  }, [config.address, config.functionName])

  const write = useCallback(
    async (args?: unknown[]) => {
      if (!activeWallet || !ready) {
        logger('Cannot write: wallet not ready', {
          hasWallet: !!activeWallet,
          ready,
        })
        return
      }

      setIsLoading(true)
      setError(null)
      setReceipt(null)

      try {
        logger('Sending transaction:', {
          address: config.address,
          functionName: config.functionName,
          args,
        })

        // Create transaction request
        const txRequest = {
          to: config.address,
          data: args
            ? encodeAbiParameters(config.abi, config.functionName, args)
            : '0x',
        }

        // Get provider
        const provider = await activeWallet.getEthereumProvider()

        // Send transaction
        const hash = (await provider.request({
          method: 'eth_sendTransaction',
          params: [txRequest],
        })) as Hash

        logger('Transaction sent:', hash)

        // Create a public client to watch the transaction
        const client = createPublicClient({
          transport: custom(provider),
        }).extend(publicActions)

        // Wait for transaction receipt
        const receipt = await client.waitForTransactionReceipt({ hash })
        setReceipt(receipt)
        return hash
      } catch (err) {
        console.error('Transaction failed:', err)
        setError(err instanceof Error ? err : new Error('Transaction failed'))
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [activeWallet, ready, config],
  )

  const reset = useCallback(() => {
    setError(null)
    setReceipt(null)
    setIsLoading(false)
  }, [])

  return {
    write,
    isLoading,
    error,
    receipt,
    reset,
  }
}

// Helper function to encode ABI parameters
function encodeAbiParameters(
  abi: Abi,
  functionName: string,
  args: unknown[],
): `0x${string}` {
  const functionAbi = abi.find(
    (item) => item.type === 'function' && item.name === functionName,
  )
  if (!functionAbi || functionAbi.type !== 'function') {
    throw new Error(`Function ${functionName} not found in ABI`)
  }

  // Use viem to encode function data
  const encodedData = encodeFunctionData({
    abi: [functionAbi],
    functionName,
    args,
  }) as `0x${string}`

  return encodedData
}
