import React, { CSSProperties } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@0xintuition/1ui'

import { useMediaQuery } from '@lib/hooks/useMediaQuery'
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
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const columnVisibility = React.useMemo(() => {
    const defaultVisibility = {
      position: true,
      name: true,
      upvotes: true,
      downvotes: true,
      users: true,
      tvl: true,
      userPosition: true,
    }

    if (isMobile) {
      return {
        position: false,
        name: true,
        upvotes: true,
        userPosition: true,
        users: false,
        downvotes: false,
        tvl: false,
      }
    }
    if (isTablet) {
      return {
        position: true,
        name: true,
        upvotes: true,
        downvotes: true,
        userPosition: true,
        users: true,
        tvl: false,
      }
    }
    return defaultVisibility
  }, [isMobile, isTablet])

  const internalTable = useReactTable({
    data,
    columns,
    columnResizeMode,
    enableColumnPinning: !isMobile,
    enableColumnResizing: !isMobile,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnVisibility,
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
    const target = e.target as HTMLElement
    const preventClick = target.closest('[data-prevent-row-click="true"]')
    const button = target.closest('button')
    const dialog = target.closest('[role="dialog"]')

    if (preventClick || button || dialog || isClickLockedRef.current) {
      return
    }

    onRowClick?.(Number(row.original.id))
  }

  React.useEffect(() => {
    // @ts-ignore - Add to window for other components to use
    window.__lockTableClicks = () => {
      if (isClickLockedRef.current) {
        if (clickLockTimeoutRef.current) {
          clearTimeout(clickLockTimeoutRef.current)
        }
      }

      isClickLockedRef.current = true
      clickLockTimeoutRef.current = setTimeout(() => {
        isClickLockedRef.current = false
      }, 300)
    }
  }, [])

  return (
    <>
      <div className="flex justify-end">
        {/* <Button variant="ghost" size="sm" className="ml-auto">
          <Icon name="filter-1" className="h-4 w-4 mr-2" />
          Filter
        </Button> */}
      </div>
      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 rounded-lg px-4 py-2 md:p-0 mb-4">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table
              className="w-full table-fixed md:table-auto"
              style={{
                minWidth: isMobile ? 'auto' : table.getTotalSize(),
                maxWidth: '100%',
                fontSize: isMobile ? '14px' : '16px',
              }}
            >
              <TableHeader className="rounded-md">
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
                          className={`
                              text-sm font-medium text-muted-foreground h-12 px-2 !bg-transparent
                              ${isMobile ? 'first:pl-2' : 'first:pl-4'}
                              ${isMobile ? 'last:pr-2' : 'last:pr-4'}
                            `}
                          style={{
                            width: isMobile ? 'auto' : header.getSize(),
                            ...(!isMobile
                              ? getCommonPinningStyles(header.column)
                              : {}),
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {!isMobile && header.column.getCanResize() && (
                            <div
                              role="presentation"
                              aria-hidden="true"
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className={`resizer ${
                                header.column.getIsResizing()
                                  ? 'isResizing'
                                  : ''
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
                      {row
                        .getVisibleCells()
                        .map((cell: Cell<TData, unknown>) => (
                          <TableCell
                            key={cell.id}
                            className={`
                                h-[72px] text-sm px-2 !bg-transparent
                                ${isMobile ? 'first:pl-2' : 'first:pl-4'}
                                ${isMobile ? 'last:pr-2' : 'last:pr-4'}
                              `}
                            style={{
                              width: isMobile ? 'auto' : cell.column.getSize(),
                              maxWidth:
                                cell.column.id === 'name' ? '500px' : 'auto',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              ...(!isMobile
                                ? getCommonPinningStyles(cell.column)
                                : {}),
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
      </div>
      <DataTablePagination
        table={table}
        onPaginationChange={onPaginationChange}
      />
    </>
  )
}
