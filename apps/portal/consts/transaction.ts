export const TRANSACTION_STATUS = {
  IDLE: 'idle',
  AWAITING: 'awaiting',
  REVIEW_TRANSACTION: 'review-transaction',
  CONFIRM: 'confirm',
  TRANSACTION_PENDING: 'transaction-pending',
  TRANSACTION_CONFIRMED: 'transaction-confirmed',
  COMPLETE: 'complete',
  HASH: 'hash',
  ERROR: 'error',
} as const

export const IDENTITY_TRANSACTION_STATUS = {
  ...TRANSACTION_STATUS,
  UPLOADING_IMAGE: 'uploading-image',
  IMAGE_UPLOAD_COMPLETE: 'image-upload-complete',
  PREPARING_IDENTITY: 'preparing-identity',
  PUBLISHING_IDENTITY: 'publishing-identity',
  APPROVE_TRANSACTION: 'approve-transaction',
  CONFIRM_TRANSACTION: 'confirm-transaction',
} as const

export const TRANSACTION_ACTIONS = {
  START_TRANSACTION: 'START_TRANSACTION',
  APPROVE_TRANSACTION: 'APPROVE_TRANSACTION',
  REVIEW_TRANSACTION: 'REVIEW_TRANSACTION',
  CONFIRM_TRANSACTION: 'CONFIRM_TRANSACTION',
  TRANSACTION_PENDING: 'TRANSACTION_PENDING',
  TRANSACTION_CONFIRMED: 'TRANSACTION_CONFIRMED',
  TRANSACTION_COMPLETE: 'TRANSACTION_COMPLETE',
  TRANSACTION_HASH: 'TRANSACTION_HASH',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
} as const

export const IDENTITY_TRANSACTION_ACTIONS = {
  ...TRANSACTION_ACTIONS,
  START_IMAGE_UPLOAD: 'START_IMAGE_UPLOAD',
  IMAGE_UPLOAD_COMPLETE: 'IMAGE_UPLOAD_COMPLETE',
  PREPARING_IDENTITY: 'PREPARING_IDENTITY',
  PUBLISHING_IDENTITY: 'PUBLISHING_IDENTITY',
} as const

export type TransactionStatusType =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS]

export type IdentityTransactionStatusType =
  (typeof IDENTITY_TRANSACTION_STATUS)[keyof typeof IDENTITY_TRANSACTION_STATUS]
