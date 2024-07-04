import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, Text, TextVariant, TextWeight } from '..'

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

const getInProgressLabel = (status: TransactionStatusType) => {
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

const getStatusComponentData = (status: TransactionStatusType) => {
  switch (status) {
    case TransactionStatus.inProgress:
    case TransactionStatus.preparingIdentity:
    case TransactionStatus.publishingIdentity:
    case TransactionStatus.approveTransaction:
    case TransactionStatus.transactionPending:
    case TransactionStatus.confirm:
      return {
        iconName: IconName.inProgress,
        iconClass: 'text-accent',
        label: getInProgressLabel(status),
      }
    case TransactionStatus.complete:
      return {
        iconName: IconName.circleCheck,
        iconClass: 'text-success',
        label: 'Identity created successfully',
      }
    case TransactionStatus.error:
      return {
        iconName: IconName.triangleExclamation,
        iconClass: 'text-destructive',
        label: 'Failed to create identity',
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        label: 'Awaiting',
      }
  }
}

export interface TransactionStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: TransactionStatusType
}

const TransactionStatusIndicator = ({
  status,
  className,
  ...props
}: TransactionStatusProps) => {
  const extendedProps = {
    className: cn('flex flex-col gap-2 justify-center items-center', className),
    ...props,
  }
  const statusComponentData = getStatusComponentData(status)
  return (
    <div {...extendedProps}>
      <Icon
        className={cn('w-20 h-20', statusComponentData.iconClass)}
        name={statusComponentData.iconName}
      />
      <Text variant={TextVariant.headline} weight={TextWeight.medium}>
        {statusComponentData.label}
      </Text>
    </div>
  )
}

export { TransactionStatusIndicator }
