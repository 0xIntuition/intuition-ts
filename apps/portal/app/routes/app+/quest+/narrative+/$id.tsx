import {
  Button,
  ButtonVariant,
  Icon,
  IconName,
  ProgressCard,
  Text,
} from '@0xintuition/1ui'
import {
  QuestsService,
  QuestStatus,
  UserQuest,
  UserQuestsService,
} from '@0xintuition/api'

import { QuestCard } from '@components/quest/quest-card'
import { STANDARD_QUEST_SET } from '@lib/utils/constants/quest'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestImage } from '@lib/utils/quest'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { requireUserId } from '@server/auth'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, 'id is required')
  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const quests = (
    await fetchWrapper({
      method: QuestsService.searchQuests,
      args: {
        requestBody: {
          narrative: 'Standard',
          active: true,
        },
      },
    })
  ).data
  logger('Fetched quest', quests)

  const userQuests = (
    await fetchWrapper({
      method: UserQuestsService.search,
      args: {
        requestBody: {
          userId,
          narrative: 'Standard',
        },
      },
    })
  ).data
  // create a mapping of questId to userQuests
  const questToUserQuestMap = new Map<string, UserQuest>()
  userQuests.forEach((userQuest) => {
    questToUserQuestMap.set(userQuest.id, userQuest)
  })
  const numQuests = quests.length
  const numCompletedQuests = Object.values(questToUserQuestMap).filter(
    (userQuest) => userQuest.status === QuestStatus.COMPLETED,
  ).length
  logger('User Quest Map', questToUserQuestMap)

  return json({ quests, numQuests, numCompletedQuests })
}

export default function Quests() {
  const { quests, numQuests, numCompletedQuests } =
    useLoaderData<typeof loader>()

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
      <div className="space-y-10 mb-5">
        <img
          src={STANDARD_QUEST_SET.imgSrc}
          alt={STANDARD_QUEST_SET.title}
          className="object-cover object-bottom w-full h-[350px] border-x border-b border-border/20 rounded-b-lg"
        />
        <div className="flex flex-col gap-5">
          <Link to="/app/quest">
            <Button variant={ButtonVariant.secondary} className="w-fit">
              <div className="flex items-center gap-2">
                <Icon name={IconName.arrowLeft} />
              </div>
            </Button>
          </Link>
          <div className="flex flex-col gap-2">
            <Text variant="heading4" weight="medium">
              {STANDARD_QUEST_SET.title}
            </Text>
            <Text variant="bodyLarge" className="text-foreground/50">
              {STANDARD_QUEST_SET.summary}
            </Text>
          </div>
          <ProgressCard
            title="Quest Progress"
            numberCompleted={numCompletedQuests}
            numberTotal={numQuests}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Text variant="headline">Chapters</Text>

        <div className="flex flex-col gap-10">
          {quests.map((quest, i) => {
            // check if userQuestMap is empty, if it is, the quest hasnt started

            return (
              <Link
                to={`/app/quest/chapter/${quest.id}`}
                key={`${quest.id}-quest-card`}
              >
                <div>
                  <QuestCard
                    imgSrc={getQuestImage(quest.id)} // TODO: Replace me post image population
                    title={quest.title ?? ''}
                    description={quest.description ?? ''}
                    questStatus={quest.status}
                    label={`Chapter ${i + 1}`} // TODO: Replace me post position population
                    points={quest.points}
                    questCriteria={getQuestCriteria(quest.condition)}
                    disabled={false} // TODO: Replace me post quest dependency population
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
