import * as React from 'react'

import { cn, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

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
        <Text
          variant={TextVariant.heading3}
          weight={TextWeight.semibold}
          className="text-3xl sm:text-4xl"
        >
          {title}
        </Text>
        {lastUpdated && (
          <Text variant={TextVariant.body} className="text-primary/70">
            Last Updated {lastUpdated} ago
          </Text>
        )}
      </div>
      {subtitle && (
        <Text
          variant={TextVariant.body}
          weight={TextWeight.medium}
          className="text-primary/70"
        >
          {subtitle}
        </Text>
      )}
    </div>
  )
}
