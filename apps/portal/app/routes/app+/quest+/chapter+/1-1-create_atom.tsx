import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Text,
} from '@0xintuition/1ui'
import {
  IdentitiesService,
  IdentityPresenter,
  QuestsService,
  QuestStatus,
  UserQuestsService,
} from '@0xintuition/api'

import questPlaceholder from '@assets/quest-placeholder.png'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import QuestStatusCard from '@components/quest/quest-status-card'
import { MDXContent } from '@content-collections/mdx/react'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import {
  getQuestContentBySlug,
  getQuestCriteria,
  getQuestId,
  QuestRouteId,
} from '@lib/utils/quest'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { requireUserId } from '@server/auth'

const ROUTE_ID = QuestRouteId.CREATE_ATOM

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const quest = await fetchWrapper({
    method: QuestsService.getQuest,
    args: {
      questId: id,
    },
  })
  const userQuests = (
    await fetchWrapper({
      method: UserQuestsService.search,
      args: {
        requestBody: {
          questId: id,
        },
      },
    })
  ).data

  const userQuest = userQuests.find((userQuest) => userQuest.quest_id === id)
  logger('Fetched user quest', userQuest)

  let identity: IdentityPresenter | undefined
  if (userQuest && userQuest.quest_completion_object_id) {
    identity = await fetchWrapper({
      method: IdentitiesService.getIdentityById,
      args: {
        id: userQuest.quest_completion_object_id,
      },
    })
    logger('Fetched identity', identity)
  }

  const questIntro = getQuestContentBySlug(`${quest.id}-intro`)
  const questContent = getQuestContentBySlug(`${quest.id}-main`)
  const questClosing = getQuestContentBySlug(`${quest.id}-closing`)
  return json({
    quest,
    questIntro,
    questContent,
    questClosing,
    userQuest,
    identity,
  })
}

export default function Quests() {
  const { quest, questIntro, questContent, questClosing, userQuest, identity } =
    useLoaderData<typeof loader>()
  console.log('identity', identity)

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-10 mb-5">
        <img
          src={quest.image ?? questPlaceholder}
          alt={'quest hero'}
          className="object-cover w-full h-[350px] border-x border-b border-border/20 rounded-b-lg"
        />
        <div className="flex flex-col gap-10">
          <Link to="/app/quest/narrative/0">
            <Button variant={ButtonVariant.secondary} className="w-fit">
              <div className="flex items-center gap-2">
                <Icon name={IconName.arrowLeft} />
              </div>
            </Button>
          </Link>
          <div className="flex items-bottom justify-between w-full">
            <Text variant="heading4" weight="medium">
              {quest.title}
            </Text>
            <QuestStatusCard
              status={userQuest?.status ?? QuestStatus.NOT_STARTED}
            />
          </div>

          {questIntro?.body && <MDXLoreWrapper code={questIntro.body} />}
          <QuestCriteriaCard
            criteria={getQuestCriteria(quest.condition)}
            questStatus={userQuest?.status ?? QuestStatus.NOT_STARTED}
            points={quest.points}
          />
        </div>
        {questContent?.body && <MDXContentWrapper code={questContent.body} />}
        <div className="bg-warning/5 rounded-lg theme-border p-5 flex justify-center align-items h-96 border-warning/30 border-dashed text-warning/30 text-bold">
          Quest Activity
        </div>
        {questClosing?.body && userQuest?.status === QuestStatus.COMPLETED && (
          <div className="flex flex-col gap-5 py-5">
            <MDXContentWrapper code={questClosing.body} />
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full gap-2 pb-20">
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            disabled={userQuest?.status !== QuestStatus.CLAIMABLE}
          >
            Complete Quest
          </Button>
          <Text variant="bodyLarge" className="text-foreground/50">
            +{quest.points} Points
          </Text>
        </div>
      </div>
    </div>
  )
}

export function MDXContentWrapper({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-5 py-5">
      <MDXContent
        code={code}
        components={{
          h1: (props) => <Text variant="headline" weight="medium" {...props} />,
          p: (props) => (
            <Text
              variant="bodyLarge"
              className="text-foreground/50"
              {...props}
            />
          ),
        }}
      />
    </div>
  )
}

export function MDXLoreWrapper({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-2">
      <MDXContent
        code={code}
        components={{
          h1: (props) => <Text variant="headline" weight="medium" {...props} />,
          p: (props) => (
            <Text
              variant="bodyLarge"
              className="text-foreground/50"
              {...props}
            />
          ),
        }}
      />
    </div>
  )
}
