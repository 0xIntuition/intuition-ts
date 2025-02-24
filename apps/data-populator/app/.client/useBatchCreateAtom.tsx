import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { toast } from '@0xintuition/1ui'

import type { BatchAtomsRequest, PinDataResult } from '@lib/services/populate'
import { AtomDataTypeKey } from '@lib/utils/atom-data-types'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { LogTxActionData } from '@routes/app+'
import { Thing, WithContext } from 'schema-dts'
import { useSendTransaction } from 'wagmi'

import { useUserClient } from './useUserWallet'

type State = {
  requestHash: string
  selectedAtoms: WithContext<Thing>[]
  selectedRows: number[]
  csvData: string[][]
  calls: BatchAtomsRequest[]
  existingCIDs: string[]
  newCIDs: string[]
  filteredData: PinDataResult[]
  txHash: string
  setNewAtoms: WithContext<Thing>[]
  selectedType: AtomDataTypeKey
  error?: string
  step:
    | 'idle'
    | 'initiating'
    | 'publishing'
    | 'sending'
    | 'logging'
    | 'complete'
    | 'error'
}

type Action =
  | { type: 'SET_REQUEST_HASH'; payload: string }
  | { type: 'SET_SELECTED_ATOMS'; payload: WithContext<Thing>[] }
  | {
      type: 'SET_CALLS'
      payload: {
        calls: BatchAtomsRequest[]
        newCIDs: string[]
        existingCIDs: string[]
        filteredData: PinDataResult[]
      }
    }
  | { type: 'SET_TX_HASH'; payload: string }
  | { type: 'SET_STEP'; payload: State['step'] }
  | { type: 'SET_SELECTED_ROWS'; payload: number[] }
  | { type: 'SET_CSV_DATA'; payload: string[][] }
  | {
      type: 'SET_TX_COMPLETE'
      txHash?: string
    }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'RESET' }
  | { type: 'FORCE_UPDATE' }
  | { type: 'SET_SELECTED_TYPE'; payload: AtomDataTypeKey }

const initialState: State = {
  requestHash: '',
  selectedAtoms: [],
  selectedRows: [],
  csvData: [],
  calls: [],
  txHash: '',
  step: 'idle',
  setNewAtoms: [],
  error: '',
  newCIDs: [],
  existingCIDs: [],
  filteredData: [],
  selectedType: 'CSV',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_REQUEST_HASH':
      return { ...state, requestHash: action.payload }
    case 'SET_SELECTED_ATOMS':
      return { ...state, selectedAtoms: action.payload }
    case 'SET_CALLS':
      return {
        ...state,
        calls: action.payload.calls,
        newCIDs: action.payload.newCIDs,
        existingCIDs: action.payload.existingCIDs,
        filteredData: action.payload.filteredData,
      }
    case 'SET_TX_HASH':
      return { ...state, txHash: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SET_SELECTED_ROWS':
      return { ...state, selectedRows: action.payload }
    case 'SET_CSV_DATA':
      return { ...state, csvData: action.payload }
    case 'SET_ERROR':
      return { ...state, step: 'error', error: action.error }
    case 'SET_TX_COMPLETE':
      return {
        ...state,
        step: 'complete',
        txHash: action.txHash ?? '',
      }
    case 'RESET':
      return { ...initialState }
    case 'FORCE_UPDATE':
      return { ...state }
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedType: action.payload }
    default:
      return state
  }
}

type InitiateActionResponse = {
  success: boolean
  requestHash: string
  selectedRows: number[]
  selectedAtoms: WithContext<Thing>[]
  csvData: string[][]
  selectedType: AtomDataTypeKey
  error?: string
}

type PublishAtomsResponse = {
  success: boolean
  calls: BatchAtomsRequest[]
  newCIDs: string[]
  existingCIDs: string[]
  filteredData: PinDataResult[]
  error?: string
}

