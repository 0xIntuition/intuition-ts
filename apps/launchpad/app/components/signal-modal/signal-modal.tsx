import { startTransition, useCallback, useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { Link } from '@remix-run/react'
import { ClientOnly } from 'remix-utils/client-only'

import { TransactionStateType } from '../../types/transaction'
import { SignalStep } from './signal-step'
import { SignalModalProps, SignalModalState, STEPS } from './types'

const INITIAL_STATE: SignalModalState = {
  currentStep: STEPS.SIGNAL,
  ticks: 1,
}

interface FinishedStepProps {
  txHash?: string
  onClose: (e?: React.MouseEvent) => void
}

function FinishedStep({ txHash, onClose }: FinishedStepProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose(e)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
          <Icon name="circle-check-filled" className="w-6 h-6 text-green-500" />
        </div>
        <Text variant={TextVariant.headline} weight={TextWeight.semibold}>
          Signal Complete!
        </Text>
        <Text variant={TextVariant.footnote} className="text-foreground/70">
          Your transaction has been successfully processed.
        </Text>
      </div>
      {txHash && (
        <Link
          to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
          target="_blank"
          className="flex flex-row items-center gap-1 text-blue-500 transition-colors duration-300 hover:text-blue-400"
        >
          <Text variant={TextVariant.body} className="text-inherit">
            View Transaction on Basescan
          </Text>
          <Icon name="square-arrow-top-right" className="h-3 w-3" />
        </Link>
      )}
      <Button onClick={handleClose}>Close</Button>
    </div>
  )
}

export function SignalModal({
  isOpen,
  onClose,
  atom,
  triple,
  vaultId,
  mode,
}: SignalModalProps) {
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address

  const [state, setState] = useState<SignalModalState>(INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [txState, setTxState] = useState<TransactionStateType>()
  const [txHash, setTxHash] = useState<string>()

  const handleTransition = useCallback(
    (updateFn: (prev: SignalModalState) => SignalModalState) => {
      setState((prev) => {
        return updateFn(prev)
      })
    },
    [],
  )

  useEffect(() => {
    if (isOpen) {
      setState(INITIAL_STATE)
      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''

      const MODAL_ANIMATION_DURATION = 300
      const timer = setTimeout(() => {
        setState(INITIAL_STATE)
      }, MODAL_ANIMATION_DURATION)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (txState?.status) {
      logger('txState.status changed:', txState.status)
      if (txState.status === 'complete') {
        handleTransition((prev) => ({
          ...prev,
          currentStep: STEPS.FINISHED,
        }))
      }
    }
  }, [txState?.status])

  const onStakingSuccess = useCallback(() => {
    startTransition(() => {
      handleTransition((prev) => ({
        ...prev,
        currentStep: STEPS.FINISHED,
      }))
    })

    if (!userWallet) {
      logger('Missing userWallet')
      return
    }
  }, [handleTransition, userWallet])

  useEffect(() => {
    if (txState?.txHash) {
      setTxHash(txState.txHash)
    }
  }, [txState?.txHash])

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case STEPS.SIGNAL:
        return (
          <SignalStep
            vaultId={vaultId}
            mode={mode}
            atom={atom}
            triple={triple}
            open={true}
            setTxState={setTxState}
            onStakingSuccess={onStakingSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )
      case STEPS.FINISHED:
        return <FinishedStep txHash={txHash} onClose={onClose} />
      default:
        return null
    }
  }

  return (
    <ClientOnly>
      {() => (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              // Lock clicks when the Dialog starts to close
              // @ts-ignore - Added by DataTable
              window.__lockTableClicks?.()
              onClose()
            }
          }}
        >
          <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] md:max-w-[720px] w-full border-none">
            {renderCurrentStep()}
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
