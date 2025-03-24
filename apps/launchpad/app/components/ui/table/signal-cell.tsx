import { useState } from 'react'

import { ClaimPosition, ClaimPositionType } from '@0xintuition/1ui'

import { EcosystemSignalModal } from '@components/ecosystem-signal-modal/ecosystem-signal-modal'
import { LoadingState } from '@components/loading-state'
import { SignalButton } from '@components/signal-modal/signal-button'
import { SignalModal } from '@components/signal-modal/signal-modal'
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
      queryClient.invalidateQueries()
      revalidator.revalidate()
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
          direction={positionDirection}
          positionDirection={positionDirection}
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
      {/* <SignalModal
        isOpen={isSignalModalOpen}
        onClose={handleClose}
        vaultId={vaultId}
        atom={atom}
        triple={triple}
        initialTicks={initialTicks}
        isSimplifiedRedeem={signalMode === 'redeem'}
      /> */}
    </>
  )
}
