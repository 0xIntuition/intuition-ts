import { Question } from '@lib/graphql/types'
import { TripleType } from 'app/types'

import { TransactionStateType } from '../../types/transaction'

export const STEPS = {
  TOPICS: 'topics',
  CREATE: 'create',
  SIGNAL: 'signal',
  REWARD: 'reward',
} as const

export type StepId = (typeof STEPS)[keyof typeof STEPS]
export type StepStatus = 'upcoming' | 'current' | 'completed'

export type Step = {
  id: StepId
  label: string
  status: StepStatus
}

export interface Topic {
  id: string
  name: string
  image?: string
  triple?: TripleType
  selected: boolean
}

export interface NewAtomMetadata {
  name: string
  image?: string
  vaultId: string
}

export interface OnboardingState {
  currentStep: StepId
  ticks: number
  selectedTopic?: Topic
  newAtomMetadata?: NewAtomMetadata
  showCreateStep?: boolean
}

export interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  predicateId: number
  objectId: number
  question: Question
}

export interface SignalStepProps {
  selectedTopic: Topic | undefined
  newAtomMetadata?: NewAtomMetadata
  predicateId: number
  objectId: number
  setTxState: (state: TransactionStateType) => void
  onStakingSuccess: (subject_id: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}
