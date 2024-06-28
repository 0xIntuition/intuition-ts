import { TransactionReceipt } from 'viem'

export type TransactionStateType = {
  status: TransactionStatusType
  txHash?: `0x${string}`
  error?: string
}

export type TransactionStatusType =
  | 'idle'
  | 'approve'
  | 'review'
  | 'confirm'
  | 'pending'
  | 'confirmed'
  | 'complete'
  | 'hash'
  | 'error'

export type TransactionActionType =
  | { type: 'START_TRANSACTION' }
  | { type: 'APPROVE_TRANSACTION' }
  | { type: 'REVIEW_TRANSACTION' }
  | { type: 'CONFIRM_TRANSACTION' }
  | { type: 'TRANSACTION_PENDING' }
  | { type: 'TRANSACTION_CONFIRMED' }
  | {
      type: 'TRANSACTION_COMPLETE'
      txHash?: `0x${string}`
      txReceipt: TransactionReceipt
    }
  | { type: 'TRANSACTION_HASH'; txHash?: `0x${string}` }
  | { type: 'TRANSACTION_ERROR'; error: string }

export const transactionReducer = (
  state: TransactionStateType,
  action: TransactionActionType,
): TransactionStateType => {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'APPROVE_TRANSACTION':
      return { ...state, status: 'approve' }
    case 'REVIEW_TRANSACTION':
      return { ...state, status: 'review' }
    case 'CONFIRM_TRANSACTION':
      return { ...state, status: 'confirm' }
    case 'TRANSACTION_PENDING':
      return { ...state, status: 'pending' }
    case 'TRANSACTION_CONFIRMED':
      return { ...state, status: 'confirmed' }
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
