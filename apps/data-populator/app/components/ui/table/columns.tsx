import React, { useCallback } from 'react'

import { Checkbox, Input } from '@0xintuition/1ui'

import { cn } from '@lib/styles'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Thing } from './schema/thing'

// Create an EditableCell component
function EditableCell({
  getValue,
  row: { index },
  column: { id },
  table,
}: {
  getValue: () => any
  row: { index: number }
  column: { id: string }
  table: any
}) {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)

  const onBlur = useCallback(() => {
    table.options.meta?.updateData(index, id, value)
  }, [table.options.meta, index, id, value])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Input
      value={value as string}
      onChange={onChange}
      onBlur={onBlur}
      className="text-base w-full bg-transparent border-transparent focus-visible:border-primary/30 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none focus-visible:ring-accent/40"
    />
  )
}

export const columns: ColumnDef<Thing>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center px-2 h-full">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex h-full items-center px-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, column, table }) => (
      <div className="flex items-center gap-2 h-full w-full pr-2">
        <img
          src={row.getValue('image')}
          alt={row.getValue('name')}
          className="w-12 h-12 min-w-12 object-cover rounded-md"
        />
        <EditableCell
          getValue={() => row.getValue('name')}
          row={row}
          column={column}
          table={table}
        />
      </div>
    ),
    size: 280,
    enableResizing: true,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
        className="pl-2"
      />
    ),
    cell: ({ row, column, table }) => (
      <EditableCell
        getValue={() => row.getValue('description')}
        row={row}
        column={column}
        table={table}
      />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 420,
    enableResizing: true,
  },
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Url" className="pl-2" />
    ),
    cell: ({ row, column, table }) => (
      <EditableCell
        getValue={() => row.getValue('url')}
        row={row}
        column={column}
        table={table}
      />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableResizing: true,
  },
  {
    accessorKey: '@context',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="@context" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 pr-2">
          <span className="truncate font-medium text-foreground/50 cursor-not-allowed">
            {row.getValue('@context')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableResizing: true,
  },
  {
    accessorKey: '@type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="@type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 pr-2">
          <span className="max-w-[500px] truncate font-medium text-foreground/50 cursor-not-allowed">
            {row.getValue('@type')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableResizing: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableResizing: false,
    enableSorting: false,
    size: 32,
  },
  {
    accessorKey: 'image',
    header: () => null,
    cell: ({ row }) => null,
  },
]
