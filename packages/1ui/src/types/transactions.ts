export const TransactionStatus = {
  idle: 'idle',
  awaiting: 'awaiting',
  inProgress: 'in-progress',
  preparingIdentity: 'preparing-identity',
  publishingIdentity: 'publishing-identity',
  approveTransaction: 'approve-transaction',
  reviewTransaction: 'review-transaction',
  transactionHash: 'hash',
  transactionPending: 'transaction-pending',
  transactionConfirmed: 'transaction-confirmed',
  confirm: 'confirm',
  complete: 'complete',
  error: 'error',
  uploadingImage: 'uploading-image',
  imageUploadComplete: 'image-upload-complete',
} as const

export type TransactionStatusType =
  (typeof TransactionStatus)[keyof typeof TransactionStatus]

export const Transaction = {
  identity: 'identity',
  claim: 'claim',
  deposit: 'deposit',
  redeem: 'redeem',
  tag: 'tag',
  follow: 'follow',
  unfollow: 'unfollow',
}

export type TransactionType = (typeof Transaction)[keyof typeof Transaction]
