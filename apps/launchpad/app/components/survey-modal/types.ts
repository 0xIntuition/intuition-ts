import { Question } from '@lib/graphql/types'
import { TripleType } from 'app/types'

import { TransactionStateType } from '../../types/transaction'

export type StepId = 'topics' | 'create' | 'signal' | 'reward'

export const STEPS = {
  TOPICS: 'topics' as const,
  CREATE: 'create' as const,
  SIGNAL: 'signal' as const,
  REWARD: 'reward' as const,
} as const

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
  selected: boolean
  triple?: TripleType
  totalSignals?: number
}

export interface NewAtomMetadata {
  name: string
  image?: string
  vaultId: string
}

export interface OnboardingState {
  currentStep: StepId
  ticks: number
  showCreateStep: boolean
  selectedTopic?: Topic
  newAtomMetadata?: NewAtomMetadata
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
  objectLabel: string
  setTxState: (state: TransactionStateType) => void
  onStakingSuccess: (subject_id: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isOpen: boolean
}
