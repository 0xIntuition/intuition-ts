import { Question } from '@lib/graphql/types'
import { TripleType } from 'app/types'

import { TransactionStateType } from '../../types/transaction'

export type StepId = 'topics' | 'create' | 'signal' | 'success'

export const STEPS = {
  TOPICS: 'topics' as const,
  CREATE: 'create' as const,
  SIGNAL: 'signal' as const,
  SUCCESS: 'success' as const,
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

export interface QuestState {
  currentStep: StepId
  ticks: number
  showCreateStep: boolean
  selectedTopic?: Topic
  newAtomMetadata?: NewAtomMetadata
}

export interface QuestModalProps {
  isOpen: boolean
  onClose: () => void
  predicateId: number
  objectId: number
  question: Question
  isCompleted?: boolean
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
  isOpen?: boolean
}

export interface SuccessStepProps {
  isOpen: boolean
  selectedTopic: Topic
  newAtomMetadata?: NewAtomMetadata
  txHash?: string
}
