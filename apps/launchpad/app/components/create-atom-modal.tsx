import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  toast,
  TransactionStatus,
  TransactionStatusType,
} from '@0xintuition/1ui'
import { usePinThingMutation } from '@0xintuition/graphql'

import {
  Atom,
  DepositFormData,
  FormContainer,
  organizationAtomSchema,
  personAtomSchema,
  registerAtomForm,
  thingAtomSchema,
} from '@components/atom-forms'
import CreateAtomToast from '@components/atom-forms/create-toast'
import {
  DepositForm,
  OrganizationForm,
  PersonForm,
  ThingForm,
} from '@components/atom-forms/forms'
import { StepIndicator } from '@components/atom-forms/step-indicator'
import { NewAtomMetadata } from '@components/survey-modal/types'
import { TransactionState } from '@components/transaction-state'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtomMutation } from '@lib/hooks/mutations/useCreateAtomMutation'
import { useCreateAtomConfig } from '@lib/hooks/useCreateAtomConfig'
import { ipfsUrl } from '@lib/utils/app'
import { usePrivy } from '@privy-io/react-auth'
import { ClientOnly } from 'remix-utils/client-only'
import { Address, decodeEventLog, formatUnits, toHex } from 'viem'
import { usePublicClient } from 'wagmi'

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
  { id: 'metadata', label: 'Publish Data', status: 'current' },
  { id: 'deposit', label: 'Select Deposit', status: 'upcoming' },
  { id: 'create', label: 'Create Atom', status: 'upcoming' },
]

export interface CreateIdentityModalProps {
  isOpen?: boolean
  onClose: () => void
  onCreationSuccess: (metadata: NewAtomMetadata) => void
}

export default function CreateIdentityModal({
  isOpen,
  onClose,
  onCreationSuccess,
}: CreateIdentityModalProps) {
  const [currentStep, setCurrentStep] = useState('metadata')
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS)
  const [ipfsUri, setIpfsUri] = useState<string | null>(null)
  const [atomData, setAtomData] = useState<Atom | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [lastTxHash, setLastTxHash] = useState<string | null>(null)

  const { mutateAsync: pinThing, isPending } = usePinThingMutation({
    onError: (error) => {
      console.error('Failed to upload to IPFS:', error)
      // TODO: Show error state in UI
    },
  })

  const { user: privyUser } = usePrivy()
  const { wallet } = privyUser ?? {}
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

      // Move to deposit step
      updateStepStatus('deposit', 'current')
      setCurrentStep('deposit')
    } catch (error) {
      // TODO: Error handled by mutation onError
    }
  }

  const handleDepositSubmit = async (data: DepositFormData) => {
    try {
      setIsSubmitting(true)
      if (!ipfsUri) {
        throw new Error('IPFS CID not found')
      }

      if (!atomCost) {
        throw new Error('Atom cost not found')
      }

      // Don't update step status yet
      // Just move to create step to show transaction UI
      setCurrentStep('create')

      // Wait for transaction to be initiated
      const txHash = await createAtom({
        val:
          (+formatUnits(BigInt(atomCost), 18) + +data.amount).toString() ?? '0',
        uri: toHex(ipfsUri),
        contract: MULTIVAULT_CONTRACT_ADDRESS,
        userWallet: wallet?.address as `0x${string}`,
      })

      // Only update step status after transaction is successfully initiated
      if (publicClient && txHash) {
        // const receipt = await publicClient.waitForTransactionReceipt({
        //   hash: txHash,
        // })
        setTransactionHash(txHash)
        updateStepStatus('deposit', 'completed')
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
        setCurrentStep('deposit')
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

            onCreationSuccess({
              name: atomData?.name ?? '',
              image: atomData?.image ?? '',
              vaultId,
            })

            toast.custom(() => (
              <CreateAtomToast
                id={vaultId}
                txHash={txReceipt.transactionHash}
              />
            ))
            setLastTxHash(txReceipt.transactionHash)
          }
        }
        return TransactionStatus.complete
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
          <FormContainer
            onSubmit={handleMetadataSubmit}
            isLoading={isPending}
            defaultValues={atomData || undefined} // Pass the existing data
          />
        )
      case 'deposit':
        if (atomData && ipfsUri) {
          return (
            <DepositForm
              onSubmit={handleDepositSubmit}
              // minDeposit={atomCost?.formatted ?? '0.1'}
              minDeposit={
                (minDeposit && formatUnits(BigInt(minDeposit), 18)) ??
                MIN_DEPOSIT
              }
              isSubmitting={isSubmitting}
              atomData={atomData}
              ipfsUri={ipfsUri}
              isLoadingConfig={isLoadingConfig}
              onBack={() => setCurrentStep('metadata')}
            />
          )
        }
        return null
      case 'create':
        return (
          <div className="h-full w-full">
            <TransactionState
              status={getTransactionStatus()}
              txHash={transactionHash as `0x${string}`}
              type="transaction"
              ipfsLink={ipfsUri ? ipfsUrl(ipfsUri) : undefined}
              errorButton={
                <button
                  onClick={() => {
                    updateStepStatus('deposit', 'current')
                    setCurrentStep('deposit')
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
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogHeader></DialogHeader>
          <DialogContent className="w-[80vw] max-w-3xl h-[72vh] max-h-[750px] min-h-0 flex flex-col pb-4 bg-gradient-to-br from-[#060504] to-[#101010]">
            <DialogHeader className="border-b border-border/10 pb-5 flex-shrink-0">
              <div className="w-full px-5">
                <StepIndicator
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                />
              </div>
            </DialogHeader>
            <div className="flex-1 min-h-0 p-4 overflow-y-hidden">
              {renderCurrentStep()}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
