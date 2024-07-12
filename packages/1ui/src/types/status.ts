export const QuestStatus = {
  notStarted: 'not-started',
  inProgress: 'in-progress',
  claimable: 'claimable',
  completed: 'completed',
  disabled: 'disabled',
} as const

export type QuestStatusType = (typeof QuestStatus)[keyof typeof QuestStatus]

export const QuestCriteriaStatus = {
  notStarted: 'not-started',
  partiallyFulfilled: 'partially-fulfilled',
  fulfilled: 'fulfilled',
} as const

export type QuestCriteriaStatusType =
  (typeof QuestCriteriaStatus)[keyof typeof QuestCriteriaStatus]
