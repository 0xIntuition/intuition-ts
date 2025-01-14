import { useReducer, type Reducer } from 'react'

import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

export function useGenericTxState<S, A>(
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
