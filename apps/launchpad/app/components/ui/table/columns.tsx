import { Icon } from '@0xintuition/1ui'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, X as CloseX } from 'lucide-react'

import { DataTableColumnHeader } from './data-table-column-header'

// Define the type for our data
type TableItem = {
  id: string
  image: string
  name: string
  users: number
  assets: number
}

export const columns: ColumnDef<TableItem>[] = [
  {
    id: 'position',
    header: '',
    cell: ({ table, row }) => {
      return (
        <div className="w-12 pl-6 text-muted-foreground">
          {table.getSortedRowModel().rows.findIndex((r) => r.id === row.id) + 1}
        </div>
      )
    },
    size: 48,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex items-center gap-3 pl-6">
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting()}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              column.toggleSorting()
            }
          }}
        >
          <span>Entries</span>
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const image = row.original.image
      return (
        <div className="flex items-center gap-3 pl-6">
          {image ? (
            <img
              src={image}
              alt={row.getValue('name')}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-background-muted" />
          )}
          <span className="font-medium">{row.getValue('name')}</span>
        </div>
      )
    },
    size: 480,
  },
  {
    accessorKey: 'users',
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Users" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right pr-12">{row.getValue('users')}</div>
    },
    size: 120,
    sortDescFirst: true,
  },
  {
    accessorKey: 'assets',
    header: ({ column }) => (
      <div className="flex justify-end pr-6">
        <DataTableColumnHeader column={column} title="Assets" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right pr-6">{row.getValue('assets')} ETH</div>
    },
    size: 120,
  },
  {
    id: 'signal',
    header: ({ column }) => (
      <div className="flex justify-end pr-6">
        <DataTableColumnHeader column={column} title="Signal" />
      </div>
    ),
    cell: () => {
      return (
        <div className="flex items-center justify-end gap-2 pr-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1C1C1C] rounded-lg">
            <Icon name="arrow-up" className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-destructive">
            <CloseX className="h-5 w-5 text-white" />
          </div>
        </div>
      )
    },
    enableSorting: false,
    size: 180,
  },
]
