import { useReducer, type Reducer } from 'react'

import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

/**
 * This hook takes in a reducer and an initial state and returns the state and dispatch function. It's a generic hook that can be used for any reducer and initial state.
 * Without any additional configuration, it uses the default state and reducer in this file, but these can be overridden by passing in a custom reducer and initial state when needed.
 */

export function useTransactionState<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}

export const transactionReducer = (
  state: TransactionStateType,
  action: TransactionActionType,
): TransactionStateType => {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }

    case 'APPROVE_TRANSACTION':
      return { ...state, status: 'awaiting' }
    case 'REVIEW_TRANSACTION':
      return { ...state, status: 'review-transaction' }
    case 'CONFIRM_TRANSACTION':
      return { ...state, status: 'confirm' }
    case 'TRANSACTION_PENDING':
      return { ...state, status: 'transaction-pending' }
    case 'TRANSACTION_CONFIRMED':
      return { ...state, status: 'transaction-confirmed' }
    case 'TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'complete',
        txHash: action.txHash,
      }
    case 'TRANSACTION_HASH':
      return { ...state, status: 'hash', txHash: action.txHash }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'error', error: action.error }
    default:
      return state
  }
}

export const initialTransactionState: TransactionStateType = {
  status: 'idle',
  txHash: `0x${1234}...`,
  error: undefined,
}

export const identityTransactionReducer = (
  state: IdentityTransactionStateType,
  action: IdentityTransactionActionType,
): IdentityTransactionStateType => {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'START_IMAGE_UPLOAD':
      return { ...state, status: 'uploading-image' }
    case 'IMAGE_UPLOAD_COMPLETE':
      return {
        ...state,
        status: 'image-upload-complete',
        imageUrl: action.imageUrl,
        displayName: action.displayName,
        description: action.description,
        externalReference: action.externalReference,
      }
    case 'REVIEW_TRANSACTION':
      return { ...state, status: 'review-transaction' }
    case 'PREPARING_IDENTITY':
      return { ...state, status: 'preparing-identity' }
    case 'PUBLISHING_IDENTITY':
      return { ...state, status: 'publishing-identity' }
    case 'APPROVE_TRANSACTION':
      return { ...state, status: 'approve-transaction' }
    case 'CONFIRM_TRANSACTION':
      return { ...state, status: 'confirm' }
    case 'TRANSACTION_PENDING':
      return { ...state, status: 'transaction-pending' }
    case 'TRANSACTION_CONFIRMED':
      return { ...state, status: 'transaction-confirmed' }
    case 'TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'complete',
        txHash: action.txHash,
      }
    case 'TRANSACTION_HASH':
      return { ...state, status: 'hash', txHash: action.txHash }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'error', error: action.error }
    default:
      return state
  }
}

export const initialIdentityTransactionState: IdentityTransactionStateType = {
  status: 'idle',
  txHash: `0x${1234}...`,
  error: undefined,
}
