export const TransactionStatus = {
  idle: 'idle',
  uploadingImage: 'uploading-image',
  imageUploadComplete: 'image-upload-complete',
  awaiting: 'awaiting',
  inProgress: 'in-progress',
  preparingIdentity: 'preparing-identity',
  publishingIdentity: 'publishing-identity',
  initialDeposit: 'initial-deposit',
  reviewTransaction: 'review-transaction',
  approveTransaction: 'approve-transaction',
  transactionHash: 'hash',
  transactionPending: 'transaction-pending',
  transactionConfirmed: 'transaction-confirmed',
  confirm: 'confirm',
  complete: 'complete',
  error: 'error',
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
  list: 'list',
  save: 'save',
  unsave: 'unsave',
}

export type TransactionType = (typeof Transaction)[keyof typeof Transaction]
