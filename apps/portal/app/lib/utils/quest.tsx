// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck content-collections folder is not available at build time
import { QuestCondition } from '@0xintuition/api'

import { allQuests, QuestContentType } from 'content-collections'

export function getQuestContentBySlug(slug: string): QuestContentType | null {
  const quest = allQuests.find((quest) => quest.slug === slug)
  if (!quest) {
    return null
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

export const QuestRouteId = {
  CREATE_ATOM: '1-1-create_atom',
  STAKE_IDENTITY: '1-2-stake_identity',
  CREATE_CLAIM: '1-3-create_claim',
  STAKE_CLAIM: '1-4-stake_claim',
  COUNTER_STAKE_CLAIM: '1-5-counter_stake_claim',
  ALWAYS_TRUE: '1-6-always_true',
} as const

export type QuestRouteIdType = (typeof QuestRouteId)[keyof typeof QuestRouteId]

export function getQuestId(routeId: string) {
  switch (routeId) {
    case QuestRouteId.CREATE_ATOM:
      return 'b4b7e0ed-a69a-4a0a-bf9b-8bf0afe979f9'
    case QuestRouteId.STAKE_IDENTITY:
      return '3b5315bb-f29b-4320-9997-6928b4bbf3e9'
    case QuestRouteId.CREATE_CLAIM:
      return 'dacdd63d-f978-433e-aeb0-54d165e8f936'
    case QuestRouteId.STAKE_CLAIM:
      return 'ac22e180-9923-4481-9cba-31e88f223e58'
    case QuestRouteId.COUNTER_STAKE_CLAIM:
      return '89ef2072-2428-4695-994e-3c83c3f7f3be'
    case QuestRouteId.ALWAYS_TRUE:
      return '90cf4398-f7e5-4ec7-8088-c64d2da6a715'
    default:
      return null
  }
}
