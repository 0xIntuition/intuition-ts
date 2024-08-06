import { useEffect } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  QuestsService,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import {
  Header,
  Hero,
  MDXContentView,
  QuestBackButton,
} from '@components/quest/detail/layout'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import { QuestPointsDisplay } from '@components/quest/quest-points-display'
import { useQuestMdxContent } from '@lib/hooks/useQuestMdxContent'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestId, QuestRouteId } from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  useFetcher,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react'
import { CheckQuestSuccessLoaderData } from '@routes/resources+/check-quest-success'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserId } from '@server/auth'
import { MDXContentVariant } from 'types'

const ROUTE_ID = QuestRouteId.ALWAYS_TRUE

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  invariant(user.wallet?.address, 'User wallet is required')

  const quest = await fetchWrapper(request, {
    method: QuestsService.getQuest,
    args: {
      questId: id,
    },
  })
  const { id: userId } = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: user.wallet.address,
    },
  })

  const userQuest = await fetchWrapper(request, {
    method: UserQuestsService.getUserQuestByQuestId,
    args: {
      questId: id,
    },
  })
  const status = await fetchWrapper(request, {
    method: UserQuestsService.checkQuestStatus,
    args: {
      questId: id,
      userId,
    },
  })
  if (
    status === QuestStatus.CLAIMABLE &&
    userQuest.status !== QuestStatus.COMPLETED
  ) {
    logger('Setting user quest status to claimable', status)
    userQuest.status = QuestStatus.CLAIMABLE
  }

  logger('Fetched user quest', userQuest)

  logger('Fetched user quest status', status)

  return json({
    quest,
    userQuest,
    userWallet: user.wallet?.address,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const formData = await request.formData()
  const questId = formData.get('questId') as string

  try {
    const updatedUserQuest = await fetchWrapper(request, {
      method: UserQuestsService.completeQuest,
      args: {
        questId,
      },
    })
    if (updatedUserQuest.status === QuestStatus.COMPLETED) {
      return json({ success: true })
    }
  } catch (error) {
    logger('Error completing quest', error)
    return json({ success: false })
  }

  return json({ success: false })
}

export default function Quests() {
  const { quest, userQuest } = useLoaderData<typeof loader>()
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest.id)

  const fetcher = useFetcher<CheckQuestSuccessLoaderData>()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      logger('Fetched fetcher', fetcher.data)
      if (fetcher.data.success) {
        logger('Detected quest completion object id')
        logger('Revalidating')
        revalidate()
      }
    }
  }, [fetcher.data, fetcher.state, revalidate])

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-10 mb-5">
        <Hero imgSrc={quest.image} />
        <div className="flex flex-col gap-10">
          <QuestBackButton />
          <Header title={quest.title} questStatus={userQuest?.status} />
          <MDXContentView body={introBody} variant={MDXContentVariant.LORE} />
          <QuestCriteriaCard
            criteria={getQuestCriteria(quest.condition)}
            questStatus={userQuest?.status ?? QuestStatus.NOT_STARTED}
            points={quest.points}
          />
        </div>
        <MDXContentView body={mainBody} />
        <div className="bg-warning/5 rounded-lg theme-border p-5 flex justify-center align-items h-96 border-warning/30 border-dashed text-warning/30 text-bold">
          Quest Activity
        </div>

        <MDXContentView
          body={closingBody}
          variant={MDXContentVariant.LORE}
          shouldDisplay={
            userQuest?.status === QuestStatus.CLAIMABLE ||
            userQuest?.status === QuestStatus.COMPLETED
          }
        />

        <div className="flex flex-col items-center justify-center w-full gap-2 pb-20">
          <Form method="post">
            <input type="hidden" name="questId" value={quest.id} />
            <Button
              type="submit"
              variant={ButtonVariant.primary}
              size={ButtonSize.lg}
              disabled={userQuest?.status !== QuestStatus.CLAIMABLE}
            >
              {userQuest?.status === QuestStatus.COMPLETED
                ? 'Complete'
                : 'Complete Quest'}
            </Button>
          </Form>
          <QuestPointsDisplay
            points={quest.points}
            questStatus={userQuest?.status ?? QuestStatus.NOT_STARTED}
          />
        </div>
      </div>
    </div>
  )
}
