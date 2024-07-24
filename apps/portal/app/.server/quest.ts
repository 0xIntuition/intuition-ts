import { QuestNarrative, QuestsService, QuestStatus } from '@0xintuition/api'

import { fetchWrapper } from './../lib/utils/misc'

export async function fetchQuestNarrativeProgress(
  narrative: QuestNarrative,
): Promise<{
  numQuests: number
  numCompletedQuests: number
}> {
  const { data } = await fetchWrapper({
    method: QuestsService.searchQuests,
    args: {
      requestBody: {
        narrative,
        active: true,
      },
    },
  })
  const numQuests = data.length
  const numCompletedQuests = data.filter(
    (quest) => quest.status === QuestStatus.COMPLETED,
  ).length
  return {
    numQuests,
    numCompletedQuests,
  }
}
