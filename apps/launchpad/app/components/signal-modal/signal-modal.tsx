import { useCallback, useEffect, useRef, useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import { AtomType, TripleType } from 'app/types'
import { ClientOnly } from 'remix-utils/client-only'

import { SignalStep } from './signal-step'

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

export interface SignalModalProps {
  isOpen: boolean
  onClose: () => void
  vaultId: string
  atom?: AtomType
  triple?: TripleType
  mode: 'deposit' | 'redeem'
  setMode: (mode: 'deposit' | 'redeem') => void
  initialTicks?: number
  isSimplifiedRedeem?: boolean
}

export function SignalModal({
  isOpen,
  onClose,
  vaultId,
  atom,
  triple,
  initialTicks,
  isSimplifiedRedeem,
}: Omit<SignalModalProps, 'mode' | 'setMode'>) {
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
          <DialogContent className="sm:max-w-[600px] p-0 h-[380px] flex flex-col bg-gradient-to-b from-[#060504] to-[#101010] border-none">
            <div
              className={`transition-all duration-150 ease-in-out ${
                isTransitioning
                  ? 'opacity-0 translate-y-1'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <SignalStep
                vaultId={vaultId}
                counterVaultId={triple?.counter_vault_id?.toString()}
                atom={atom}
                triple={triple}
                open={isOpen}
                onClose={handleClose}
                initialTicks={initialTicks}
                isSimplifiedRedeem={isSimplifiedRedeem}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
