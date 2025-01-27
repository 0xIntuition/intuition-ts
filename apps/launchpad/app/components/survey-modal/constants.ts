export const STEPS = {
  // INTRO: 1,
  TOPICS: 1,
  STAKE: 2,
} as const

export type Step = (typeof STEPS)[keyof typeof STEPS]

export const MIN_SELECTIONS = 1
export const MAX_SELECTIONS = 1 // Only one topic can be selected for now

export const INITIAL_TOPICS = [] // We'll populate this from GraphQL query
