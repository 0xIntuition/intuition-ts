import { useState } from 'react'

import {
  ClaimPosition,
  ClaimPositionType,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { SignalButton } from '@components/signal-modal/signal-button'
import { SignalModal } from '@components/signal-modal/signal-modal'
import { MIN_DEPOSIT } from '@consts/general'
import { usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { AtomType, TripleType } from 'app/types'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'

import { DataTableColumnHeader } from './data-table-column-header'

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
}

interface SignalCellProps {
  vaultId: string
  triple?: TripleType
  atom?: AtomType
  userPosition?: number
  positionDirection?: ClaimPositionType
  stakingDisabled?: boolean
}

function SignalCell({
  vaultId,
  atom,
  triple,
  userPosition,
  positionDirection,
  stakingDisabled,
}: SignalCellProps) {
  const { user: privyUser } = usePrivy()
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false)
  const [signalMode, setSignalMode] = useState<'deposit' | 'redeem'>('deposit')
  const userWallet = privyUser?.wallet?.address
  const queryClient = useQueryClient()
  const handleSignal = (mode: 'deposit' | 'redeem') => {
    setSignalMode(mode)
    setIsSignalModalOpen(true)
  }

  const revalidator = useRevalidator()

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
    queryClient.invalidateQueries()
    revalidator.revalidate()
  }

  // Calculate initial ticks based on position direction
  const calculatedInitialTicks = Math.ceil(
    (userPosition ?? 0) / (+MIN_DEPOSIT * 0.95),
  )
  const initialTicks =
    positionDirection === ClaimPosition.claimAgainst
      ? -calculatedInitialTicks
      : calculatedInitialTicks

  return (
    <>
      <div className="flex items-center justify-end gap-2 pr-6">
        <SignalButton
          variant={positionDirection}
          numPositions={Math.abs(initialTicks)}
          direction={positionDirection}
          positionDirection={positionDirection}
          disabled={!userWallet || stakingDisabled}
          onClick={() => handleSignal('deposit')}
        />
      </div>
      <SignalModal
        isOpen={isSignalModalOpen}
        onClose={handleClose}
        vaultId={vaultId}
        atom={atom}
        triple={triple}
        initialTicks={initialTicks}
        isSimplifiedRedeem={signalMode === 'redeem'}
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
    accessorKey: 'upvotes',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader
          column={column}
          title="Upvotes"
          className="p-0"
        />
      </div>
    ),
    cell: ({ row }) => {
      const upvotes = row.original.upvotes
      const roundedUpVotes = Math.ceil(upvotes)

      return (
        <div className="flex justify-center items-center gap-1">
          <ArrowBigUp className="w-4 h-4 fill-success text-success" />
          {roundedUpVotes}
        </div>
      )
    },
    size: 24,
    sortDescFirst: true,
  },
  {
    accessorKey: 'downvotes',
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Downvotes" />
      </div>
    ),
    cell: ({ row }) => {
      const downvotes = row.original.downvotes
      const roundedDownVotes = Math.ceil(downvotes)
      return (
        <div className="flex justify-center items-center gap-1">
          {roundedDownVotes}
          <ArrowBigDown className="w-4 h-4 fill-destructive text-destructive" />
        </div>
      )
    },
    size: 24,
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
      const forTvl = row.original.forTvl
      const againstTvl = row.original.againstTvl
      const tvl = Number(forTvl) + Number(againstTvl)

      return (
        <div className="pr-10 flex justify-end items-center gap-0.5">
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
        <SignalCell
          vaultId={row.original.vaultId}
          triple={row.original.triple}
          atom={row.original.atom}
          userPosition={position as number}
          positionDirection={positionDirection}
          stakingDisabled={row.original.stakingDisabled}
        />
      )
    },
    size: 96,
  },
  // {
  //   accessorKey: 'userPosition',
  //   header: ({ column }) => (
  //     <div className="flex justify-end pr-6">
  //       <DataTableColumnHeader column={column} title="Position" />
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const position = row.getValue('userPosition')
  //     const positionDirection = row.original.positionDirection
  //     return (
  //       <div
  //         className={cn(
  //           'pr-10 flex justify-end items-center gap-0.5',
  //           positionDirection === ClaimPosition.claimFor && 'text-success',
  //           positionDirection === ClaimPosition.claimAgainst &&
  //             'text-destructive',
  //         )}
  //       >
  //         {position ? (Number(position) / +MIN_DEPOSIT).toFixed(0) : '0'}
  //         <Icon name="eth" className="w-4 h-4" />
  //       </div>
  //     )
  //   },
  //   size: 120,
  // },
]
