import {
  Button,
  ButtonVariant,
  Icon,
  IconName,
  ProgressCard,
  Text,
} from '@0xintuition/1ui'
import {
  QuestNarrative,
  QuestPresenter,
  QuestStatus,
  UserQuestsService,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { QuestCard } from '@components/quest/quest-card'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { getQuestCriteria } from '@lib/utils/quest'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { Link, useLoaderData, useSubmit } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser } from '@server/auth'
import { getQuestsProgress } from '@server/quest'
import { STANDARD_QUEST_SET } from 'app/consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, 'id is required')

  const details = await getQuestsProgress({
    request,
    options: {
      narrative: QuestNarrative.STANDARD,
    },
  })

  return json({
    ...details,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'Unauthorized')

  const formData = await request.formData()
  const questId = String(formData.get('questId'))
  invariant(questId, 'questId is required')
  const redirectTo = String(formData.get('redirectTo'))
  invariant(redirectTo, 'redirectTo is required')
  const questStatus = formData.get('questStatus') as QuestStatus
  invariant(questStatus, 'questStatus is required')
  const available = formData.get('available') === 'true'

  // start quest
  if (questStatus === QuestStatus.NOT_STARTED && available) {
    logger('Starting quest', questId)
    const { status } = await fetchWrapper(request, {
      method: UserQuestsService.startQuest,
      args: {
        questId,
      },
    })
    logger('Started quest', questId, status)
  }
  return redirect(`/app/quest/chapter/${redirectTo}`)
}

export default function Quests() {
  const {
    quests,
    numQuests,
    numCompletedQuests,
    userQuestMap,
    completedQuestsIds,
  } = useLoaderData<typeof loader>()
  const submit = useSubmit()

  function isQuestAvailable(quest: QuestPresenter) {
    if (!quest.depends_on_quest) {
      return true
    }
    return completedQuestsIds.includes(quest.depends_on_quest) ?? false
  }

  function getUserQuestStatus(quest: QuestPresenter) {
    return userQuestMap[quest.id]?.status ?? QuestStatus.NOT_STARTED
  }

  async function handleClick({
    questId,
    redirectTo,
    status,
    available,
  }: {
    questId: string
    redirectTo: string
    status: QuestStatus
    available: boolean
  }) {
    const formData = new FormData()
    formData.append('questId', questId)
    formData.append('redirectTo', redirectTo)
    formData.append('questStatus', status)
    formData.append('available', available.toString())
    submit(formData, { method: 'post' })
  }

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10 pb-20 max-lg:p-0 max-md:gap-4">
      <div className="space-y-10 mb-5 max-md:space-y-5">
        <img
          src={STANDARD_QUEST_SET.imgSrc}
          alt={STANDARD_QUEST_SET.title}
          className="object-cover object-center w-full h-[350px] theme-border rounded-lg max-md:h-[250px]"
        />
        <div className="flex flex-col gap-5 max-md:gap-3">
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
        <Text variant="headline" id="chapters">
          Chapters
        </Text>

        <div className="flex flex-col gap-10">
          {quests.map((quest) => {
            const available = isQuestAvailable(quest)
            const userQuestStatus = getUserQuestStatus(quest)
            return (
              <QuestCard
                key={`${quest.id}-quest-card`}
                imgSrc={quest.image}
                title={quest.title ?? ''}
                description={quest.description ?? ''}
                questStatus={userQuestStatus}
                label={`Chapter ${quest.position}`}
                points={quest.points}
                questCriteria={getQuestCriteria(quest.condition)}
                disabled={!available}
                id={quest.id}
                handleClick={(e) => {
                  e.preventDefault()
                  handleClick({
                    questId: quest.id,
                    redirectTo: `${quest.narrative === 'Standard' ? '1' : '2'}-${
                      quest.position
                    }-${quest.condition}`,
                    status: userQuestStatus ?? QuestStatus.NOT_STARTED,
                    available,
                  })
                }}
              />
            )
          })}
        </div>
        <QuestCard
          key={`${'test'}-quest-card`}
          imgSrc={quests[0].image}
          title={'Test Quest'}
          description={'Quest to test success modal + help with handoff'}
          questStatus={getUserQuestStatus(quests[0])}
          label={`Chapter ${quests[0].position}`}
          points={quests[0].points}
          questCriteria={getQuestCriteria(quests[0].condition)}
          disabled={false}
          handleClick={(e) => {
            e.preventDefault()
            handleClick({
              questId: quests[0].id,
              redirectTo: `1-7-test_atom`,
              status: getUserQuestStatus(quests[0]),
              available: true,
            })
          }}
        />
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="quest/narrative/$id" />
}
