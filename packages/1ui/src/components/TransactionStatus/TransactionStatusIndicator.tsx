import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, IconNameType, Text, TextVariant, TextWeight } from '..'

const TransactionStatusIcon = ({
  className,
  ...props
}: {
  name: IconNameType
  className?: string
}) => <Icon className={cn('w-20 h-20', className)} {...props} />

const TransactionStatusLabel = ({ value }: { value: string }) => (
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
  success: 'success',
  error: 'error',
} as const

export type TransactionStatusType =
  (typeof TransactionStatus)[keyof typeof TransactionStatus]

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
      return (
        <div {...extendedProps}>
          <TransactionStatusIcon
            name={IconName.inProgress}
            className="text-accent"
          />
          <TransactionStatusLabel value="In Progress" />
        </div>
      )
    case TransactionStatus.success:
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
