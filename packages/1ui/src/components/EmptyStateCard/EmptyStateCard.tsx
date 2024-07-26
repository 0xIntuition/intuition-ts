import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, Text } from '..'

export interface EmptyStateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

const EmptyStateCard = ({
  message = 'No data available',
  children,
  className,
}: EmptyStateCardProps) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-center items-center p-6 theme-border rounded-lg min-h-64 w-full gap-2`,
        className,
      )}
    >
      <Icon name={IconName.inboxEmpty} className="w-12 h-12" />
      <Text variant="body" className="text-muted-foreground">
        {message}
      </Text>
      {children}
    </div>
  )
}

export { EmptyStateCard }
