import { ClaimPositionType, Icon, IconName } from '@0xintuition/1ui'

import { ColumnDef } from '@tanstack/react-table'
import { AtomType, MultivaultConfig, TripleType } from 'app/types'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'

import { DataTableColumnHeader } from './data-table-column-header'
import SignalCell from './signal-cell'

// Define the type for our data
export type TableItem = {
  id: string
  image: string
  name: string
  list?: string
  users: number
  forTvl: number
  againstTvl: number
  upvotes: number
  downvotes: number
  userPosition?: number
  positionDirection?: ClaimPositionType
  vaultId: string
  currentSharePrice?: number
  atom?: AtomType
  triple?: TripleType
  stakingDisabled?: boolean
  multiVaultConfig?: MultivaultConfig
}

export const tripleColumns: ColumnDef<TableItem>[] = [
  {
    id: 'position',
    header: '',
    cell: ({ table, row }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const rowIndex = table
        .getSortedRowModel()
        .rows.findIndex((r) => r.id === row.id)
      return (
        <div className="w-12 pl-6 text-muted-foreground">
          {pageIndex * pageSize + rowIndex + 1}
        </div>
      )
    },
    size: 48,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="flex items-center gap-3">
        <span>Entries</span>
      </div>
    ),
    cell: ({ row }) => {
      const image = row.original.image
      return (
        <div className="flex items-center gap-3">
          {image && image !== 'null' ? (
            <img
              src={image}
              alt={row.getValue('name')}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon
              name={IconName.fingerprint}
              className="w-8 h-8 text-primary/40"
            />
          )}
          <div className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] overflow-hidden">
            <span
              className="font-medium block truncate"
              title={row.getValue('name')}
            >
              {row.getValue('name')}
            </span>
          </div>
        </div>
      )
    },
    size: 300,
  },
  {
    accessorKey: 'upvotes',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader
          column={column}
          title={<span className="hidden sm:inline">Upvotes</span>}
          className="p-0"
        >
          <div className="flex justify-center items-center gap-1 min-w-[60px]">
            <span className="hidden sm:inline">Upvotes</span>
            <ArrowBigUp className="sm:hidden w-4 h-4 fill-success text-success" />
          </div>
        </DataTableColumnHeader>
      </div>
    ),
    cell: ({ row }) => {
      const upvotes = row.original.upvotes
      const roundedUpVotes = Math.ceil(upvotes)

      return (
        <div className="flex justify-center items-center gap-1 min-w-[60px]">
          <ArrowBigUp className="w-4 h-4 flex-shrink-0 fill-success text-success" />
          {roundedUpVotes}
        </div>
      )
    },
    size: 80,
    sortDescFirst: true,
  },
  {
    accessorKey: 'downvotes',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader
          column={column}
          title={<span className="hidden sm:inline">Downvotes</span>}
          className="p-0"
        >
          <div className="flex justify-center items-center gap-1 min-w-[60px]">
            <span className="hidden sm:inline">Downvotes</span>
            <ArrowBigDown className="sm:hidden w-4 h-4 fill-destructive text-destructive" />
          </div>
        </DataTableColumnHeader>
      </div>
    ),
    cell: ({ row }) => {
      const downvotes = row.original.downvotes
      const roundedDownVotes = Math.ceil(downvotes)
      return (
        <div className="flex justify-center items-center gap-1 min-w-[60px]">
          {roundedDownVotes}
          <ArrowBigDown className="w-4 h-4 flex-shrink-0 fill-destructive text-destructive" />
        </div>
      )
    },
    size: 80,
    sortDescFirst: true,
  },
  {
    accessorKey: 'tvl',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="TVL" />
      </div>
    ),
    cell: ({ row }) => {
      const forTvl = row.original.forTvl
      const againstTvl = row.original.againstTvl
      const tvl = Number(forTvl) + Number(againstTvl)

      return (
        <div className="flex justify-center items-center gap-0.5">
          {tvl ? Number(tvl).toFixed(4) : '0'}
          <Icon name="eth" className="w-3 h-3" />
        </div>
      )
    },
    size: 72,
  },
  {
    id: 'userPosition',
    accessorFn: (row) => row.userPosition ?? 0,
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="My Vote" />
      </div>
    ),
    cell: ({ row }) => {
      const position = row.original.userPosition ?? 0
      const positionDirection = row.original.positionDirection
      return (
        <div data-prevent-row-click="true">
          <SignalCell
            vaultId={row.original.vaultId}
            triple={row.original.triple}
            atom={row.original.atom}
            userPosition={position as number}
            positionDirection={positionDirection}
            stakingDisabled={row.original.stakingDisabled}
            multiVaultConfig={row.original.multiVaultConfig}
          />
        </div>
      )
    },
    size: 96,
  },
]

export const atomColumns: ColumnDef<TableItem>[] = [
  {
    id: 'position',
    header: '',
    cell: ({ table, row }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const rowIndex = table
        .getSortedRowModel()
        .rows.findIndex((r) => r.id === row.id)
      return (
        <div className="w-12 pl-6 text-muted-foreground">
          {pageIndex * pageSize + rowIndex + 1}
        </div>
      )
    },
    size: 48,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="flex items-center gap-3">
        <span>Entries</span>
      </div>
    ),
    cell: ({ row }) => {
      const image = row.original.image
      return (
        <div className="flex items-center gap-3">
          {image && image !== 'null' ? (
            <img
              src={image}
              alt={row.getValue('name')}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon
              name={IconName.fingerprint}
              className="w-8 h-8 text-primary/40"
            />
          )}
          <span className="font-medium truncate">{row.getValue('name')}</span>
        </div>
      )
    },
    size: 600,
  },
  {
    accessorKey: 'upvotes',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader
          column={column}
          title={<span className="hidden sm:inline">Upvotes</span>}
          className="p-0"
        >
          <div className="flex justify-center items-center gap-1 min-w-[60px]">
            <span className="hidden sm:inline">Upvotes</span>
            <ArrowBigUp className="sm:hidden w-4 h-4 fill-success text-success" />
          </div>
        </DataTableColumnHeader>
      </div>
    ),
    cell: ({ row }) => {
      const upvotes = row.original.upvotes
      const roundedUpVotes = Math.ceil(upvotes)

      return (
        <div className="flex justify-center items-center gap-1 min-w-[60px]">
          <ArrowBigUp className="w-4 h-4 flex-shrink-0 fill-success text-success" />
          {roundedUpVotes}
        </div>
      )
    },
    size: 80,
    sortDescFirst: true,
  },
  {
    accessorKey: 'tvl',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="TVL" />
      </div>
    ),
    cell: ({ row }) => {
      const forTvl = row.original.forTvl
      const tvl = Number(forTvl)

      return (
        <div className="pr-10 flex items-center gap-0.5">
          {tvl ? Number(tvl).toFixed(4) : '0'}
          <Icon name="eth" className="w-3 h-3" />
        </div>
      )
    },
    size: 72,
  },
  {
    id: 'userPosition',
    accessorFn: (row) => row.userPosition ?? 0,
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="My Vote" />
      </div>
    ),
    cell: ({ row }) => {
      const position = row.original.userPosition ?? 0
      const positionDirection = row.original.positionDirection
      return (
        <div data-prevent-row-click="true">
          <SignalCell
            vaultId={row.original.vaultId}
            atom={row.original.atom}
            userPosition={position as number}
            positionDirection={positionDirection}
            stakingDisabled={row.original.stakingDisabled}
            multiVaultConfig={row.original.multiVaultConfig}
          />
        </div>
      )
    },
    size: 96,
  },
]
