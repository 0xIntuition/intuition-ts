import * as React from 'react'

import { Link } from '@remix-run/react'

import { cn } from '../../styles'

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLUListElement> {}

const SegmentedControl = ({ className, ...props }: SegmentedControlProps) => {
  return (
    <ul
      role="tablist"
      className={cn(
        'rounded-full flex border border-border/30 primary-gradient-subtle items-center',
        className,
      )}
      {...props}
    />
  )
}

export interface SegmentedControlItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  to?: string
  href?: string
}

const SegmentedControlItem = ({
  className,
  isActive,
  to,
  href,
  children,
  ...props
}: SegmentedControlItemProps) => {
  const commonProps = {
    role: 'tab',
    'aria-selected': isActive,
    className: cn(
      'rounded-full border border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-2 px-3 aria-selected:bg-background',
      className,
    ),
    ...props,
  }

  return (
    <li>
      {to ? (
        <Link to={to} prefetch="intent" {...commonProps}>
          {children}
        </Link>
      ) : (
        <a href={href} {...commonProps}>
          {children}
        </a>
      )}
    </li>
  )
}

export { SegmentedControl, SegmentedControlItem }
