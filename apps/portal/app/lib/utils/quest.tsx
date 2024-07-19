import { allQuests, QuestContentType } from 'content-collections'

export function getQuestContentBySlug(slug: string): QuestContentType {
  const quest = allQuests.find((quest) => quest.slug === slug)
  if (!quest) {
    throw new Error(`Quest with slug ${slug} not found`)
  }
  return quest
}
