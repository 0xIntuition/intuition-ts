import { useState } from 'react'

import { Button, Card, CardHeader, StepIndicator } from '@0xintuition/1ui'

import { useCreateAtomMutation } from '../../lib/hooks/mutations/useCreateAtomMutation'
import { useCreateAtomConfig } from '../../lib/hooks/useCreateAtomConfig'
import { DepositForm } from '../atom-forms/forms/deposit-form'
import { OrganizationForm } from '../atom-forms/forms/organization-form'
import { PersonForm } from '../atom-forms/forms/person-form'
import { ThingForm } from '../atom-forms/forms/thing-form'
import { type Atom, type DepositFormData } from '../atom-forms/types'
import { TransactionState } from '../transaction-state'

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

interface CreateStepProps {
  onSuccess: (identity: Atom) => void
  onCancel: () => void
  setIsTransactionStarted: (isStarted: boolean) => void
  wallet: `0x${string}`
}

export function CreateStep({
  onSuccess,
  onCancel,
  setIsTransactionStarted,
}: CreateStepProps) {
  const [currentStep, setCurrentStep] = useState('metadata')
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS)
  const [selectedType, setSelectedType] = useState<Atom['type'] | null>(null)
  const [formData, setFormData] = useState<Partial<Atom>>({})
  const [depositData, setDepositData] = useState<DepositFormData | undefined>()
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  const { data: config } = useCreateAtomConfig()
  const createAtom = useCreateAtomMutation()

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
    )
  }

  const handleTypeSelect = (type: Atom['type']) => {
    setSelectedType(type)
    setCurrentStep('form')
    updateStepStatus('metadata', 'completed')
    updateStepStatus('review', 'current')
  }

  const handleFormSubmit = async (data: Atom) => {
    setFormData(data)
    setCurrentStep('review')
    updateStepStatus('review', 'completed')
    updateStepStatus('create', 'current')
    setIsTransactionStarted(true)
  }

  const handleDepositSubmit = async (data: DepositFormData) => {
    setDepositData(data)
    try {
      const result = await createAtom.mutateAsync({
        val: data.amount,
        uri: JSON.stringify(formData),
      })

      if (typeof result === 'string') {
        setTransactionHash(result)
      }
      setCurrentStep('create')
      onSuccess(formData as Atom)
    } catch (error) {
      console.error('Failed to create atom:', error)
      setCurrentStep('review')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'metadata':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Type</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Button
                variant="outline"
                onClick={() => handleTypeSelect('Thing')}
                className="h-24"
              >
                Thing
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTypeSelect('Person')}
                className="h-24"
              >
                Person
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTypeSelect('Organization')}
                className="h-24"
              >
                Organization
              </Button>
            </div>
          </div>
        )
      case 'form':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Create {selectedType}</h2>
            {selectedType === 'Thing' && (
              <ThingForm onSubmit={handleFormSubmit} defaultValues={formData} />
            )}
            {selectedType === 'Person' && (
              <PersonForm
                onSubmit={handleFormSubmit}
                defaultValues={formData}
              />
            )}
            {selectedType === 'Organization' && (
              <OrganizationForm
                onSubmit={handleFormSubmit}
                defaultValues={formData}
              />
            )}
          </div>
        )
      case 'review':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Deposit</h2>
            <DepositForm
              onSubmit={handleDepositSubmit}
              defaultValues={depositData}
              minDeposit={Number(config?.minDeposit ?? 0)}
            />
          </div>
        )
      case 'create':
        return (
          <div className="w-full h-full">
            <TransactionState
              status={createAtom.isSuccess ? 'complete' : 'awaiting'}
              txHash={transactionHash as `0x${string}`}
              type="identity"
              errorButton={
                <Button
                  onClick={() => {
                    updateStepStatus('review', 'current')
                    setCurrentStep('review')
                  }}
                  variant="destructive"
                >
                  Try Again
                </Button>
              }
            />
          </div>
        )
    }
  }

  return (
    <Card className="w-full h-full flex flex-col pb-4 border-none bg-transparent">
      <CardHeader className="border-b border-border/10 pb-5 flex-shrink-0">
        <div className="w-full px-5">
          <StepIndicator steps={steps} onStepClick={() => {}} />
        </div>
      </CardHeader>
      <div className="flex-1 min-h-0 p-4 overflow-y-hidden">
        {renderStep()}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  )
}
