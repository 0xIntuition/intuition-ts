import * as React from 'react'

import {
  ButtonProps,
  buttonVariants,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  TextProps,
} from '..'
import { cn } from '../../styles'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-2 h-max', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('flex h-8', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  // eslint-disable-next-line
  <a
    aria-current={isActive ? 'page' : undefined}
    aria-selected={isActive}
    className={cn(
      buttonVariants({
        variant: 'ghost',
        size,
      }),
      'min-w-8 flex justify-center',
      props.disabled &&
        'bg-transparent text-muted-foreground border-muted pointer-events-none',
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={className}
    {...props}
  >
    <Icon name="chevron-double-left" className="h-5 w-5" />
  </PaginationLink>
)
PaginationFirst.displayName = 'PaginationFirst'

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to last page" className={className} {...props}>
    <Icon name="chevron-double-right" className="h-5 w-5" />
  </PaginationLink>
)
PaginationLast.displayName = 'PaginationLast'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={className}
    {...props}
  >
    <Icon name="chevron-left-small" className="h-5 w-5" />
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" className={className} {...props}>
    <Icon name="chevron-right-small" className="h-5 w-5" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex w-6 h-5 items-center justify-center', className)}
    {...props}
  >
    <Text variant="bodyLarge">...</Text>
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

const PaginationPageCounter = ({
  currentPage,
  totalPages,
  className,
  ...props
}: React.ComponentProps<TextProps>) => (
  <Text
    variant="caption"
    className={cn('self-center px-4', className)}
    {...props}
  >{`Page ${currentPage} of ${totalPages}`}</Text>
)
PaginationPageCounter.displayName = 'PaginationPageCounter'

const PaginationRowSelection = ({
  className,
  ...props
}: React.ComponentProps<'select'>) => (
  <div
    className={cn(
      'self-center px-4 flex gap-4 justify-center items-center',
      className,
    )}
  >
    <Text variant="caption">Rows per page</Text>
    <Select {...props}>
      <SelectTrigger className="w-max h-8 gap-2">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent side="top">
        <SelectItem value={10}>10</SelectItem>
        <SelectItem value={20}>20</SelectItem>
        <SelectItem value={30}>30</SelectItem>
        <SelectItem value={40}>40</SelectItem>
        <SelectItem value={50}>50</SelectItem>
      </SelectContent>
    </Select>
  </div>
)
PaginationRowSelection.displayName = 'PaginationRowSelection'

const PaginationSummary = ({
  totalEntries,
  label,
  className,
  ...props
}: React.ComponentProps<TextProps>) => (
  <Text
    variant="caption"
    className={cn('self-center', className)}
    {...props}
  >{`${totalEntries} ${label} found`}</Text>
)
PaginationSummary.displayName = 'PaginationSummary'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationPageCounter,
  PaginationRowSelection,
  PaginationSummary,
}
