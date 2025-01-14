import { GetTripleQuery } from '@0xintuition/graphql'

import { TransactionStateType } from 'app/types/transaction'

export interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  // TODO: Add object ID once we figure out how this is being accessed, so that we don't have to hardcode it in the component.
}

export interface Topic {
  id: string
  name: string
  image?: string
  selected: boolean
  triple: GetTripleQuery['triple']
}

export interface OnboardingState {
  currentStep: number
  selectedTopic?: Topic
  ticks: number
}

export interface StakeStepProps {
  selectedTopic: Topic
  ticks: number
  val: string
  walletBalance: string
  onTicksChange: (ticks: number) => void
  onStake: () => Promise<void>
  onBack: () => void
  isLoading: boolean
  validationErrors: string[]
  showErrors: boolean
  txState: TransactionStateType
}
