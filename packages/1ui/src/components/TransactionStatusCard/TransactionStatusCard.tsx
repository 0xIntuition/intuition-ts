import * as React from 'react'

import { Icon, IconName, Text, TextVariant } from '..'

export interface TransactionStatusCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TransactionStatusCard = ({ ...props }: TransactionStatusCardProps) => {
  return (
    <div
      className="flex items-center gap-2 bg-primary/5 rounded-md border border-border/5 p-3"
      {...props}
    >
      <Icon className="h-4 w-4" name={IconName.circleCheck} />
      <Text variant={TextVariant.body}>Test</Text>
    </div>
  )
}

export { TransactionStatusCard }
