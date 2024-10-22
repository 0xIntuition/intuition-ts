import { useCallback, useEffect, useReducer, useState } from 'react'

import { toast } from '@0xintuition/1ui'

import type { BatchAtomsRequest, PinDataResult } from '@lib/services/populate'
import logger from '@lib/utils/logger'
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'
import { useFetcher } from '@remix-run/react'
import {
  InitiateActionData,
  LogTxActionData,
  PublishActionData,
} from '@routes/app+'
import { Thing, WithContext } from 'schema-dts'

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
    default:
      return state
  }
}

export function useBatchCreateAtom() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const initiateFetcher = useFetcher({ key: 'initiate-batch' })
  const publishFetcher = useFetcher({ key: 'publish-atoms' })
  const logTxFetcher = useFetcher({ key: 'log-tx-hash-and-verify-atoms' })

  const { client } = useSmartWallets()

  const initiateBatchRequest = useCallback(
    (selectedRows: number[], csvData: string[][]) => {
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
      console.log('Initiating batch request')
      console.log('Selected Rows:', selectedRows)
      console.log('CSV Data:', csvData)
      setIsProcessing(true)
      dispatch({ type: 'SET_STEP', payload: 'initiating' })
      initiateFetcher.submit(
        {
          action: 'initiateBatchAtomRequest',
          selectedRows: JSON.stringify(selectedRows),
          csvData: JSON.stringify(csvData),
        },
        { method: 'post' },
      )
    },
    [initiateFetcher, isProcessing],
  )

  const publishAtoms = useCallback(() => {
    if (!state.requestHash || isProcessing) {
      return
    }
    console.log('Publishing atoms')

    console.log('msgSender', client?.account)

    setIsProcessing(true)
    publishFetcher.submit(
      {
        action: 'publishAtoms',
        requestHash: state.requestHash,
        selectedAtoms: JSON.stringify(state.selectedAtoms),
      },
      { method: 'post' },
    )
  }, [publishFetcher, state.requestHash, state.calls])

  const sendBatchTx = useCallback(async () => {
    if (!client || !state.calls.length || isProcessing) {
      return
    }
    console.log('Sending batch transaction')
    dispatch({ type: 'SET_STEP', payload: 'sending' })
    setIsProcessing(true)

    try {
      const hash = await client.sendTransaction({
        account: client.account,
        calls: state.calls.map((call) => ({
          to: call.to as `0x${string}`,
          data: call.data as `0x${string}`,
          value: BigInt(call.value),
        })),
      })
      dispatch({ type: 'SET_TX_HASH', payload: hash })
      dispatch({ type: 'SET_STEP', payload: 'logging' })
      logger('txHash', hash)
      return hash
    } catch (error) {
      console.error('Error sending batch transaction:', error)
      dispatch({ type: 'SET_STEP', payload: 'idle' })

      const errorMessage =
        error instanceof Error ? error.message : String(error)
      logger('error', { message: errorMessage, context: 'sendBatchTx' })

      dispatch({
        type: 'SET_ERROR',
        error: error instanceof Error ? error.message : String(error),
      })
      dispatch({ type: 'SET_STEP', payload: 'error' })
    } finally {
      setIsProcessing(false)
    }
  }, [client, state.calls, isProcessing])

  const logTxHash = useCallback(() => {
    if (!state.txHash || !state.requestHash || isProcessing) {
      return
    }
    console.log('Logging transaction hash')

    setIsProcessing(true)
    dispatch({ type: 'SET_STEP', payload: 'logging' })
    logTxFetcher.submit(
      {
        action: 'logTxHashAndVerifyAtoms',
        txHash: state.txHash,
        requestHash: state.requestHash,
        filteredCIDs: JSON.stringify(state.newCIDs),
        filteredData: JSON.stringify(state.filteredData),
        msgSender: client?.account.address as `0x${string}`,
        oldAtomCIDs: JSON.stringify(state.existingCIDs),
      },
      { method: 'post' },
    )
  }, [logTxFetcher, state.txHash, state.requestHash])

  useEffect(() => {
    if (
      initiateFetcher.state === 'idle' &&
      initiateFetcher.data &&
      state.step === 'initiating'
    ) {
      const data = initiateFetcher.data as InitiateActionData
      console.log('Initiate fetcher data received:', data)
      if (data.success && data.requestHash) {
        console.log('Initiate fetcher data received:', data)
        dispatch({ type: 'SET_REQUEST_HASH', payload: data.requestHash })
        dispatch({ type: 'SET_SELECTED_ATOMS', payload: data.selectedAtoms })
        dispatch({ type: 'SET_SELECTED_ROWS', payload: data.selectedRows })
        dispatch({ type: 'SET_CSV_DATA', payload: data.csvData })
        dispatch({ type: 'SET_STEP', payload: 'publishing' })
        setIsProcessing(false)
      } else {
        dispatch({ type: 'SET_STEP', payload: 'idle' })
        setIsProcessing(false)
      }
    }
  }, [initiateFetcher.state, initiateFetcher.data, state.step])

  useEffect(() => {
    if (
      publishFetcher.state === 'idle' &&
      publishFetcher.data &&
      state.step === 'publishing'
    ) {
      const data = publishFetcher.data as PublishActionData
      console.log('Publish fetcher data received:', data)
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
        // in this payload we have the atoms
        dispatch({ type: 'SET_STEP', payload: 'sending' })
        setIsProcessing(false)
      } else {
        dispatch({ type: 'SET_STEP', payload: 'idle' })
        setIsProcessing(false)
      }
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
      console.log('Log TX fetcher data received:', logTxFetcher.data)

      // Check if the operation was successful
      const data = logTxFetcher.data as LogTxActionData

      if (data.success) {
        console.log('logTxFetcher success')

        dispatch({ type: 'SET_STEP', payload: 'complete' })
        toast.success('Atom(s) created successfully', {
          duration: 5000,
        })
        // reset to initial state
        dispatch({
          type: 'SET_CALLS',
          payload: {
            calls: [],
            newCIDs: [],
            existingCIDs: [],
            filteredData: [],
          },
        })
      } else {
        // Handle the case where the operation was not successful
        console.error('Failed to create atom(s):', data.error)
        toast.error('Failed to create atom(s). Please try again.', {
          duration: 5000,
        })
        dispatch({ type: 'SET_STEP', payload: 'idle' })
      }

      setIsProcessing(false)
    }
  }, [logTxFetcher.state, logTxFetcher.data, state.step])

  useEffect(() => {
    const handleAsyncOperations = async () => {
      if (isProcessing) {
        return
      }

      console.log('state.step', state.step)
      console.log('state.calls', state.calls)
      console.log('state.filteredData', state.filteredData)

      if (state.step === 'sending' && state.calls.length > 0) {
        try {
          await sendBatchTx()
        } catch (error) {
          console.error('Error in sendBatchTx:', error)
          // Handle error appropriately
        }
      } else if (state.step === 'logging' && state.txHash) {
        logTxHash()
      } else if (state.step === 'publishing' && state.requestHash) {
        publishAtoms()
      }
    }

    handleAsyncOperations()
  }, [
    state.step,
    state.requestHash,
    state.calls,
    state.filteredData,
    state.txHash,
    publishAtoms,
    sendBatchTx,
    logTxHash,
    isProcessing,
  ])

  return {
    ...state,
    initiateBatchRequest,
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
