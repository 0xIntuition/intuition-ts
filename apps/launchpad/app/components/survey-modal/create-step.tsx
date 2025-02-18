import { useState } from 'react'

import {
  Card,
  CardHeader,
  StepIndicator,
  toast,
  TransactionStatus,
  TransactionStatusType,
} from '@0xintuition/1ui'
import { usePinThingMutation } from '@0xintuition/graphql'

import {
  Atom,
  DepositFormData,
  organizationAtomSchema,
  personAtomSchema,
  registerAtomForm,
  thingAtomSchema,
} from '@components/atom-forms'
import CreateAtomToast from '@components/atom-forms/create-toast'
import {
  OrganizationForm,
  PersonForm,
  ThingForm,
} from '@components/atom-forms/forms'
import { SurveyDepositForm } from '@components/atom-forms/forms/survey-deposit-form'
import { SurveyFormContainer } from '@components/atom-forms/survey-form-container'
import { NewAtomMetadata } from '@components/survey-modal/types'
import { TransactionState } from '@components/transaction-state'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtomMutation } from '@lib/hooks/mutations/useCreateAtomMutation'
import { useCreateAtomConfig } from '@lib/hooks/useCreateAtomConfig'
import { ipfsUrl } from '@lib/utils/app'
import { usePrivy } from '@privy-io/react-auth'
import { Address, decodeEventLog, formatUnits, toHex } from 'viem'
import { useBalance, usePublicClient } from 'wagmi'

// Register all form types
registerAtomForm('Thing', {
  schema: thingAtomSchema,
  component: ThingForm,
})

registerAtomForm('Person', {
  schema: personAtomSchema,
  component: PersonForm,
})

registerAtomForm('Organization', {
  schema: organizationAtomSchema,
  component: OrganizationForm,
})

type StepStatus = 'upcoming' | 'current' | 'completed'
type Step = {
  id: string
  label: string
  status: StepStatus
}

const INITIAL_STEPS: Step[] = [
  { id: 'metadata', label: 'Publish', status: 'current' },
  { id: 'review', label: 'Review', status: 'upcoming' },
  { id: 'create', label: 'Create', status: 'upcoming' },
]

export interface CreateStepProps {
  onCreationSuccess: (metadata: NewAtomMetadata) => void
  initialName?: string
}

