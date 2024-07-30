import {
  ApiError,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUser } from '@server/auth'

export type CheckQuestSuccessLoaderData = {
  quest_completion_object_id?: string
  status?: QuestStatus
  success: boolean
}

const RETRY_LIMIT = 10
const RETRY_DELAY = 3000

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  invariant(user.wallet?.address, 'User wallet address is required')
  const { id: userId } = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: user.wallet?.address,
    },
  })

  const url = new URL(request.url)
  const userQuestId = url.searchParams.get('userQuestId')
  invariant(userQuestId, 'userQuestId is required')

  const userQuest = await fetchWrapper({
    method: UserQuestsService.getUserQuestById,
    args: {
      userQuestId,
    },
  })

  let attempts = 0

  while (attempts < RETRY_LIMIT) {
    try {
      const status = await fetchWrapper({
        method: UserQuestsService.checkQuestStatus,
        args: {
          questId: userQuest.quest_id,
          userId,
        },
      })

      logger(
        'Checking quest_completion_object_id & status',
        userQuest.quest_completion_object_id,
        status,
      )

      if (
        status === QuestStatus.CLAIMABLE ||
        status === QuestStatus.COMPLETED
      ) {
        logger(
          'quest_completion_object_Id found & status is claimable/completed',
          userQuest.quest_completion_object_id,
        )
        return json({
          quest_completion_object_id: userQuest.quest_completion_object_id,
          status,
          success: true,
        } as CheckQuestSuccessLoaderData)
      }

      attempts++
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        logger('UserQuest not found, retrying...')
        attempts++
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      } else {
        throw error
      }
    }
  }

  return json({
    success: false,
  } as CheckQuestSuccessLoaderData)
}
