import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, IconNameType, Text, TextVariant, TextWeight } from '..'

interface TransactionStatusIconProps {
  name: IconNameType
  className?: string
}

const TransactionStatusIcon = ({
  className,
  ...props
}: TransactionStatusIconProps) => (
  <Icon className={cn('w-20 h-20', className)} {...props} />
)

interface TransactionStatusLabelProps {
  value: string
}

const TransactionStatusLabel = ({ value }: TransactionStatusLabelProps) => (
  <Text
    variant={TextVariant.headline}
    weight={TextWeight.medium}
    className="text-foreground"
  >
    {value}
  </Text>
)

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

const determineInProgressLabel = (status: TransactionStatusType) => {
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
  switch (status) {
    case TransactionStatus.inProgress:
    case TransactionStatus.preparingIdentity:
    case TransactionStatus.publishingIdentity:
    case TransactionStatus.approveTransaction:
    case TransactionStatus.transactionPending:
    case TransactionStatus.confirm:
      return (
        <div {...extendedProps}>
          <TransactionStatusIcon
            name={IconName.inProgress}
            className="text-accent"
          />
          <TransactionStatusLabel value={determineInProgressLabel(status)} />
        </div>
      )
    case TransactionStatus.complete:
      return (
        <div {...extendedProps}>
          <TransactionStatusIcon
            name={IconName.circleCheck}
            className="text-success"
          />
          <TransactionStatusLabel value="Identity created successfully" />
        </div>
      )
    case TransactionStatus.error:
      return (
        <div {...extendedProps}>
          <TransactionStatusIcon
            name={IconName.triangleExclamation}
            className="text-destructive"
          />
          <TransactionStatusLabel value="Failed to create identity" />
        </div>
      )
    default:
      return (
        <div {...extendedProps}>
          <TransactionStatusIcon
            name={IconName.awaitAction}
            className="text-warning"
          />
          <TransactionStatusLabel value="Awaiting" />
        </div>
      )
  }
}

export { TransactionStatusIndicator }
