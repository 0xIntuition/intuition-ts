import * as React from 'react'
import { useState } from 'react'

import { useUploadThingMutation } from '@0xintuition/graphql'

import { useAtomCost } from '@lib/hooks/useAtomCost'

import { FormContainer } from '../../components/atom-forms/form-container'
import {
  DepositForm,
  OrganizationForm,
  PersonForm,
  ThingForm,
} from '../../components/atom-forms/forms'
import { registerAtomForm } from '../../components/atom-forms/registry'
import { StepIndicator } from '../../components/atom-forms/step-indicator'
import {
  Atom,
  DepositFormData,
  organizationAtomSchema,
  personAtomSchema,
  thingAtomSchema,
} from '../../components/atom-forms/types'

// Register all form types
registerAtomForm('Person', {
  schema: personAtomSchema,
  component: PersonForm,
})

registerAtomForm('Thing', {
  schema: thingAtomSchema,
  component: ThingForm,
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
  { id: 'metadata', label: 'Metadata', status: 'current' },
  { id: 'ipfs', label: 'Upload', status: 'upcoming' },
  { id: 'deposit', label: 'Deposit', status: 'upcoming' },
  { id: 'create', label: 'Create', status: 'upcoming' },
]

export default function FormsPage() {
  const [currentStep, setCurrentStep] = useState('metadata')
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS)
  const [ipfsCid, setIpfsCid] = useState<string | null>(null)
  const [atomData, setAtomData] = useState<Atom | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutateAsync: uploadThing, isPending } = useUploadThingMutation({
    onError: (error) => {
      console.error('Failed to upload to IPFS:', error)
      // TODO: Show error state in UI
    },
  })

  const { data: atomCost, isLoading: isLoadingCost } = useAtomCost()

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
    )
  }

  const handleMetadataSubmit = async (data: Atom) => {
    try {
      // Start IPFS upload
      updateStepStatus('metadata', 'completed')
      updateStepStatus('ipfs', 'current')

      const result = await uploadThing({
        name: data.name,
        description: data.description,
        image: data.image,
        url: data.url,
      })

      setIpfsCid(result.uploadThing?.cid ?? null)
      setAtomData(data)

      // Move to deposit step
      updateStepStatus('ipfs', 'completed')
      updateStepStatus('deposit', 'current')
      setCurrentStep('deposit')
    } catch (error) {
      // TODO: Error handled by mutation onError
    }
  }

  const handleDepositSubmit = async (data: DepositFormData) => {
    try {
      setIsSubmitting(true)
      updateStepStatus('deposit', 'completed')
      updateStepStatus('create', 'current')

      // Mock transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // TODO: Handle on-chain transaction
      console.log('Creating atom with:', {
        metadata: atomData,
        ipfsCid,
        deposit: data,
      })

      setCurrentStep('create')
    } catch (error) {
      console.error('Failed to create atom:', error)
      // TODO: Show error state in UI
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      {currentStep === 'metadata' && (
        <FormContainer onSubmit={handleMetadataSubmit} isLoading={isPending} />
      )}
      {currentStep === 'deposit' && atomData && ipfsCid && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg max-w-xl w-full p-6">
            <DepositForm
              onSubmit={handleDepositSubmit}
              minDeposit={atomCost?.formatted ?? '0.1'}
              isSubmitting={isSubmitting}
              atomData={atomData}
              ipfsCid={ipfsCid}
              isLoadingCost={isLoadingCost}
            />
          </div>
        </div>
      )}
    </div>
  )
}
