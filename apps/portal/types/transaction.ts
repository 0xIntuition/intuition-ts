import { TransactionStatusType } from '@0xintuition/1ui'

import {
  IDENTITY_TRANSACTION_ACTIONS,
  IdentityTransactionStatusType,
  TRANSACTION_ACTIONS,
} from 'consts/transaction'
import { TransactionReceipt } from 'viem'

export type TStatus = string

export type BaseTransactionStateType<TStatus> = {
  status: TStatus
  txHash?: `0x${string}`
  imageUrl?: string
  displayName?: string
  description?: string
  externalReference?: string
  error?: string
  identityId?: string
}

export type TransactionActionType =
  | { type: typeof TRANSACTION_ACTIONS.START_TRANSACTION }
  | { type: typeof TRANSACTION_ACTIONS.APPROVE_TRANSACTION }
  | { type: typeof TRANSACTION_ACTIONS.REVIEW_TRANSACTION }
  | { type: typeof TRANSACTION_ACTIONS.CONFIRM_TRANSACTION }
  | { type: typeof TRANSACTION_ACTIONS.TRANSACTION_PENDING }
  | { type: typeof TRANSACTION_ACTIONS.TRANSACTION_CONFIRMED }
  | {
      type: typeof TRANSACTION_ACTIONS.TRANSACTION_COMPLETE
      txHash?: `0x${string}`
      txReceipt: TransactionReceipt
    }
  | {
      type: typeof TRANSACTION_ACTIONS.TRANSACTION_HASH
      txHash?: `0x${string}`
    }
  | { type: typeof TRANSACTION_ACTIONS.TRANSACTION_ERROR; error: string }

export type IdentityTransactionActionType =
  | TransactionActionType
  | { type: typeof IDENTITY_TRANSACTION_ACTIONS.START_IMAGE_UPLOAD }
  | {
      type: typeof IDENTITY_TRANSACTION_ACTIONS.IMAGE_UPLOAD_COMPLETE
      imageUrl: string
      displayName: string
      description: string
      externalReference: string
    }
  | { type: typeof IDENTITY_TRANSACTION_ACTIONS.PREPARING_IDENTITY }
  | { type: typeof IDENTITY_TRANSACTION_ACTIONS.PUBLISHING_IDENTITY }

export type TransactionStateType =
  BaseTransactionStateType<TransactionStatusType>
export type IdentityTransactionStateType =
  BaseTransactionStateType<IdentityTransactionStatusType>

export const TransactionSuccessAction = {
  VIEW: 'view',
  CLOSE: 'close',
} as const

export type TransactionSuccessActionType =
  (typeof TransactionSuccessAction)[keyof typeof TransactionSuccessAction]
