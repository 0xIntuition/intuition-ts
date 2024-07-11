export const TransactionStatus = {
  awaiting: 'awaiting',
  inProgress: 'in-progress',
  preparingIdentity: 'preparing-identity',
  publishingIdentity: 'publishing-identity',
  approveTransaction: 'approve-transaction',
  transactionPending: 'transaction-pending',
  confirm: 'confirm',
  complete: 'complete',
  error: 'error',
} as const

export type TransactionStatusType =
  (typeof TransactionStatus)[keyof typeof TransactionStatus]

export const QuestStatus = {
  notStarted: 'not-started',
  inProgress: 'in-progress',
  claimable: 'claimable',
  completed: 'completed',
} as const

export type QuestStatusType = (typeof QuestStatus)[keyof typeof QuestStatus]
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
