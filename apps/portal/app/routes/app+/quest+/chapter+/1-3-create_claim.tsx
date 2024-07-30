import { useEffect, useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  QuestsService,
  QuestStatus,
  UserQuestsService,
} from '@0xintuition/api'

import CreateClaimModal from '@components/create-claim-modal'
import CreateClaimActivity from '@components/quest/activities/create-claim-activity'
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
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestId, QuestRouteId } from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  useFetcher,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react'
import { CheckQuestSuccessLoaderData } from '@routes/resources+/check-quest-success'
import { requireUser, requireUserId } from '@server/auth'
import { MDXContentVariant } from 'types'

const ROUTE_ID = QuestRouteId.CREATE_CLAIM

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')

  const quest = await fetchWrapper({
    method: QuestsService.getQuest,
    args: {
      questId: id,
    },
  })
  const userQuest = await fetchWrapper({
    method: UserQuestsService.getUserQuestByQuestId,
    args: {
      questId: id,
    },
  })
  logger('Fetched user quest', userQuest)

  let claim: ClaimPresenter | undefined
  if (userQuest && userQuest.quest_completion_object_id) {
    claim = await fetchWrapper({
      method: ClaimsService.getClaimById,
      args: {
        id: userQuest.quest_completion_object_id,
      },
    })
  }
  return json({
    quest,
    userQuest,
    claim,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const formData = await request.formData()
  const questId = formData.get('questId') as string

  try {
    const updatedUserQuest = await fetchWrapper({
      method: UserQuestsService.completeQuest,
      args: {
        questId,
      },
    })
    if (updatedUserQuest.status === QuestStatus.COMPLETED) {
      await fetchWrapper({
        method: UserQuestsService.checkQuestStatus,
        args: {
          questId,
        },
      })
      return json({ success: true })
    }
  } catch (error) {
    logger('Error completing quest', error)
    return json({ success: false })
  }
  return json({ success: false })
}

export default function Quests() {
  const { quest, userQuest, claim } = useLoaderData<typeof loader>()
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest.id)
  const [activityModalOpen, setActivityModalOpen] = useState(false)
  const fetcher = useFetcher<CheckQuestSuccessLoaderData>()
  const { revalidate } = useRevalidator()

  function handleOpenActivityModal() {
    setActivityModalOpen(true)
  }

  function handleCloseActivityModal() {
    setActivityModalOpen(false)
  }

  function handleActivitySuccess(claim: ClaimPresenter) {
    logger('Activity success', claim)
    if (userQuest) {
      logger('Submitting fetcher', claim.claim_id, userQuest.id)
      fetcher.load(`/resources/check-quest-success?userQuestId=${userQuest.id}`)
    }
  }

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
        <CreateClaimActivity
          claim={claim}
          status={userQuest?.status ?? QuestStatus.NOT_STARTED}
          handleClick={handleOpenActivityModal}
        />
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
      <CreateClaimModal
        successAction="close"
        onClose={handleCloseActivityModal}
        open={activityModalOpen}
        onSuccess={handleActivitySuccess}
      />
    </div>
  )
}
