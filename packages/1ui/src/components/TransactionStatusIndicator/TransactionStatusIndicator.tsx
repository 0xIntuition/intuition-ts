import * as React from 'react'

import { Loader2Icon } from 'lucide-react'
import { cn } from 'styles'
import { TransactionStatusType, TransactionType } from 'types'

import { Icon, IconName, Text, TextVariant, TextWeight } from '..'
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
      {statusComponentData.iconName === IconName.inProgress ? (
        <Loader2Icon
          className={cn(
            `w-20 h-20 animate-spin`,
            statusComponentData.iconClass,
          )}
        />
      ) : (
        <Icon
          className={cn('w-20 h-20', statusComponentData.iconClass)}
          name={statusComponentData.iconName}
        />
      )}

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
