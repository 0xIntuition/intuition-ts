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

export function getQuestImage(questId: string) {
  switch (questId) {
    case 'b4b7e0ed-a69a-4a0a-bf9b-8bf0afe979f9':
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/create-atom.png'
    case '3b5315bb-f29b-4320-9997-6928b4bbf3e9':
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/stake-atom.png'
    case 'dacdd63d-f978-433e-aeb0-54d165e8f936':
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/create-claim.png'
    case 'ac22e180-9923-4481-9cba-31e88f223e58':
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/stake-claim.png'
    case 'daa5d6ff-9a8b-41c6-a259-302816655c5b':
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/counter-stake-claim.png'
    case '90cf4398-f7e5-4ec7-8088-c64d2da6a715':
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/discovery.png'
    default:
      return 'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1721799356/Portal%20Assets/quests/create-atom.png'
  }
}
