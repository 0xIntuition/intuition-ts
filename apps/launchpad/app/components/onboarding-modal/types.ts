import { GetTripleQuery } from '@0xintuition/graphql'

import { TransactionStateType } from 'app/types/transaction'

export interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
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
