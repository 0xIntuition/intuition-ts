import {
  GetQuestResponse,
  QuestNarrative,
  QuestPresenter,
  QuestSortColumn,
  QuestsService,
  QuestStatus,
  SortDirection,
  UserQuest,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import { invariant } from '@lib/utils/misc'
import { fetchWrapper } from '@server/api'
import { User } from 'types'

import { requireUser } from './auth'

export interface QuestProgressProps {
  request: Request
  options?: {
    narrative: QuestNarrative
    active?: boolean
    sortBy?: QuestSortColumn
    direction?: SortDirection
  }
}

export async function getQuestsProgress({
  request,
  options = {
    narrative: QuestNarrative.STANDARD,
    active: true,
    sortBy: QuestSortColumn.POSITION,
    direction: SortDirection.ASC,
  },
}: QuestProgressProps): Promise<{
  user: User
  quests: QuestPresenter[]
  userQuests: UserQuest[]
  numQuests: number
  numCompletedQuests: number
  completedQuestsIds: string[]
  userQuestMap: Record<string, UserQuest>
}> {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet address is required')

  const { narrative, active, sortBy, direction } = options
  const quests = (
    await fetchWrapper(request, {
      method: QuestsService.searchQuests,
      args: {
        requestBody: {
          narrative,
          active,
          sortBy,
          direction,
        },
      },
    })
  ).data
  invariant(quests, 'Failed to fetch quests')

  const { id: userId } = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: user.wallet?.address,
    },
  })

  const userQuests = (
    await fetchWrapper(request, {
      method: UserQuestsService.search,
      args: {
        requestBody: {
          userId,
        },
      },
    })
  ).data

  const userQuestMap = userQuests.reduce(
    (acc, userQuest) => {
      acc[userQuest.quest_id] = userQuest
      return acc
    },
    {} as Record<string, UserQuest>,
  )

  const numQuests = quests.length
  const numCompletedQuests = userQuests.filter(
    (userQuest) =>
      userQuest.status === QuestStatus.COMPLETED &&
      userQuest.user_id === userId,
  ).length

  const completedQuestsIds = userQuests
    .filter(
      (userQuest) =>
        userQuest.status === QuestStatus.COMPLETED &&
        userQuest.user_id === userId,
    )
    .map((userQuest) => userQuest.quest_id)
  return {
    user,
    quests,
    userQuests,
    numQuests,
    numCompletedQuests,
    completedQuestsIds,
    userQuestMap,
  }
}

export async function getUserQuest(
  request: Request,
  questId: string,
): Promise<{
  userQuest: UserQuest
  quest: GetQuestResponse
}> {
  const [quest, userQuest] = await Promise.all([
    fetchWrapper(request, {
      method: QuestsService.getQuest,
      args: {
        questId,
      },
    }),
    fetchWrapper(request, {
      method: UserQuestsService.getUserQuestByQuestId,
      args: {
        questId,
      },
    }),
  ])
  // leave erro handling to implementation
  return {
    userQuest: userQuest ?? null,
    quest: quest ?? null,
  }
}
