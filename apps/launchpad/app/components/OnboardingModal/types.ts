export interface SubTopic {
  id: string
  name: string
  selected: boolean
  imageUrl?: string
}

export interface Topic {
  id: string
  type: string
  name: string
  selected: boolean
  imageUrl?: string
  subTopics: SubTopic[]
}

export interface PreferenceSubmission {
  topicId: string
  subTopics: string[]
}

export interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}
