import { Button, Icon } from '@0xintuition/1ui'

import { ColumnDef } from '@tanstack/react-table'

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
    cell: ({ row }) => {
      return (
        <div className="w-12 pl-6 text-muted-foreground">{row.index + 1}</div>
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
          <div className="flex flex-col -space-y-1">
            <Icon name="arrow-up" className="h-3 w-3" />
            <Icon name="arrow-down" className="h-3 w-3" />
          </div>
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
  },
  {
    accessorKey: 'assets',
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Assets" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right pr-12">${row.getValue('assets')}</div>
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
            <Icon name="arrow-up" className="h-4 w-4" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            disabled
            className="h-8 w-8 rounded-lg bg-[#E11D48] hover:bg-[#E11D48]"
          >
            <Icon name="x" className="h-4 w-4 text-white" />
          </Button>
        </div>
      )
    },
    enableSorting: false,
    size: 180,
  },
]
