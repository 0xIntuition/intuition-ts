import * as React from 'react'

import { cn } from '../../styles'

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SegmentedControl = ({ className, ...props }: SegmentedControlProps) => {
  return (
    <div
      role="tablist"
      className={cn(
        'rounded-full border p-px border-solid border-border/30 primary-gradient-subtle',
        className,
      )}
      {...props}
    />
  )
}

export interface SegmentedControlItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  isActive: boolean
}

const SegmentedControlItem = ({
  className,
  isActive,
  ...props
}: SegmentedControlItemProps) => {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={cn(
        'rounded-full border border-solid border-transparent transition-all hover:border-border/30 aria-selected:border-border/30 py-2 px-3 aria-selected:bg-background',
        className,
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
