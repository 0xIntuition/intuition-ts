import { useEffect, useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  QuestStatus,
  UserQuestsService,
} from '@0xintuition/api'

import CreateClaimModal from '@components/create-claim/create-claim-modal'
import CreateClaimActivity from '@components/quest/activities/create-claim-activity'
import {
  Header,
  Hero,
  MDXContentView,
  QuestBackButton,
} from '@components/quest/detail/layout'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import { QuestPointsDisplay } from '@components/quest/quest-points-display'
import QuestSuccessModal from '@components/quest/quest-success-modal'
import { useQuestCompletion } from '@lib/hooks/useQuestCompletion'
import { useQuestMdxContent } from '@lib/hooks/useQuestMdxContent'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestId, QuestRouteId } from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserId } from '@server/auth'
import { getUserQuest } from '@server/quest'
import { MDXContentVariant } from 'app/types'

const ROUTE_ID = QuestRouteId.CREATE_CLAIM

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  const wallet = user.wallet?.address
  invariant(wallet, 'Wallet is required')

  const { userQuest, quest } = await getUserQuest(request, id)
  invariant(userQuest, 'User quest not found')
  invariant(quest, 'Quest not found')

  let claim: ClaimPresenter | undefined
  if (userQuest.quest_completion_object_id) {
    claim = await fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: {
        id: userQuest.quest_completion_object_id,
      },
    })
  }
  return json({
    wallet,
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
    const updatedUserQuest = await fetchWrapper(request, {
      method: UserQuestsService.completeQuest,
      args: {
        questId,
      },
    })
    if (updatedUserQuest.status === QuestStatus.COMPLETED) {
      await fetchWrapper(request, {
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
  const { wallet, quest, userQuest, claim } = useLoaderData<typeof loader>()
  const {
    checkQuestSuccess,
    isLoading: checkQuestSuccessLoading,
    successModalOpen,
    setSuccessModalOpen,
  } = useQuestCompletion(userQuest)
  const actionData = useActionData<typeof action>()
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest.id)
  const [activityModalOpen, setActivityModalOpen] = useState(false)

  function handleOpenActivityModal() {
    setActivityModalOpen(true)
  }

  function handleCloseActivityModal() {
    setActivityModalOpen(false)
  }

  function handleActivitySuccess(claim: ClaimPresenter) {
    logger('Activity success', claim)
    checkQuestSuccess()
  }

  useEffect(() => {
    if (actionData?.success) {
      setSuccessModalOpen(true)
    }
  }, [actionData])

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10 max-lg:px-0 max-md:gap-4">
      <div className="flex flex-col gap-10 mb-5 max-md:gap-5 max-md:mb-2">
        <Hero imgSrc={quest.image} />
        <div className="flex flex-col gap-10 max-md:gap-4">
          <QuestBackButton />
          <Header
            position={quest.position}
            title={quest.title}
            questStatus={userQuest?.status}
          />
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
          isLoading={checkQuestSuccessLoading}
          isDisabled={
            userQuest?.status === QuestStatus.CLAIMABLE ||
            checkQuestSuccessLoading
          }
        />
        <MDXContentView
          body={closingBody}
          variant={MDXContentVariant.LORE}
          shouldDisplay={
            userQuest?.status === QuestStatus.CLAIMABLE ||
            userQuest?.status === QuestStatus.COMPLETED
          }
        />

        <div className="flex flex-col items-center justify-center w-full gap-2 pb-20 max-md:pb-5">
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
        wallet={wallet}
        successAction="close"
        onClose={handleCloseActivityModal}
        open={activityModalOpen}
        onSuccess={handleActivitySuccess}
      />
      <QuestSuccessModal
        quest={quest}
        userQuest={userQuest}
        routeId={ROUTE_ID}
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  )
}
