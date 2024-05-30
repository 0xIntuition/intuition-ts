import { useEffect, useRef } from 'react'

import type { Abi, TransactionReceipt } from 'viem'
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  type UseSimulateContractParameters,
  type UseWriteContractParameters,
} from 'wagmi'

import logger from '../utils/logger'

type Handler = (receipt: TransactionReceipt) => void

export function useSimulatedContractWriteAndWait(
  simulateContractConfig: UseSimulateContractParameters,
) {
  const { data } = useSimulateContract({
    abi: simulateContractConfig.abi as Abi,
    address: simulateContractConfig.address,
    functionName: simulateContractConfig.functionName,
    args: simulateContractConfig.args,
  })
  logger('useSimulateContract return data', data?.request) // unsure if we use this as the config now or not

  const contractWriteConfig: UseSimulateContractParameters = {
    abi: simulateContractConfig.abi as Abi,
    functionName: simulateContractConfig.functionName,
    args: simulateContractConfig.args,
    value: simulateContractConfig.value,
    chainId: simulateContractConfig.chainId,
    address: simulateContractConfig.address,
  }

  return useContractWriteAndWait(contractWriteConfig)
}

export function useContractWriteAndWait(
  contractWriteConfig: UseWriteContractParameters,
) {
  const {
    data,
    isIdle,
    isPending: awaitingWalletConfirmation,
    isError,
    writeContractAsync,
    reset,
  } = useWriteContract(contractWriteConfig)

  const transactionSettledHandler = useRef<Handler>(() => {})

  const {
    data: receipt,
    isLoading: awaitingOnChainConfirmation,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const onReceipt = useRef((handler: Handler) => {
    transactionSettledHandler.current = handler
  })

  useEffect(() => {
    if (receipt) {
      transactionSettledHandler.current(receipt)
    }
  }, [receipt])

  return {
    data,
    isIdle,
    isError,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    receipt,
    writeContractAsync,
    reset,
    isSuccess,
    onReceipt: onReceipt.current,
  }
}
