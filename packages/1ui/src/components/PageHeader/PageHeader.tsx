import * as React from 'react'

import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  lastUpdated?: string
}

export function PageHeader({
  title,
  subtitle,
  lastUpdated,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <div className="flex items-center justify-between">
        <Text variant={TextVariant.heading4}>{title}</Text>
        {lastUpdated && (
          <Text variant={TextVariant.body} className="text-primary/70">
            Last Updated {lastUpdated} ago
          </Text>
        )}
      </div>
      {subtitle && <p className="text-sm text-primary/70">{subtitle}</p>}
    </div>
  )
}
