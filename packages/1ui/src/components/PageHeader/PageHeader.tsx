import * as React from 'react'

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
        <h1 className="text-2xl font-semibold">{title}</h1>
        {lastUpdated && (
          <span className="text-sm text-muted-foreground">
            Last Updated {lastUpdated} ago
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
