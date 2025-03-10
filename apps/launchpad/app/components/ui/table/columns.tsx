import { useState } from 'react'

import {
  ClaimPosition,
  ClaimPositionType,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { LoadingState } from '@components/loading-state'
import { SignalButton } from '@components/signal-modal/signal-button'
import { SignalModal } from '@components/signal-modal/signal-modal'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { useGetMultiVaultConfig } from '@lib/hooks/useGetMultiVaultConfig'
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

  const handleClose = (e?: React.MouseEvent) => {
    // Prevent event from bubbling up to the row click handler
    e?.stopPropagation()

    // Lock table clicks
    // @ts-ignore - Added by DataTable
    window.__lockTableClicks?.()

    // Close modal immediately
    setIsSignalModalOpen(false)

    // Add a small delay before revalidating to ensure modal is fully closed
    setTimeout(() => {
      queryClient.invalidateQueries()
      revalidator.revalidate()
    }, 100)
  }

  const { data: multiVaultConfig } = useGetMultiVaultConfig(
    MULTIVAULT_CONTRACT_ADDRESS,
  )

  if (!multiVaultConfig) {
    return <LoadingState />
  }

  // Calculate initial ticks based on position direction
  const calculatedInitialTicks = Math.ceil(
    (userPosition ?? 0) /
      (+multiVaultConfig?.formatted_min_deposit *
        (1 - +multiVaultConfig.entry_fee / +multiVaultConfig?.fee_denominator)),
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
          />
        </div>
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
