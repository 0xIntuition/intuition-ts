import { useState } from 'react'

import {
  Button,
  ButtonVariant,
  ClaimPosition,
  ClaimPositionType,
  cn,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { SignalModal } from '@components/signal-modal/signal-modal'
import { MIN_DEPOSIT } from '@consts/general'
import { stakeModalAtom } from '@lib/state/store'
import { ColumnDef } from '@tanstack/react-table'
import { AtomType, TripleType } from 'app/types'
import { useAtom } from 'jotai'
import { ArrowBigDown, ArrowBigUp, Users } from 'lucide-react'

import { DataTableColumnHeader } from './data-table-column-header'

// Define the type for our data
export type TableItem = {
  id: string
  image: string
  name: string
  list?: string
  users: number
  tvl: number
  userPosition?: number
  positionDirection?: ClaimPositionType
  vaultId: string
  atom?: AtomType
  triple?: TripleType
  userWallet: string
  contract: string
}

interface SignalCellProps {
  vaultId: string
  userWallet: string
  contract: string
  triple?: TripleType
  atom?: AtomType
  userPosition?: number
  positionDirection?: ClaimPositionType
}

function SignalCell({
  vaultId,
  atom,
  triple,
  userPosition,
  positionDirection,
}: SignalCellProps) {
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false)
  const [signalMode, setSignalMode] = useState<'deposit' | 'redeem'>('deposit')

  const handleSignal = (mode: 'deposit' | 'redeem', e: React.MouseEvent) => {
    e.stopPropagation()
    setSignalMode(mode)
    setIsSignalModalOpen(true)
  }

  const handleClose = () => {
    // Lock table clicks and close modal
    // @ts-ignore - Added by DataTable
    window.__lockTableClicks?.()
    // Use setTimeout to ensure state updates don't conflict
    setTimeout(() => {
      setIsSignalModalOpen(false)
      // Lock again after state update
      // @ts-ignore - Added by DataTable
      window.__lockTableClicks?.()
    }, 0)
  }
  return (
    <>
      <div className="flex items-center justify-end gap-2 pr-6">
        <Button
          variant={ButtonVariant.ghost}
          className="py-0.5 px-2 gap-1 h-9 w-12 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 text-success border-success/50 bg-success/10"
          disabled={positionDirection === ClaimPosition.claimAgainst}
          onClick={(e) => handleSignal('deposit', e)}
        >
          <ArrowBigUp className="w-5 h-5 fill-success" />
          {((userPosition ?? 0) / +MIN_DEPOSIT).toFixed(0)}
        </Button>
        <Button
          variant={ButtonVariant.ghost}
          className="py-0.5 px-2 gap-1 h-9 w-12 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 text-destructive border-destructive/50 bg-destructive/10"
          disabled={positionDirection === ClaimPosition.claimFor}
          onClick={(e) => handleSignal('deposit', e)}
        >
          <ArrowBigDown className="w-5 h-5 fill-destructive" />
          {triple?.counter_vault?.positions_aggregate?.aggregate?.count}
        </Button>
      </div>
      <SignalModal
        isOpen={isSignalModalOpen}
        onClose={handleClose}
        vaultId={vaultId}
        atom={atom}
        triple={triple}
        mode={signalMode}
      />
    </>
  )
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
    header: () => (
      <div className="flex items-center gap-3 pl-2">
        <span>Entries</span>
      </div>
    ),
    cell: ({ row }) => {
      const image = row.original.image
      return (
        <div className="flex items-center gap-3 pl-6">
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
      return (
        <div className="pr-10 flex justify-end items-center gap-1">
          <Users className="w-4 h-4" />
          {row.getValue('users')}
        </div>
      )
    },
    size: 120,
    sortDescFirst: true,
  },
  {
    accessorKey: 'tvl',
    header: ({ column }) => (
      <div className="flex justify-end pr-6">
        <DataTableColumnHeader column={column} title="TVL" />
      </div>
    ),
    cell: ({ row }) => {
      const tvl = row.getValue('tvl')
      return (
        <div className="pr-10 flex justify-end items-center gap-0.5">
          {tvl ? Number(tvl).toFixed(4) : '0'}
          <Icon name="eth" className="w-4 h-4" />
        </div>
      )
    },
    size: 120,
  },
  {
    id: 'signal',
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <DataTableColumnHeader column={column} title="Signal" />
      </div>
    ),
    cell: ({ row }) => {
      const position = row.getValue('userPosition')
      const positionDirection = row.original.positionDirection
      return (
        <SignalCell
          vaultId={row.original.vaultId}
          triple={row.original.triple}
          userPosition={position as number}
          positionDirection={positionDirection}
          userWallet={row.original.userWallet}
          contract={row.original.contract}
        />
      )
    },
    enableSorting: false,
    size: 120,
  },
  {
    accessorKey: 'userPosition',
    header: ({ column }) => (
      <div className="flex justify-end pr-6">
        <DataTableColumnHeader column={column} title="Position" />
      </div>
    ),
    cell: ({ row }) => {
      const position = row.getValue('userPosition')
      const positionDirection = row.original.positionDirection
      return (
        <div
          className={cn(
            'pr-10 flex justify-end items-center gap-0.5',
            positionDirection === ClaimPosition.claimFor && 'text-success',
            positionDirection === ClaimPosition.claimAgainst &&
              'text-destructive',
          )}
        >
          {position ? (Number(position) / +MIN_DEPOSIT).toFixed(0) : '0'}
          <Icon name="eth" className="w-4 h-4" />
        </div>
      )
    },
    size: 120,
  },
]
