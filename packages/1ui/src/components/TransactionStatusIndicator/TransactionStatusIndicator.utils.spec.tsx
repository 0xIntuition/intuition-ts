import { IconName } from 'components/Icon'
import {
  Transaction,
  TransactionStatus,
  TransactionStatusType,
  TransactionType,
} from 'types'

import {
  getErrorLabel,
  getInProgressLabel,
  getStatusComponentData,
  getSuccessLabel,
} from './TransactionStatusIndicator.utils'

describe('TransactionStatusIndicator Utils', () => {
  describe('getInProgressLabel', () => {
    it('should return `Preparing identity...`', () => {
      expect(getInProgressLabel(TransactionStatus.preparingIdentity)).toEqual(
        'Preparing identity...',
      )
    })
    it('should return `Publishing identity...`', () => {
      expect(getInProgressLabel(TransactionStatus.publishingIdentity)).toEqual(
        'Publishing identity...',
      )
    })
    it('should return `Approving transaction...`', () => {
      expect(getInProgressLabel(TransactionStatus.approveTransaction)).toEqual(
        'Approving transaction...',
      )
    })
    it('should return `Transaction pending...`', () => {
      expect(getInProgressLabel(TransactionStatus.transactionPending)).toEqual(
        'Transaction pending...',
      )
    })
    it('should return `Confirming transaction...`', () => {
      expect(getInProgressLabel(TransactionStatus.confirm)).toEqual(
        'Confirming transaction...',
      )
    })
    it('should return `In progress`', () => {
      expect(getInProgressLabel('default' as TransactionStatusType)).toEqual(
        'In progress',
      )
    })
  })
  describe('getSuccessLabel', () => {
    it('should return `Successfully deposited`', () => {
      expect(getSuccessLabel(Transaction.deposit)).toEqual(
        'Successfully deposited',
      )
    })
    it('should return `Successfully redeemed`', () => {
      expect(getSuccessLabel(Transaction.redeem)).toEqual(
        'Successfully redeemed',
      )
    })
    it('should return `Successfully followed`', () => {
      expect(getSuccessLabel(Transaction.follow)).toEqual(
        'Successfully followed',
      )
    })
    it('should return `Successfully unfollowed`', () => {
      expect(getSuccessLabel(Transaction.unfollow)).toEqual(
        'Successfully unfollowed',
      )
    })
    it('should return `Tags added successfully`', () => {
      expect(getSuccessLabel(Transaction.tag)).toEqual(
        'Tags added successfully',
      )
    })
    it('should return `Claim created successfully`', () => {
      expect(getSuccessLabel(Transaction.claim)).toEqual(
        'Claim created successfully',
      )
    })
    it('should return `Identity created successfully`', () => {
      expect(getSuccessLabel(Transaction.identity)).toEqual(
        'Identity created successfully',
      )
    })
    it('should return `Successful`', () => {
      expect(getSuccessLabel('default' as TransactionType)).toEqual(
        'Successful',
      )
    })
  })
  describe('getErrorLabel', () => {
    it('should return `Failed to deposit`', () => {
      expect(getErrorLabel(Transaction.deposit)).toEqual('Failed to deposit')
    })
    it('should return `Failed to redeem`', () => {
      expect(getErrorLabel(Transaction.redeem)).toEqual('Failed to redeem')
    })
    it('should return `Failed to follow`', () => {
      expect(getErrorLabel(Transaction.follow)).toEqual('Failed to follow')
    })
    it('should return `Failed to unfollowed`', () => {
      expect(getErrorLabel(Transaction.unfollow)).toEqual(
        'Failed to unfollowed',
      )
    })
    it('should return `Failed to add tags`', () => {
      expect(getErrorLabel(Transaction.tag)).toEqual('Failed to add tags')
    })
    it('should return `Failed to create claim`', () => {
      expect(getErrorLabel(Transaction.claim)).toEqual('Failed to create claim')
    })
    it('should return `Failed to create identity`', () => {
      expect(getErrorLabel(Transaction.identity)).toEqual(
        'Failed to create identity',
      )
    })
    it('should return `An error occurred`', () => {
      expect(getErrorLabel('default' as TransactionType)).toEqual(
        'An error occurred',
      )
    })
  })
  describe('getStatusComponentData', () => {
    it('should return appropriate object values when given `in-progress`', () => {
      expect(
        getStatusComponentData(
          TransactionStatus.inProgress,
          Transaction.identity,
        ),
      ).toEqual({
        iconName: IconName.inProgress,
        iconClass: 'text-accent',
        label: `In progress`,
      })
    })
    it('should return appropriate object values when given `Preparing identity...`', () => {
      expect(
        getStatusComponentData(
          TransactionStatus.preparingIdentity,
          Transaction.identity,
        ),
      ).toEqual({
        iconName: IconName.inProgress,
        iconClass: 'text-accent',
        label: `Preparing identity...`,
      })
    })
    it('should return appropriate object values when given `complete`', () => {
      expect(
        getStatusComponentData(
          TransactionStatus.complete,
          Transaction.identity,
        ),
      ).toEqual({
        iconName: IconName.circleCheck,
        iconClass: 'text-success',
        label: `Identity created successfully`,
      })
    })
    it('should return appropriate object values when given `error`', () => {
      expect(
        getStatusComponentData(TransactionStatus.error, Transaction.identity),
      ).toEqual({
        iconName: IconName.triangleExclamation,
        iconClass: 'text-destructive',
        label: `Failed to create identity`,
      })
    })
    it('should return appropriate object values when given `awaiting`', () => {
      expect(
        getStatusComponentData(
          TransactionStatus.awaiting,
          Transaction.identity,
        ),
      ).toEqual({
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        label: `Awaiting`,
      })
    })
  })
})
