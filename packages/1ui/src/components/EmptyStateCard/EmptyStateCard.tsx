import * as React from 'react'

import { Icon, IconName, Text } from '..'

export interface EmptyStateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

const EmptyStateCard = ({
  message = 'No data available',
  children,
}: EmptyStateCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-6 theme-border rounded-lg min-h-52">
      <Icon name={IconName.inboxEmpty} className="w-12 h-12 mb-4" />
      <Text variant="caption" className="text-muted-foreground mb-5">
        {message}
      </Text>
      {children}
    </div>
  )
}

export { EmptyStateCard }
