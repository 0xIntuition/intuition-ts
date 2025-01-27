import { GetAtomQuery, GetTripleQuery } from '@0xintuition/graphql'

export const STEPS = {
  SIGNAL: 'signal',
  PROCESSING: 'processing',
  FINISHED: 'finished',
} as const

export type StepId = (typeof STEPS)[keyof typeof STEPS]
export type StepStatus = 'upcoming' | 'current' | 'completed'

export type Step = {
  id: StepId
  label: string
  status: StepStatus
}

export interface SignalModalState {
  currentStep: StepId
  ticks: number
  showCreateStep?: boolean
}

export interface SignalModalProps {
  isOpen?: boolean
  onClose: (e?: React.MouseEvent) => void
  vaultId: string
  mode: 'deposit' | 'redeem'
  atom?: GetAtomQuery['atom']
  triple?: GetTripleQuery['triple']
}
