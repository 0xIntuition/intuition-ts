import {
  Transaction,
  TransactionStatus,
  TransactionStatusType,
  TransactionType,
} from 'types'

import { IconName } from '..'

export const getInProgressLabel = (status: TransactionStatusType) => {
  switch (status) {
    case TransactionStatus.preparingIdentity:
      return 'Preparing identity...'
    case TransactionStatus.publishingIdentity:
      return 'Publishing identity...'
    case TransactionStatus.approveTransaction:
      return 'Approving transaction...'
    case TransactionStatus.transactionPending:
      return 'Transaction pending...'
    case TransactionStatus.confirm:
      return 'Confirming transaction...'
    default:
      return 'In progress'
  }
}

export const getSuccessLabel = (type: TransactionType) => {
  switch (type) {
    case Transaction.deposit:
      return 'Successfully deposited'
    case Transaction.redeem:
      return 'Successfully redeemed'
    case Transaction.follow:
      return 'Successfully followed'
    case Transaction.unfollow:
      return 'Successfully unfollowed'
    case Transaction.tag:
      return 'Tags added successfully'
    case Transaction.claim:
      return 'Claim created successfully'
    case Transaction.identity:
      return 'Identity created successfully'
    case Transaction.list:
      return 'Identities added to list successfully'
    case Transaction.save:
      return 'Saved to list successfully'
    case Transaction.unsave:
      return 'Unsaved from list successfully'
    default:
      return 'Successful'
  }
}

export const getErrorLabel = (type: TransactionType) => {
  switch (type) {
    case Transaction.deposit:
      return 'Failed to deposit'
    case Transaction.redeem:
      return 'Failed to redeem'
    case Transaction.follow:
      return 'Failed to follow'
    case Transaction.unfollow:
      return 'Failed to unfollowed'
    case Transaction.tag:
      return 'Failed to add tags'
    case Transaction.claim:
      return 'Failed to create claim'
    case Transaction.identity:
      return 'Failed to create identity'
    case Transaction.list:
      return 'Failed to add identities to list'
    case Transaction.save:
      return 'Failed to save list'
    case Transaction.unsave:
      return 'Failed to unsave list'
    default:
      return 'An error occurred'
  }
}

export const getStatusComponentData = (
  status: TransactionStatusType,
  type: TransactionType,
) => {
  switch (status) {
    case TransactionStatus.inProgress:
    case TransactionStatus.preparingIdentity:
    case TransactionStatus.publishingIdentity:
      return {
        iconName: IconName.inProgress,
        iconClass: 'text-accent animate-spin',
        label: getInProgressLabel(status),
      }
    case TransactionStatus.approveTransaction:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        label: getInProgressLabel(status),
      }
    case TransactionStatus.transactionPending:
    case TransactionStatus.confirm:
      return {
        iconName: IconName.inProgress,
        iconClass: 'text-accent animate-spin',
        label: getInProgressLabel(status),
      }
    case TransactionStatus.complete:
      return {
        iconName: IconName.circleCheck,
        iconClass: 'text-success',
        label: getSuccessLabel(type),
      }
    case TransactionStatus.error:
      return {
        iconName: IconName.triangleExclamation,
        iconClass: 'text-destructive',
        label: getErrorLabel(type),
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        label: 'Awaiting',
      }
  }
}
