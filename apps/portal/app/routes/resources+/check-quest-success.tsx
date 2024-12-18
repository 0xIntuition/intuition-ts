import {
  ApiError,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { fetchWrapper } from '@server/api'
import { requireUser } from '@server/auth'

export type CheckQuestSuccessLoaderData = {
  quest_completion_object_id?: string
  status?: QuestStatus
  success: boolean
}

const RETRY_LIMIT = 10
const RETRY_DELAY = 3000

// Change to explicit loader function export
export const loader: LoaderFunction = async ({ request }) => {
  console.log('Starting check-quest-success loader - console.log')
  logger('Starting check-quest-success loader - explicit function')
  try {
    const user = await requireUser(request)
    invariant(user, 'Unauthorized')
    invariant(user.wallet?.address, 'User wallet address is required')

    console.log('User authenticated:', { wallet: user.wallet.address })
    logger('Fetching user by wallet', { wallet: user.wallet.address })
    const { id: userId } = await fetchWrapper(request, {
      method: UsersService.getUserByWalletPublic,
      args: {
        wallet: user.wallet?.address,
      },
    })
    logger('Found userId:', userId)

    const url = new URL(request.url)
    const userQuestId = url.searchParams.get('userQuestId')
    logger('Extracted userQuestId from URL:', {
      userQuestId,
      url: url.toString(),
    })
    invariant(userQuestId, 'userQuestId is required')

    logger('Fetching userQuest', { userQuestId })
    const userQuest = await fetchWrapper(request, {
      method: UserQuestsService.getUserQuestById,
      args: {
        userQuestId,
      },
    })
    logger('Found userQuest:', {
      questId: userQuest.quest_id,
      status: userQuest.status,
    })

    let attempts = 0

    while (attempts < RETRY_LIMIT) {
      try {
        logger(`Attempt ${attempts + 1}/${RETRY_LIMIT} to check quest status`, {
          questId: userQuest.quest_id,
          userId,
        })
        const status = await fetchWrapper(request, {
          method: UserQuestsService.checkQuestStatus,
          args: {
            questId: userQuest.quest_id,
            userId,
          },
        })

        logger('Quest status check response:', {
          status,
          questCompletionObjectId: userQuest.quest_completion_object_id,
        })

        if (
          status === QuestStatus.CLAIMABLE ||
          status === QuestStatus.COMPLETED
        ) {
          logger('Quest is claimable/completed, returning success')
          return json({
            quest_completion_object_id: userQuest.quest_completion_object_id,
            status,
            success: true,
          } as CheckQuestSuccessLoaderData)
        }

        logger(`Status not claimable/completed (${status}), retrying...`)
        attempts++
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      } catch (error) {
        logger('Error during quest status check:', {
          error,
          attempt: attempts + 1,
          questId: userQuest.quest_id,
          userId,
        })

        if (error instanceof ApiError && error.status === 404) {
          logger('UserQuest not found error, retrying...', {
            attempt: attempts + 1,
          })
          attempts++
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
        } else {
          throw error
        }
      }
    }

    logger('Retry limit reached without success')
    return json({
      success: false,
    } as CheckQuestSuccessLoaderData)
  } catch (error) {
    logger('Unexpected error in check-quest-success loader:', error)
    // Return error response instead of throwing
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Add default export for the route
export default function CheckQuestSuccess() {
  return null
}
