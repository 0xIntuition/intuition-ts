import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, Text } from '..'

export interface ErrorStateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  className?: string
}

const ErrorStateCard = ({
  message = 'No error occured.',
  children,
  className,
}: ErrorStateCardProps) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-center items-center p-6 theme-border border-destructive/50 rounded-lg min-h-52`,
        className,
      )}
    >
      <Icon
        name={IconName.triangleExclamation}
        className="w-12 h-12 mb-4 text-destructive"
      />
      <Text variant="caption" className="text-muted-foreground mb-5">
        {message}
      </Text>
      {children}
    </div>
  )
}

export { ErrorStateCard }
