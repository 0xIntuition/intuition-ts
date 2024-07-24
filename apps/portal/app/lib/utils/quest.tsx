import { QuestCondition } from '@0xintuition/api'

import { allQuests, QuestContentType } from 'content-collections'

export function getQuestContentBySlug(slug: string): QuestContentType {
  const quest = allQuests.find((quest) => quest.slug === slug)
  if (!quest) {
    throw new Error(`Quest with slug ${slug} not found`)
  }
  return quest
}

export function getQuestCriteria(condition: QuestCondition) {
  switch (condition) {
    case QuestCondition.CREATE_ATOM:
      return 'Create an atom'
    case QuestCondition.STAKE_IDENTITY:
      return 'Stake on an atom'
    case QuestCondition.CREATE_CLAIM:
      return 'Create a claim'
    case QuestCondition.STAKE_CLAIM:
      return 'Stake ETH For a claim'
    case QuestCondition.COUNTER_STAKE_CLAIM:
      return 'Stake ETH Against a claim'
    case QuestCondition.ALWAYS_TRUE:
      return 'Search and explore the intuition knowledge graph'
    default:
      return 'Unknown'
  }
}
