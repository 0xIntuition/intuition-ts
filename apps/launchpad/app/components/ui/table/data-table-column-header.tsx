import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@0xintuition/1ui'

import { Column } from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  PinIcon,
} from 'lucide-react'

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string | React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  children,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={ButtonVariant.text}
            size={ButtonSize.md}
            className="px-0"
          >
            {children || <span>{title}</span>}
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {column.getCanPin() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.pin('left')}>
                <PinIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Pin Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.pin('right')}>
                <PinIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Pin Right
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.pin(false)}>
                <PinIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Unpin
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
