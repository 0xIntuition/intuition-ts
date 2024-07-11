import * as React from 'react'

import { cn } from 'styles'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number
  primaryClassName?: string
  secondaryClassName?: string
}

const ProgressBar = ({
  percentage,
  primaryClassName = 'bg-primary',
  secondaryClassName = 'bg-muted',
  ...props
}: ProgressBarProps) => {
  return (
    <div
      className={cn('flex items-center h-[6px] mb-4', props.className)}
      {...props}
    >
      <span
        className={cn('h-full block rounded-l-sm', primaryClassName)}
        style={{ minWidth: `${percentage}%` }}
      />
      <span
        className={cn('h-full w-full block rounded-r-sm', secondaryClassName)}
      />
    </div>
  )
}

export { ProgressBar }
