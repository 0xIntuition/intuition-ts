import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { toast } from '@0xintuition/1ui'

import type {
  BatchTriplesRequest,
  LogAndVerifyTriplesResponse,
  Triple,
} from '@lib/services/populate'
import { AtomDataTypeKey } from '@lib/utils/atom-data-types'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { Thing, WithContext } from 'schema-dts'
import { useSendTransaction } from 'wagmi'

import { useUserClient } from './useUserWallet'

type State = {
  requestHash: string
  selectedAtoms: WithContext<Thing>[]
  selectedRows: number[]
  tag: WithContext<Thing>
  calls: BatchTriplesRequest[]
  newTriples: Triple[]
  existingTriples: Triple[]
  txHash: string
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
  | { type: 'SET_TAG'; payload: WithContext<Thing> }
  | {
      type: 'SET_CALLS'
      payload: {
        calls: BatchTriplesRequest[]
        newTriples: Triple[]
        existingTriples: Triple[]
      }
    }
  | { type: 'SET_TX_HASH'; payload: string }
  | { type: 'SET_STEP'; payload: State['step'] }
  | { type: 'SET_SELECTED_ROWS'; payload: number[] }
  | { type: 'SET_TX_COMPLETE'; txHash?: string }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'RESET' }
  | { type: 'FORCE_UPDATE' }
  | { type: 'SET_SELECTED_TYPE'; payload: AtomDataTypeKey }
const initialState: State = {
  requestHash: '',
  selectedAtoms: [],
  selectedRows: [],
  tag: {} as WithContext<Thing>,
  calls: [],
  newTriples: [],
  existingTriples: [],
  txHash: '',
  step: 'idle',
  selectedType: 'CSV',
  error: '',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_REQUEST_HASH':
      return { ...state, requestHash: action.payload }
    case 'SET_SELECTED_ATOMS':
      return { ...state, selectedAtoms: action.payload }
    case 'SET_TAG':
      return { ...state, tag: action.payload }
    case 'SET_CALLS':
      return {
        ...state,
        calls: action.payload.calls,
        newTriples: action.payload.newTriples,
        existingTriples: action.payload.existingTriples,
      }
    case 'SET_TX_HASH':
      return { ...state, txHash: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SET_SELECTED_ROWS':
      return { ...state, selectedRows: action.payload }
    case 'SET_ERROR':
      return { ...state, step: 'error', error: action.error }
    case 'SET_TX_COMPLETE':
      return {
        ...state,
        step: 'complete',
        txHash: action.txHash ?? '',
      }
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedType: action.payload }
    case 'RESET':
      return { ...initialState }
    case 'FORCE_UPDATE':
      return { ...state }
    default:
      return state
  }
}

type InitiateTagResponse = {
  success: boolean
  requestHash: string
  selectedRows: number[]
  selectedAtoms: WithContext<Thing>[]
  tag: WithContext<Thing>
  error?: string
}

type PublishTriplesResponse = {
  success: boolean
  calls: BatchTriplesRequest[]
  newTriples: Triple[]
  existingTriples: Triple[]
  error?: string
}

