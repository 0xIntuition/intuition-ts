import * as React from 'react'

import { cn } from '../../styles'

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLUListElement> {}

const SegmentedControl = ({ className, ...props }: SegmentedControlProps) => {
  return (
    <ul
      role="tablist"
      className={cn(
        'rounded-full flex items-center gap-1 border p-px border-border/20 primary-gradient-subtle',
        className,
      )}
      {...props}
    />
  )
}

export interface SegmentedControlItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

const SegmentedControlItem = ({
  className,
  isActive,
  ...props
}: SegmentedControlItemProps) => {
  return (
    <li>
      <button
        role="tab"
        aria-selected={isActive}
        className={cn(
          'rounded-full border border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-1 px-3 aria-selected:bg-background text-base',
          className,
        )}
        {...props}
      />
    </li>
  )
}

export { SegmentedControl, SegmentedControlItem }
