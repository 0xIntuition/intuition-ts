export const QuestStatus = {
  notStarted: 'not-started',
  inProgress: 'in-progress',
  claimable: 'claimable',
  completed: 'completed',
} as const

export type QuestStatusType = (typeof QuestStatus)[keyof typeof QuestStatus]