export const BatchCreateTripleContext = createContext<{
  state: typeof initialState
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

export function useBatchCreateTriple() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const initiateFetcher = useFetcher({ key: 'initiate-tag' })
  const publishFetcher = useFetcher({ key: 'publish-triples' })
  const logTxFetcher = useFetcher({ key: 'log-tx-hash-and-verify-triples' })

  const { smartWalletClient, publicClient, address, isSmartWalletUser, ready } =
    useUserClient()

  const { sendTransaction } = useSendTransaction()

  const resetState = useCallback(() => {
    // Reset fetcher states
    initiateFetcher.submit({}, { method: 'get' })
    publishFetcher.submit({}, { method: 'get' })
    logTxFetcher.submit({}, { method: 'get' })

    setIsProcessing(false)
    dispatch({ type: 'RESET' })
    dispatch({ type: 'FORCE_UPDATE' })
  }, [initiateFetcher, publishFetcher, logTxFetcher])

  const handleClose = useCallback(() => {
    if (state.step === 'error' || state.step === 'complete') {
      resetState()
    }
  }, [state.step, resetState])

  const initiateTagRequest = useCallback(
    (
      selectedRows: number[],
      selectedAtoms: WithContext<Thing>[] | string[],
      tag: WithContext<Thing>,
      selectedType: AtomDataTypeKey,
    ) => {
      if (isProcessing) {
        return
      }
      if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
        console.error('Invalid or empty selectedRows')
        return
      }

      setIsProcessing(true)
      dispatch({ type: 'SET_STEP', payload: 'initiating' })
      dispatch({ type: 'SET_TAG', payload: tag })
      dispatch({ type: 'SET_SELECTED_TYPE', payload: selectedType })

      const formData = new FormData()
      formData.append('action', 'initiateBatchTripleRequest')
      formData.append('selectedRows', JSON.stringify(selectedRows))
      formData.append('selectedAtoms', JSON.stringify(selectedAtoms))
      formData.append('tag', JSON.stringify(tag))
      formData.append('selectedType', selectedType)

      initiateFetcher.submit(formData, { method: 'post' })
    },
    [initiateFetcher, isProcessing],
  )

  const publishTriples = useCallback(() => {
    if (!state.requestHash || isProcessing || publishFetcher.state !== 'idle') {
      return
    }
    setIsProcessing(true)

    const formData = new FormData()
    formData.append('action', 'publishTriples')
    formData.append('requestHash', state.requestHash)
    formData.append('selectedAtoms', JSON.stringify(state.selectedAtoms))
    formData.append('tag', JSON.stringify(state.tag))
    formData.append('selectedType', state.selectedType)

    publishFetcher.submit(formData, { method: 'post' })
  }, [
    publishFetcher,
    state.requestHash,
    state.selectedAtoms,
    state.tag,
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
        logger('[start] smart wallet sending batch tx')
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
        logger('[start] non-smart wallet triple tx calls', state.calls)

        const confirmedHashes: `0x${string}`[] = []

        for (const tx of state.calls) {
          await new Promise<void>((resolve, reject) => {
            sendTransaction(
              {
                to: tx.to as `0x${string}`,
                data: tx.data as `0x${string}`,
                value: BigInt(tx.value),
              },
              {
                onSuccess: async (hash) => {
                  try {
                    const receipt =
                      await publicClient?.waitForTransactionReceipt({ hash })
                    confirmedHashes.push(receipt?.transactionHash ?? hash)
                    logger(
                      `Transaction confirmed: ${receipt?.transactionHash ?? hash}`,
                    )
                    resolve()
                  } catch (confirmError) {
                    console.error('Error confirming transaction:', confirmError)
                    reject(confirmError)
                  }
                },
                onError: (error) => {
                  console.error('Error sending transaction:', error)
                  reject(error)
                },
              },
            )
          })
        }
        // Use the last transaction hash as the overall txHash
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
    formData.append('action', 'logTxHashAndVerifyTriples')
    formData.append('txHash', state.txHash)
    formData.append('requestHash', state.requestHash)
    formData.append('newTriples', JSON.stringify(state.newTriples))
    formData.append('existingTriples', JSON.stringify(state.existingTriples))
    formData.append(
      'msgSender',
      isSmartWalletUser ? smartWalletClient?.account.address : address,
    )

    logTxFetcher.submit(formData, { method: 'post' })
  }, [
    logTxFetcher,
    state.txHash,
    state.requestHash,
    state.newTriples,
    state.existingTriples,
    isSmartWalletUser,
    smartWalletClient,
    address,
    isProcessing,
  ])

  useEffect(() => {
    if (
      initiateFetcher.state === 'idle' &&
      initiateFetcher.data &&
      state.step === 'initiating'
    ) {
      const data = initiateFetcher.data as InitiateTagResponse

      if (data.success) {
        dispatch({ type: 'SET_REQUEST_HASH', payload: data.requestHash })
        dispatch({ type: 'SET_SELECTED_ATOMS', payload: data.selectedAtoms })
        dispatch({ type: 'SET_TAG', payload: data.tag })
        dispatch({ type: 'SET_STEP', payload: 'publishing' })
      } else {
        console.error('Failed to initiate tag request:', data.error)
        toast.error('Failed to initiate tag request. Please try again.', {
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
      const data = publishFetcher.data as PublishTriplesResponse
      if (data.success && data.calls) {
        dispatch({
          type: 'SET_CALLS',
          payload: {
            calls: data.calls,
            newTriples: data.newTriples || [],
            existingTriples: data.existingTriples || [],
          },
        })
        dispatch({ type: 'SET_STEP', payload: 'sending' })
      } else {
        console.error('Failed to publish triples:', data.error)
        toast.error('Failed to publish triples. Please try again.', {
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
      const data = logTxFetcher.data as LogAndVerifyTriplesResponse & {
        success: boolean
        error?: string
      }

      if (data.success) {
        toast.success('Triple(s) created successfully', {
          duration: 5000,
        })
      } else {
        console.error('Failed to create triple(s):', data.error)
        toast.error('Failed to create triple(s). Please try again.', {
          duration: 5000,
        })
      }
      // Reset state in either case
      resetState()
    }
  }, [logTxFetcher.state, logTxFetcher.data, state.step, resetState])

  // Effect to handle async operations based on state
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
              publishTriples()
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
    publishTriples,
    sendBatchTx,
    logTxHash,
    isProcessing,
    publishFetcher.state,
    publishFetcher.data,
  ])

  return {
    ...state,
    resetState,
    handleClose,
    initiateTagRequest,
    publishTriples,
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
