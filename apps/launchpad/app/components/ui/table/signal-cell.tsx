import { useState } from 'react'

import { ClaimPosition, ClaimPositionType } from '@0xintuition/1ui'

import { EcosystemSignalModal } from '@components/ecosystem-signal-modal/ecosystem-signal-modal'
import { LoadingState } from '@components/loading-state'
import { SignalButton } from '@components/signal-modal/signal-button'
import { SignalModal } from '@components/signal-modal/signal-modal'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { AtomType, MultivaultConfig, TripleType } from 'app/types'

interface SignalCellProps {
  vaultId: string
  triple?: TripleType
  atom?: AtomType
  userPosition?: number
  positionDirection?: ClaimPositionType
  stakingDisabled?: boolean
  multiVaultConfig?: MultivaultConfig
}

export default function SignalCell({
  vaultId,
  atom,
  triple,
  userPosition,
  positionDirection,
  stakingDisabled,
  multiVaultConfig,
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
      // Invalidate specific queries that need to be refreshed
      Promise.all([
        // Invalidate vault details
        queryClient.invalidateQueries({
          queryKey: ['get-vault-details', MULTIVAULT_CONTRACT_ADDRESS, vaultId],
        }),
        // Invalidate positions
        queryClient.invalidateQueries({
          queryKey: ['get-positions'],
        }),
        // Invalidate atoms/triples depending on type
        queryClient.invalidateQueries({
          queryKey: atom ? ['get-atoms'] : ['get-triples'],
        }),
        // Invalidate events
        queryClient.invalidateQueries({
          queryKey: ['get-events'],
        }),
        // Invalidate atoms-with-tags query with a pattern match
        queryClient.invalidateQueries({
          queryKey: ['atoms-with-tags'],
          exact: false,
        }),
      ])
        .then(() => {
          console.log('[SignalCell] All queries invalidated successfully')
          revalidator.revalidate()
          console.log('[SignalCell] Revalidator called')
        })
        .catch((error) => {
          console.error('[SignalCell] Error during query invalidation:', error)
        })
    }, 100)
  }

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
          direction={!triple && initialTicks > 0 ? 'for' : positionDirection}
          positionDirection={
            !triple && initialTicks > 0 ? 'for' : positionDirection
          }
          disabled={!userWallet || stakingDisabled}
          onClick={() => handleSignal('deposit')}
        />
      </div>
      {!triple ? (
        <EcosystemSignalModal
          isOpen={isSignalModalOpen}
          onClose={handleClose}
          vaultId={vaultId}
          atom={atom}
          initialTicks={initialTicks}
          isSimplifiedRedeem={signalMode === 'redeem'}
        />
      ) : (
        <SignalModal
          isOpen={isSignalModalOpen}
          onClose={handleClose}
          vaultId={vaultId}
          atom={atom}
          triple={triple}
          initialTicks={initialTicks}
          isSimplifiedRedeem={signalMode === 'redeem'}
        />
      )}
    </>
  )
}
