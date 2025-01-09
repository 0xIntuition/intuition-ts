export const STEPS = {
  INTRO: 1,
  TOPICS: 2,
  SUBTOPICS: 3,
  SUMMARY: 4,
} as const

export const MIN_SELECTIONS = 1
export const MAX_SELECTIONS = 5

export const INITIAL_TOPICS = [
  {
    id: 'sports',
    type: 'Category',
    name: 'Sports',
    selected: false,
    subTopics: [
      { id: 'nfl-ravens', name: 'Baltimore Ravens', selected: false },
      { id: 'nba-warriors', name: 'Golden State Warriors', selected: false },
      { id: 'soccer-arsenal', name: 'Arsenal FC', selected: false },
    ],
  },
  {
    id: 'crypto',
    type: 'Category',
    name: 'Cryptocurrency',
    selected: false,
    subTopics: [
      { id: 'btc', name: 'Bitcoin', selected: false },
      { id: 'eth', name: 'Ethereum', selected: false },
      { id: 'sol', name: 'Solana', selected: false },
    ],
  },
  {
    id: 'tech',
    type: 'Category',
    name: 'Technology',
    selected: false,
    subTopics: [
      { id: 'ai', name: 'Artificial Intelligence', selected: false },
      { id: 'web3', name: 'Web3', selected: false },
      { id: 'cloud', name: 'Cloud Computing', selected: false },
    ],
  },
  {
    id: 'daos',
    type: 'Category',
    name: 'DAOs',
    selected: false,
    subTopics: [
      { id: 'maker', name: 'MakerDAO', selected: false },
      { id: 'ens', name: 'ENS', selected: false },
      { id: 'aave', name: 'Aave', selected: false },
    ],
  },
]
