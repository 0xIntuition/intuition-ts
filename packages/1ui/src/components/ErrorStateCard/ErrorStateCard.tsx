import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, Text } from '..'

export interface ErrorStateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  className?: string
}

const ErrorStateCard = ({
  message = 'An error occured',
  children,
  className,
}: ErrorStateCardProps) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-center items-center p-6 theme-border border-destructive/50 rounded-lg min-h-52 w-full gap-4`,
        className,
      )}
    >
      <Icon
        name={IconName.triangleExclamation}
        className="w-12 h-12 text-destructive"
      />
      <Text variant="caption" className="text-muted-foreground">
        {message}
      </Text>
      {children}
    </div>
  )
}

export { ErrorStateCard }
