export const QUESTIONS_METADATA = {
  ONE: {
    title: 'What is your preferred Web3 Wallet?',
    description: 'Select your preferred wallet from the list below.',
  },
  TWO: {
    title: 'Coming Soon',
    description: 'More questions are on the way!',
  },
} as const

export const QUESTS = [
  {
    title: 'What are your preferences?',
    description: 'Answer questions about your preferences to earn IQ!',
    link: '/quests/questions',
    enabled: true,
    index: 1,
  },
  {
    title: 'What are your preferences?',
    description: 'Answer questions about your preferences to earn IQ!',
    link: '/quests/preferences',
    enabled: false,
    index: 2,
  },
]
