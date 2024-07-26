import { useReducer, type Reducer } from 'react'

import {
  IDENTITY_TRANSACTION_ACTIONS,
  IDENTITY_TRANSACTION_STATUS,
  TRANSACTION_ACTIONS,
  TRANSACTION_STATUS,
} from 'consts/transaction'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
  TransactionActionType,
  TransactionStateType,
} from 'types'

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
    case TRANSACTION_ACTIONS.START_TRANSACTION:
      return { ...state, status: TRANSACTION_STATUS.IDLE }

    case TRANSACTION_ACTIONS.APPROVE_TRANSACTION:
      return { ...state, status: TRANSACTION_STATUS.APPROVE_TRANSACTION }
    case TRANSACTION_ACTIONS.REVIEW_TRANSACTION:
      return { ...state, status: TRANSACTION_STATUS.REVIEW_TRANSACTION }
    case TRANSACTION_ACTIONS.CONFIRM_TRANSACTION:
      return { ...state, status: TRANSACTION_STATUS.CONFIRM }
    case TRANSACTION_ACTIONS.TRANSACTION_PENDING:
      return { ...state, status: TRANSACTION_STATUS.TRANSACTION_PENDING }
    case TRANSACTION_ACTIONS.TRANSACTION_CONFIRMED:
      return { ...state, status: TRANSACTION_STATUS.TRANSACTION_CONFIRMED }
    case TRANSACTION_ACTIONS.TRANSACTION_COMPLETE:
      return {
        ...state,
        status: TRANSACTION_STATUS.COMPLETE,
        txHash: action.txHash,
      }
    case TRANSACTION_ACTIONS.TRANSACTION_HASH:
      return {
        ...state,
        status: TRANSACTION_STATUS.HASH,
        txHash: action.txHash,
      }
    case TRANSACTION_ACTIONS.TRANSACTION_ERROR:
      return { ...state, status: TRANSACTION_STATUS.ERROR, error: action.error }
    default:
      return state
  }
}

export const initialTransactionState: TransactionStateType = {
  status: TRANSACTION_STATUS.IDLE,
  txHash: `0x${1234}...`,
  error: undefined,
}

export const identityTransactionReducer = (
  state: IdentityTransactionStateType,
  action: IdentityTransactionActionType,
): IdentityTransactionStateType => {
  switch (action.type) {
    case IDENTITY_TRANSACTION_ACTIONS.START_TRANSACTION:
      return { ...state, status: IDENTITY_TRANSACTION_STATUS.IDLE }
    case IDENTITY_TRANSACTION_ACTIONS.START_IMAGE_UPLOAD:
      return { ...state, status: IDENTITY_TRANSACTION_STATUS.UPLOADING_IMAGE }
    case IDENTITY_TRANSACTION_ACTIONS.IMAGE_UPLOAD_COMPLETE:
      return {
        ...state,
        status: 'image-upload-complete',
        imageUrl: action.imageUrl,
        displayName: action.displayName,
        description: action.description,
        externalReference: action.externalReference,
      }
    case IDENTITY_TRANSACTION_ACTIONS.PREPARING_IDENTITY:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.PREPARING_IDENTITY,
      }
    case IDENTITY_TRANSACTION_ACTIONS.PUBLISHING_IDENTITY:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.PUBLISHING_IDENTITY,
      }
    case IDENTITY_TRANSACTION_ACTIONS.APPROVE_TRANSACTION:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.APPROVE_TRANSACTION,
      }
    case IDENTITY_TRANSACTION_ACTIONS.CONFIRM_TRANSACTION:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.CONFIRM_TRANSACTION,
      }
    case IDENTITY_TRANSACTION_ACTIONS.TRANSACTION_PENDING:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.TRANSACTION_PENDING,
      }
    case IDENTITY_TRANSACTION_ACTIONS.TRANSACTION_CONFIRMED:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.TRANSACTION_CONFIRMED,
      }
    case IDENTITY_TRANSACTION_ACTIONS.TRANSACTION_COMPLETE:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.COMPLETE,
        txHash: action.txHash,
      }
    case IDENTITY_TRANSACTION_ACTIONS.TRANSACTION_HASH:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.HASH,
        txHash: action.txHash,
      }
    case IDENTITY_TRANSACTION_ACTIONS.TRANSACTION_ERROR:
      return {
        ...state,
        status: IDENTITY_TRANSACTION_STATUS.ERROR,
        error: action.error,
      }
    default:
      return state
  }
}

export const initialIdentityTransactionState: IdentityTransactionStateType = {
  status: IDENTITY_TRANSACTION_STATUS.IDLE,
  txHash: `0x${1234}...`,
  error: undefined,
}
