import { QuestStatus, UserQuestsService } from '@0xintuition/api'

import { fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '@server/auth'

export type GetQuestStatusLoaderData = {
  quest_completion_object_id: string
  status: QuestStatus
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const url = new URL(request.url)
  const userQuestId = url.searchParams.get('userQuestId')
  invariant(userQuestId, 'userQuestId is required')

  const userQuest = await fetchWrapper({
    method: UserQuestsService.getUserQuestById,
    args: {
      userQuestId,
    },
  })

  return json({
    quest_completion_object_id: userQuest.quest_completion_object_id,
    status: userQuest.status,
  } as GetQuestStatusLoaderData)
}
