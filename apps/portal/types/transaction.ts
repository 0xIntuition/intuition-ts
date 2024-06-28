import { TransactionReceipt } from 'viem'

export type TStatus = string

export type BaseTransactionStateType<TStatus> = {
  status: TStatus
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

export type IdentityTransactionStatusType =
  | 'idle'
  | 'preparing-identity'
  | 'publishing-identity'
  | 'approve-transaction'
  | 'transaction-pending'
  | 'confirm-transaction'
  | 'transaction-confirmed'
  | 'complete'
  | 'hash'
  | 'error'

export type IdentityTransactionActionType =
  | { type: 'START_TRANSACTION' }
  | { type: 'PREPARING_IDENTITY' }
  | { type: 'PUBLISHING_IDENTITY' }
  | { type: 'APPROVE_TRANSACTION' }
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

export type TransactionStateType =
  BaseTransactionStateType<TransactionStatusType>
export type IdentityTransactionStateType =
  BaseTransactionStateType<IdentityTransactionStatusType>
