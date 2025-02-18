import { AtomType, TripleType } from 'app/types'

export const STEPS = {
  SIGNAL: 'signal',
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
  showCreateStep?: boolean
}

export interface SignalModalProps {
  isOpen: boolean
  onClose: () => void
  atom?: AtomType
  triple?: TripleType
  vaultId: string
  mode: 'deposit' | 'redeem'
  setMode: (mode: 'deposit' | 'redeem') => void
  initialTicks?: number
}
