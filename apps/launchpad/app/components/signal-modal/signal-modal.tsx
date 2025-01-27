import { startTransition, useCallback, useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  Icon,
  StepIndicator,
  TransactionStatus,
  TransactionStatusType,
} from '@0xintuition/1ui'

import { TransactionState } from '@components/transaction-state'
import { BLOCK_EXPLORER_URL } from '@consts/general'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { Link } from '@remix-run/react'
import { ClientOnly } from 'remix-utils/client-only'

import { TransactionStateType } from '../../types/transaction'
import { SignalStep } from './signal-step'
import {
  SignalModalProps,
  SignalModalState,
  Step,
  StepId,
  STEPS,
} from './types'

const STEPS_CONFIG: Step[] = [
  { id: STEPS.SIGNAL, label: 'Signal', status: 'current' },
  { id: STEPS.PROCESSING, label: 'Processing', status: 'upcoming' },
  { id: STEPS.FINISHED, label: 'Finished', status: 'upcoming' },
]

const INITIAL_STATE: SignalModalState = {
  currentStep: STEPS.SIGNAL,
  ticks: 1,
}

interface ProcessingStepProps {
  txState: TransactionStateType | undefined
  onBack: () => void
  txHash?: string
}

function ProcessingStep({ txState, onBack, txHash }: ProcessingStepProps) {
  const getTransactionStatus = (): TransactionStatusType => {
    if (!txState?.status) {
      return TransactionStatus.awaiting
    }

    switch (txState.status) {
      case 'complete':
        return TransactionStatus.complete
      case 'error':
        return TransactionStatus.error
      case 'transaction-pending':
        return TransactionStatus.inProgress
      default:
        return TransactionStatus.awaiting
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <TransactionState
        status={getTransactionStatus()}
        txHash={txHash as `0x${string}`}
        type="transaction"
        errorButton={
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          >
            Try Again
          </button>
        }
      />
    </div>
  )
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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
          <Icon name="circle-check-filled" className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-white">Signal Complete!</h3>
        <p className="text-sm text-gray-400 text-center">
          Your signal has been successfully processed.
        </p>
      </div>
      {txHash && (
        <Link
          to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
          target="_blank"
          className="flex flex-row items-center gap-1 text-blue-500 transition-colors duration-300 hover:text-blue-400"
        >
          View Transaction on Basescan
          <Icon name="square-arrow-top-right" className="h-3 w-3" />
        </Link>
      )}
      <button
        onClick={handleClose}
        className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        Close
      </button>
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
  const [steps, setSteps] = useState<Step[]>(STEPS_CONFIG)
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
        updateStepStatus(STEPS.PROCESSING, 'completed')
        updateStepStatus(STEPS.FINISHED, 'current')
      }
    }
  }, [txState?.status])

  const handleNext = useCallback(() => {
    if (state.currentStep === STEPS.SIGNAL) {
      handleTransition((prev) => ({
        ...prev,
        currentStep: STEPS.PROCESSING,
      }))
      updateStepStatus(STEPS.SIGNAL, 'completed')
      updateStepStatus(STEPS.PROCESSING, 'current')
    }
  }, [state.currentStep, handleTransition])

  const updateStepStatus = useCallback(
    (stepId: StepId, status: Step['status']) => {
      setSteps((prev) =>
        prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
      )
    },
    [],
  )

  const handleStepClick = useCallback(
    (stepId: StepId) => {
      const clickedStep = steps.find((s) => s.id === stepId)
      if (clickedStep?.status === 'completed') {
        handleTransition((prev) => ({
          ...prev,
          currentStep: stepId,
        }))

        setSteps((prev) =>
          prev.map((step) => {
            if (step.id === stepId) {
              return { ...step, status: 'current' }
            }
            if (step.id === state.currentStep) {
              return { ...step, status: 'upcoming' }
            }
            return step
          }),
        )
      }
    },
    [steps, state.currentStep, handleTransition],
  )

  const handleBack = useCallback(() => {
    handleTransition((prev) => ({
      ...prev,
      currentStep: STEPS.SIGNAL,
    }))
    updateStepStatus(STEPS.PROCESSING, 'upcoming')
    updateStepStatus(STEPS.SIGNAL, 'current')
    setTxState(undefined)
  }, [handleTransition])

  const onStakingSuccess = useCallback(() => {
    startTransition(() => {
      setSteps((prev) => {
        const newSteps = prev.map((step) => {
          if (step.id === STEPS.SIGNAL) {
            return { ...step, status: 'completed' as const }
          }
          if (step.id === STEPS.PROCESSING) {
            return { ...step, status: 'current' as const }
          }
          return step
        })
        return newSteps
      })

      handleTransition((prev) => ({
        ...prev,
        currentStep: STEPS.PROCESSING,
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
      case STEPS.PROCESSING:
        return (
          <ProcessingStep
            txState={txState}
            onBack={handleBack}
            txHash={txHash}
          />
        )
      case STEPS.FINISHED:
        return <FinishedStep txHash={txHash} onClose={onClose} />
      default:
        return null
    }
  }

  const handleModalClose = () => {
    onClose()
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
            <DialogFooter className="w-full items-center">
              <div className="flex flex-row justify-between px-5 py-5 w-full rounded-b-xl bg-[#0A0A0A]">
                <StepIndicator<StepId>
                  steps={steps}
                  onStepClick={handleStepClick}
                  showNavigation
                  onNext={
                    state.currentStep === STEPS.FINISHED
                      ? handleModalClose
                      : handleNext
                  }
                  disableNext={
                    state.currentStep === STEPS.SIGNAL
                      ? txState?.status !== 'complete'
                      : false
                  }
                  disableBack={
                    isLoading || (txState?.status && txState?.status !== 'idle')
                  }
                  customNextButton={
                    state.currentStep === STEPS.FINISHED
                      ? { content: 'Close' }
                      : undefined
                  }
                />
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
