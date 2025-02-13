import React, { CSSProperties } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@0xintuition/1ui'

import type {
  Cell,
  Column,
  ColumnDef,
  ColumnResizeMode,
  HeaderGroup,
  Row,
  SortingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTablePagination } from './data-table-pagination'

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (id: number) => void
  table?: ReturnType<typeof useReactTable<TData>>
  onPaginationChange?: (pageIndex: number, pageSize: number) => void
}

const getCommonPinningStyles = <T,>(
  column: Column<T, unknown>,
): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '4px 0 4px -4px rgba(0, 0, 0, 0.1)'
      : isFirstRightPinnedColumn
        ? '-4px 0 4px -4px rgba(0, 0, 0, 0.1)'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 2 : 1,
    backgroundColor: isPinned ? 'var(--background)' : undefined,
  }
}

export function DataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  onRowClick,
  table: externalTable,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange')
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'upvotes',
      desc: true,
    },
  ])
  const clickLockTimeoutRef = React.useRef<NodeJS.Timeout>()
  const isClickLockedRef = React.useRef(false)

  const internalTable = useReactTable({
    data,
    columns,
    columnResizeMode,
    enableColumnPinning: true,
    enableColumnResizing: true,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
      columnPinning: {
        left: ['index'],
        right: ['actions'],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const table = externalTable ?? internalTable

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (clickLockTimeoutRef.current) {
        clearTimeout(clickLockTimeoutRef.current)
      }
    }
  }, [])

  const handleRowClick = (e: React.MouseEvent, row: Row<TData>) => {
    // Check if the click originated from a cell that should prevent row clicks
    const target = e.target as HTMLElement
    const preventClick = target.closest('[data-prevent-row-click="true"]')
    const button = target.closest('button')
    const dialog = target.closest('[role="dialog"]')

    // Don't trigger row click if:
    // 1. Click was on a button
    // 2. Click was in a cell that prevents clicks
    // 3. Click was in a dialog
    // 4. Click lock is active
    if (preventClick || button || dialog || isClickLockedRef.current) {
      return
    }

    onRowClick?.(Number(row.original.id))
  }

  // Expose a method to lock clicks temporarily
  React.useEffect(() => {
    // @ts-ignore - Add to window for other components to use
    window.__lockTableClicks = () => {
      // If already locked, extend the lock duration
      if (isClickLockedRef.current) {
        if (clickLockTimeoutRef.current) {
          clearTimeout(clickLockTimeoutRef.current)
        }
      }

      isClickLockedRef.current = true
      clickLockTimeoutRef.current = setTimeout(() => {
        isClickLockedRef.current = false
      }, 300) // Increased to 300ms for more reliable prevention
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {/* <Button variant="ghost" size="sm" className="ml-auto">
          <Icon name="filter-1" className="h-4 w-4 mr-2" />
          Filter
        </Button> */}
      </div>
      <div className="rounded-lg bg-black/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full" style={{ minWidth: table.getTotalSize() }}>
            <TableHeader className="bg-gradient-to-l from-[#060504] to-[#101010] rounded-md">
              {table
                .getHeaderGroups()
                .map((headerGroup: HeaderGroup<TData>) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-border/10"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="text-sm font-medium text-muted-foreground h-12"
                        style={{
                          width: header.getSize(),
                          ...getCommonPinningStyles(header.column),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.getCanResize() && (
                          <div
                            role="presentation"
                            aria-hidden="true"
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`}
                          />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: Row<TData>) => (
                  <TableRow
                    key={row.id}
                    className="border-b hover:bg-[#101010] transition-colors cursor-pointer border-border/10"
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={(e) => handleRowClick(e, row)}
                  >
                    {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                      <TableCell
                        key={cell.id}
                        className="h-[72px] text-sm"
                        style={{
                          width: cell.column.getSize(),
                          ...getCommonPinningStyles(cell.column),
                        }}
                        data-prevent-row-click={cell.column.id === 'signal'}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination
        table={table}
        onPaginationChange={onPaginationChange}
      />
    </div>
  )
}