export const BatchCreateContext = createContext<{
  state: typeof initialState
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

export function useBatchCreateAtom(onSuccess?: () => void) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const initiateFetcher = useFetcher({ key: 'initiate-batch' })
  const publishFetcher = useFetcher({ key: 'publish-atoms' })
  const logTxFetcher = useFetcher({ key: 'log-tx-hash-and-verify-atoms' })

  const { smartWalletClient, publicClient, address, isSmartWalletUser, ready } =
    useUserClient()

  const { sendTransaction } = useSendTransaction()

  const initiateBatchRequest = useCallback(
    (
      selectedRows: number[],
      csvData: string[][],
      selectedType: AtomDataTypeKey,
    ) => {
      if (isProcessing) {
        return
      }
      if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
        console.error('Invalid or empty selectedRows')
        return
      }
      if (!Array.isArray(csvData) || csvData.length === 0) {
        console.error('Invalid or empty csvData')
        return
      }

      setIsProcessing(true)
      dispatch({ type: 'SET_STEP', payload: 'initiating' })

      const formData = new FormData()
      formData.append('action', 'initiateBatchAtomRequest')
      formData.append('selectedRows', JSON.stringify(selectedRows))
      formData.append('csvData', JSON.stringify(csvData))
      formData.append('selectedType', selectedType)

      initiateFetcher.submit(formData, { method: 'post' })
    },
    [initiateFetcher, isProcessing],
  )

  const publishAtoms = useCallback(() => {
    if (!state.requestHash || isProcessing || publishFetcher.state !== 'idle') {
      return
    }

    setIsProcessing(true)

    const formData = new FormData()
    formData.append('action', 'publishAtoms')
    formData.append('requestHash', state.requestHash)
    formData.append('selectedAtoms', JSON.stringify(state.selectedAtoms))
    formData.append('selectedType', state.selectedType)

    publishFetcher.submit(formData, { method: 'post' })
  }, [
    publishFetcher,
    state.requestHash,
    state.selectedAtoms,
    state.selectedType,
    isProcessing,
  ])

  const sendBatchTx = useCallback(async () => {
    dispatch({ type: 'SET_STEP', payload: 'sending' })
    setIsProcessing(true)

    if (!ready) {
      console.error('No active client or address found')
      return
    }

    try {
      let txHash
      if (isSmartWalletUser) {
        // Bundling isn't working anymore for some reason - something weird is going on with Privy
        logger('[start] smart wallet sending batch tx')
        console.log('account: ', smartWalletClient.account)
        console.log(
          'calls mapped: ',
          state.calls.map((call) => ({
            to: call.to as `0x${string}`,
            data: call.data as `0x${string}`,
            value: BigInt(call.value),
          })),
        )
        txHash = await smartWalletClient.sendTransaction({
          account: smartWalletClient.account,
          calls: state.calls.map((call) => ({
            to: call.to as `0x${string}`,
            data: call.data as `0x${string}`,
            value: BigInt(call.value),
          })),
        })
        logger('[end] smart wallet batch txHash', txHash)
      } else {
        logger('isSmartWalletUser', isSmartWalletUser)
        logger('[start] non-smart wallet atom tx calls', state.calls)

        const confirmedHashes: `0x${string}`[] = []

        // Process transactions sequentially with proper async/await
        for (const tx of state.calls) {
          const hash = await new Promise<`0x${string}`>((resolve, reject) => {
            console.log('sending transaction: ', tx)
            sendTransaction(
              {
                to: tx.to as `0x${string}`,
                data: tx.data as `0x${string}`,
                value: BigInt(tx.value),
              },
              {
                onSuccess: async (hash) => {
                  console.log('transaction sent: ', hash)
                  try {
                    const receipt =
                      await publicClient?.waitForTransactionReceipt({ hash })
                    confirmedHashes.push(receipt?.transactionHash ?? hash)
                    logger(
                      `Transaction confirmed: ${receipt?.transactionHash ?? hash}`,
                    )
                    resolve(receipt?.transactionHash ?? hash)
                  } catch (confirmError) {
                    console.error('Error confirming transaction:', confirmError)
                    reject(confirmError)
                  }
                },
                onError: reject,
              },
            )
          })
          logger(`Transaction confirmed: ${hash}`)
        }
        // Use the last transaction hash as the overall txHash
        console.log('confirmedHashes: ', confirmedHashes)
        console.log('confirmedHashes length: ', confirmedHashes.length)
        console.log(
          'confirmedHashes last: ',
          confirmedHashes[confirmedHashes.length - 1],
        )
        txHash = confirmedHashes[confirmedHashes.length - 1]
      }

      dispatch({ type: 'SET_TX_HASH', payload: txHash })
      dispatch({ type: 'SET_STEP', payload: 'logging' })
      logger('txHash', txHash)
      return txHash
    } catch (error) {
      console.error('Error sending batch transaction:', error)
      dispatch({ type: 'SET_STEP', payload: 'idle' })

      const errorMessage =
        error instanceof Error ? error.message : String(error)
      logger('error', { message: errorMessage, context: 'sendBatchTx' })

      dispatch({
        type: 'SET_ERROR',
        error: errorMessage,
      })
      dispatch({ type: 'SET_STEP', payload: 'error' })
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }, [
    smartWalletClient,
    publicClient,
    isSmartWalletUser,
    state.calls,
    sendTransaction,
    ready,
  ])

  const logTxHash = useCallback(() => {
    if (!state.txHash || !state.requestHash || isProcessing) {
      return
    }

    setIsProcessing(true)
    dispatch({ type: 'SET_STEP', payload: 'logging' })

    const formData = new FormData()
    formData.append('action', 'logTxHashAndVerifyAtoms')
    formData.append('txHash', state.txHash)
    formData.append('requestHash', state.requestHash)
    formData.append('filteredCIDs', JSON.stringify(state.newCIDs))
    formData.append('filteredData', JSON.stringify(state.filteredData))
    formData.append(
      'msgSender',
      isSmartWalletUser ? smartWalletClient?.account.address : address,
    )
    formData.append('oldAtomCIDs', JSON.stringify(state.existingCIDs))

    logTxFetcher.submit(formData, { method: 'post' })
  }, [
    logTxFetcher,
    state.txHash,
    state.requestHash,
    state.newCIDs,
    state.filteredData,
    state.existingCIDs,
    isSmartWalletUser,
    smartWalletClient,
    address,
    isProcessing,
  ])

  const resetState = useCallback(() => {
    // Reset fetcher states
    initiateFetcher.submit({}, { method: 'get' })
    publishFetcher.submit({}, { method: 'get' })
    logTxFetcher.submit({}, { method: 'get' })

    setIsProcessing(false)

    // Force context update
    dispatch({ type: 'RESET' })

    // Force rerender of context consumers
    dispatch({ type: 'FORCE_UPDATE' })
  }, [initiateFetcher, publishFetcher, logTxFetcher])

  const handleClose = useCallback(() => {
    if (state.step === 'error' || state.step === 'complete') {
      resetState()
    }
  }, [state.step, resetState])

  useEffect(() => {
    if (
      initiateFetcher.state === 'idle' &&
      initiateFetcher.data &&
      state.step === 'initiating'
    ) {
      const data = initiateFetcher.data as InitiateActionResponse
      if (data.success && data.requestHash) {
        dispatch({ type: 'SET_REQUEST_HASH', payload: data.requestHash })
        dispatch({ type: 'SET_SELECTED_ATOMS', payload: data.selectedAtoms })
        dispatch({ type: 'SET_SELECTED_ROWS', payload: data.selectedRows })
        dispatch({ type: 'SET_CSV_DATA', payload: data.csvData })
        dispatch({ type: 'SET_SELECTED_TYPE', payload: data.selectedType })
        dispatch({ type: 'SET_STEP', payload: 'publishing' })
      } else {
        console.error('Failed to initiate batch request:', data.error)
        toast.error('Failed to initiate batch request. Please try again.', {
          duration: 5000,
        })
        dispatch({ type: 'SET_STEP', payload: 'idle' })
      }
      setIsProcessing(false)
    }
  }, [initiateFetcher.state, initiateFetcher.data, state.step])

  useEffect(() => {
    if (
      publishFetcher.state === 'idle' &&
      publishFetcher.data &&
      state.step === 'publishing'
    ) {
      const data = publishFetcher.data as PublishAtomsResponse
      if (data.success && data.calls) {
        dispatch({
          type: 'SET_CALLS',
          payload: {
            calls: data.calls,
            newCIDs: data.newCIDs || [],
            existingCIDs: data.existingCIDs || [],
            filteredData: data.filteredData || [],
          },
        })
        dispatch({ type: 'SET_STEP', payload: 'sending' })
      } else {
        console.error('Failed to publish atoms:', data.error)
        toast.error('Failed to publish atoms. Please try again.', {
          duration: 5000,
        })
        dispatch({ type: 'SET_STEP', payload: 'idle' })
      }
      setIsProcessing(false)
    }
  }, [publishFetcher.state, publishFetcher.data, state.step])

  useEffect(() => {
    if (state.step === 'sending' && state.txHash) {
      dispatch({ type: 'SET_STEP', payload: 'logging' })
      setIsProcessing(false)
    }
  }, [state.step, state.txHash])

  useEffect(() => {
    if (
      logTxFetcher.state === 'idle' &&
      logTxFetcher.data &&
      state.step === 'logging'
    ) {
      const data = logTxFetcher.data as LogTxActionData

      if (data.success) {
        toast.success('Atom(s) created successfully', {
          duration: 5000,
        })
        onSuccess?.()
      } else {
        console.error('Failed to create atom(s):', data.error)
        toast.error('Failed to create atom(s). Please try again.', {
          duration: 5000,
        })
      }
      // Reset state in either case
      resetState()
    }
  }, [logTxFetcher.state, logTxFetcher.data, state.step, resetState, onSuccess])

  useEffect(() => {
    const handleAsyncOperations = async () => {
      if (isProcessing) {
        return
      }

      try {
        switch (state.step) {
          case 'sending':
            if (state.calls.length > 0) {
              await sendBatchTx()
            }
            break

          case 'logging':
            if (state.txHash) {
              logTxHash()
            }
            break

          case 'publishing':
            if (
              state.requestHash &&
              !publishFetcher.data &&
              publishFetcher.state === 'idle'
            ) {
              publishAtoms()
            }
            break
        }
      } catch (error) {
        console.error('Error in async operations:', error)
        dispatch({
          type: 'SET_ERROR',
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    handleAsyncOperations()
  }, [
    state.step,
    state.requestHash,
    state.calls,
    state.txHash,
    publishAtoms,
    sendBatchTx,
    logTxHash,
    isProcessing,
    publishFetcher.state,
    publishFetcher.data,
  ])

  const setSelectedType = useCallback((type: AtomDataTypeKey) => {
    dispatch({ type: 'SET_SELECTED_TYPE', payload: type })
  }, [])

  return {
    ...state,
    setSelectedType,
    resetState,
    handleClose,
    initiateBatchRequest,
    publishAtoms,
    sendBatchTx,
    logTxHash,
    isLoading:
      state.step !== 'idle' &&
      state.step !== 'complete' &&
      state.step !== 'error',
    isInitiating: state.step === 'initiating',
    isPublishing: state.step === 'publishing',
    isSending: state.step === 'sending',
    isLoggingTx: state.step === 'logging',
    isComplete: state.step === 'complete',
    isError: state.step === 'error',
  }
}