export function CreateStep({
  onCreationSuccess,
  initialName,
}: CreateStepProps) {
  const [currentStep, setCurrentStep] = useState('metadata')
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS)
  const [ipfsUri, setIpfsUri] = useState<string | null>(null)
  const [atomData, setAtomData] = useState<Atom | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [lastTxHash, setLastTxHash] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)

  const { mutateAsync: pinThing, isPending } = usePinThingMutation({
    onError: (error) => {
      console.error('Failed to upload to IPFS:', error)
      // TODO: Show error state in UI
    },
  })

  const { user: privyUser } = usePrivy()
  const { wallet } = privyUser ?? {}
  const { data: balance } = useBalance({
    address: wallet?.address as `0x${string}`,
  })
  const publicClient = usePublicClient()
  const { data: createAtomConfig, isLoading: isLoadingConfig } =
    useCreateAtomConfig()
  const { atomCost, minDeposit } = createAtomConfig ?? {}

  const {
    mutateAsync: createAtom,
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isSuccess,
    isError,
    reset,
  } = useCreateAtomMutation(MULTIVAULT_CONTRACT_ADDRESS)

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
    )
  }

  const handleStepClick = (stepId: string) => {
    const clickedStep = steps.find((s) => s.id === stepId)
    if (clickedStep?.status === 'completed') {
      setCurrentStep(stepId)

      // Update current steps
      setSteps((prev) =>
        prev.map((step) => {
          if (step.id === stepId) {
            return { ...step, status: 'current' }
          }
          if (step.id === currentStep) {
            return { ...step, status: 'upcoming' }
          }
          return step
        }),
      )
    }
  }

  const handleMetadataSubmit = async (data: Atom) => {
    try {
      // Start IPFS upload
      const result = await pinThing({
        name: data.name,
        description: data.description,
        image: data.image,
        url: data.url,
      })
      setIpfsUri(result.pinThing?.uri ?? null)
      setAtomData(data)

      updateStepStatus('metadata', 'completed')

      // Move to review step
      updateStepStatus('review', 'current')
      setCurrentStep('review')
    } catch (error) {
      // TODO: Error handled by mutation onError
    }
  }

  const handleDepositSubmit = async (data: DepositFormData) => {
    try {
      const totalAmount = (
        +formatUnits(BigInt(atomCost ?? '0'), 18) + +data.amount
      ).toString()

      if (+totalAmount > +(balance?.formatted ?? '0')) {
        setValidationErrors(['Insufficient balance'])
        setShowErrors(true)
        return
      }

      // Reset validation state when proceeding
      setValidationErrors([])
      setShowErrors(false)

      setIsSubmitting(true)
      if (!ipfsUri) {
        throw new Error('IPFS CID not found')
      }

      if (!atomCost) {
        throw new Error('Atom cost not found')
      }

      setCurrentStep('create')

      const txHash = await createAtom({
        val: totalAmount,
        uri: toHex(ipfsUri),
        contract: MULTIVAULT_CONTRACT_ADDRESS,
        userWallet: wallet?.address as `0x${string}`,
      })

      if (publicClient && txHash) {
        setTransactionHash(txHash)
        updateStepStatus('review', 'completed')
        updateStepStatus('create', 'current')
      }
    } catch (error) {
      console.error('Failed to create atom:', error)
      if (error instanceof Error) {
        let errorMessage = 'Failed transaction'
        if (error.message.includes('insufficient')) {
          errorMessage = 'Insufficient funds'
        }
        if (error.message.includes('rejected')) {
          errorMessage = 'Transaction rejected'
        }
        toast.error(errorMessage)
        setCurrentStep('review')
        return
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTransactionStatus = (): TransactionStatusType => {
    // If we have a hash, we're at least in progress
    if (transactionHash) {
      if (isSuccess) {
        type AtomCreatedArgs = {
          creator: Address
          atomWallet: Address
          atomData: string
          vaultID: bigint
        }

        if (
          txReceipt &&
          txReceipt?.logs[0].data &&
          txReceipt?.transactionHash !== lastTxHash
        ) {
          const decodedLog = decodeEventLog({
            abi: multivaultAbi,
            data: txReceipt?.logs[2].data,
            topics: txReceipt?.logs[2].topics,
          })

          const event = decodedLog as unknown as {
            eventName: string
            args: AtomCreatedArgs
          }

          if (
            event.eventName === 'AtomCreated' &&
            event.args.creator === (wallet?.address as `0x${string}`)
          ) {
            const vaultId = event.args.vaultID.toString()
            setLastTxHash(txReceipt.transactionHash)

            // Use setTimeout to avoid state updates during render
            setTimeout(() => {
              onCreationSuccess({
                name: atomData?.name ?? '',
                image: atomData?.image,
                vaultId,
              })

              toast.custom(() => (
                <CreateAtomToast
                  id={vaultId}
                  txHash={txReceipt.transactionHash}
                />
              ))
            }, 0)

            return TransactionStatus.complete
          }
        }
        return TransactionStatus.inProgress
      }
      if (isError) {
        reset()
        return TransactionStatus.error
      }
      return TransactionStatus.inProgress
    }

    // No hash yet, but transaction might be starting
    if (awaitingWalletConfirmation) {
      return TransactionStatus.approveTransaction
    }
    if (awaitingOnChainConfirmation) {
      return TransactionStatus.awaiting
    }

    // Default initial state
    return TransactionStatus.awaiting
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'metadata':
        return (
          <SurveyFormContainer
            onSubmit={handleMetadataSubmit}
            isLoading={isPending}
            defaultValues={
              atomData || (initialName ? { name: initialName } : undefined)
            }
          />
        )
      case 'review':
        if (atomData && ipfsUri) {
          return (
            <SurveyDepositForm
              onSubmit={handleDepositSubmit}
              minDeposit={
                (minDeposit && formatUnits(BigInt(minDeposit), 18)) ??
                MIN_DEPOSIT
              }
              isSubmitting={isSubmitting}
              atomData={atomData}
              ipfsUri={ipfsUri}
              isLoadingConfig={isLoadingConfig}
              onBack={() => setCurrentStep('metadata')}
              validationErrors={validationErrors}
              showErrors={showErrors}
            />
          )
        }
        return null
      case 'create':
        return (
          <div className="w-full h-full">
            <TransactionState
              status={getTransactionStatus()}
              txHash={transactionHash as `0x${string}`}
              type="transaction"
              ipfsLink={ipfsUri ? ipfsUrl(ipfsUri) : undefined}
              errorButton={
                <button
                  onClick={() => {
                    updateStepStatus('review', 'current')
                    setCurrentStep('review')
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                >
                  Try Again
                </button>
              }
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full h-full flex flex-col pb-4 border-none bg-transparent">
      <CardHeader className="border-b border-border/10 pb-5 flex-shrink-0">
        <div className="w-full px-5">
          <StepIndicator steps={steps} onStepClick={handleStepClick} />
        </div>
      </CardHeader>
      <div className="flex-1 min-h-0 p-4 overflow-y-hidden">
        {renderCurrentStep()}
      </div>
    </Card>
  )
}
