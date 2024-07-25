import { ApiError, QuestStatus, UserQuestsService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '@server/auth'

export type CheckQuestSuccessLoaderData = {
  quest_completion_object_id?: string
  status?: QuestStatus
  success: boolean
}

const RETRY_LIMIT = 10
const RETRY_DELAY = 3000

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const url = new URL(request.url)
  const userQuestId = url.searchParams.get('userQuestId')
  invariant(userQuestId, 'userQuestId is required')

  let attempts = 0

  // poll n number of times
  while (attempts < RETRY_LIMIT) {
    try {
      const userQuest = await fetchWrapper({
        method: UserQuestsService.getUserQuestById,
        args: {
          userQuestId,
        },
      })

      logger(
        'Checking quest_completion_object_id',
        userQuest.quest_completion_object_id,
      )
      if (userQuest.quest_completion_object_id) {
        return json({
          quest_completion_object_id: userQuest.quest_completion_object_id,
          status: userQuest.status,
          success: true,
        } as CheckQuestSuccessLoaderData)
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        logger('UserQuest not found, retrying...')
      } else {
        throw error
      }
    }
    attempts++
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
  }

  return json({
    success: false,
  } as CheckQuestSuccessLoaderData)
}
