import * as React from 'react'

import { cn } from 'styles'
import { TransactionStatusType, TransactionType } from 'types'

import { Icon, Text, TextVariant, TextWeight } from '..'
import { getStatusComponentData } from './TransactionStatusIndicator.utils'

export interface TransactionStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: TransactionStatusType
  type: TransactionType
}

const TransactionStatusIndicator = ({
  status,
  type,
  className,
  ...props
}: TransactionStatusProps) => {
  const statusComponentData = getStatusComponentData(status, type)
  return (
    <div
      className={cn(
        'flex flex-col gap-2 justify-center items-center',
        className,
      )}
      {...props}
    >
      <Icon
        className={cn('w-20 h-20', statusComponentData.iconClass)}
        name={statusComponentData.iconName}
      />
      <Text
        variant={TextVariant.headline}
        weight={TextWeight.medium}
        className="text-foreground"
      >
        {statusComponentData.label}
      </Text>
    </div>
  )
}

export { TransactionStatusIndicator }
