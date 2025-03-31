import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { usePrivy } from '@privy-io/react-auth'
import { AtomType } from 'app/types'
import { ClientOnly } from 'remix-utils/client-only'

import { EcosystemSignalStep } from './ecosystem-signal-step'

interface StepTransition {
  isTransitioning: boolean
  handleTransition: () => void
  resetTransition: () => void
}

/**
 * Custom hook to manage transitions with proper cleanup
 */
const useTransition = (): StepTransition => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<number>()

  const handleTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const resetTransition = useCallback(() => {
    setIsTransitioning(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      resetTransition()
    }
  }, [resetTransition])

  return { isTransitioning, handleTransition, resetTransition }
}

export interface EcosystemSignalModalProps {
  isOpen: boolean
  onClose: () => void
  vaultId: string
  atom?: AtomType
  initialTicks?: number
  isSimplifiedRedeem?: boolean
}

export function EcosystemSignalModal({
  isOpen,
  onClose,
  vaultId,
  atom,
  initialTicks,
  isSimplifiedRedeem,
}: EcosystemSignalModalProps) {
  const transition = useTransition()
  const { isTransitioning, handleTransition, resetTransition } = transition
  const timeoutRef = useRef<number>()

  useEffect(() => {
    if (isOpen) {
      resetTransition()
    }
  }, [isOpen, resetTransition])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleClose = useCallback(() => {
    handleTransition()
    // Use a single timeout that's slightly longer than the CSS transition
    timeoutRef.current = window.setTimeout(() => {
      onClose()
    }, 200)
  }, [handleTransition, onClose])

  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address
  const walletBalance = useGetWalletBalance(userWallet as `0x${string}`, isOpen)

  return (
    <ClientOnly>
      {() => (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              // Lock clicks and close with transition
              // @ts-ignore - Added by DataTable
              window.__lockTableClicks?.()
              handleClose()
            }
          }}
        >
          <DialogContent className="sm:max-w-[600px] flex flex-col bg-gradient-to-b from-[#060504] to-[#101010] border-none pb-4">
            <DialogTitle className="flex items-center">
              <Text
                variant={TextVariant.headline}
                weight={TextWeight.semibold}
                className="flex-1"
              >
                {isSimplifiedRedeem ? (
                  <>
                    Redeem your signal for{' '}
                    {atom?.value?.account?.label ?? atom?.label}
                  </>
                ) : (
                  <>
                    Cast your signal on{' '}
                    {atom?.value?.account?.label ?? atom?.label}
                  </>
                )}
              </Text>
              <Badge className="flex items-center gap-1 px-2 mr-2">
                <Icon name="wallet" className="h-4 w-4 text-secondary/50" />
                <Text
                  variant={TextVariant.caption}
                  className="text-nowrap text-secondary/50"
                >
                  {(+walletBalance).toFixed(2)} ETH
                </Text>
              </Badge>
            </DialogTitle>
            <div
              className={`transition-all duration-150 ease-in-out ${
                isTransitioning
                  ? 'opacity-0 translate-y-1'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <EcosystemSignalStep
                vaultId={vaultId}
                atom={atom}
                open={isOpen}
                onClose={handleClose}
                initialTicks={initialTicks}
                isSimplifiedRedeem={isSimplifiedRedeem}
                userWallet={userWallet as `0x${string}`}
                walletBalance={walletBalance}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
