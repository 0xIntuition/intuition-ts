import * as React from 'react'

import { cn } from 'styles'
import { TransactionStatus, TransactionStatusType } from 'types'

import { Icon, IconName, Text, TextVariant } from '..'

const getStatusComponentData = (status: TransactionStatusType) => {
  switch (status) {
    case TransactionStatus.inProgress:
    case TransactionStatus.preparingIdentity:
    case TransactionStatus.publishingIdentity:
    case TransactionStatus.approveTransaction:
    case TransactionStatus.transactionPending:
    case TransactionStatus.confirm: {
      return {
        iconName: IconName.inProgress,
        iconClassName: 'text-accent',
        label: 'Submitting transaction',
      }
    }
    case TransactionStatus.complete: {
      return {
        iconName: IconName.circleCheck,
        iconClassName: 'text-success',
        label: 'Transaction complete',
      }
    }
    default:
      return {
        iconName: IconName.wallet2,
        iconClassName: 'text-warning',
        label: 'Awaiting wallet approval',
      }
  }
}

export interface TransactionStatusCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: TransactionStatusType
}

const TransactionStatusCard = ({
  status,
  ...props
}: TransactionStatusCardProps) => {
  const rootIconClassName = 'h-4 w-4'
  const statusComponentData = getStatusComponentData(status)
  return (
    <div
      className="flex items-center gap-2 bg-primary/5 rounded-md border border-border/5 p-3"
      {...props}
    >
      <Icon
        className={cn(statusComponentData.iconClassName, rootIconClassName)}
        name={statusComponentData.iconName}
      />
      <Text variant={TextVariant.body}>{statusComponentData.label}</Text>
      {status === TransactionStatus.awaiting && (
        <Icon
          name={IconName.circleQuestionMark}
          className={cn('text-primary/20', rootIconClassName)}
        />
      )}
    </div>
  )
}

export { TransactionStatusCard }
