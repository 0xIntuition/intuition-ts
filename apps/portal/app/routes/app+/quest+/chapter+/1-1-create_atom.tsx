import { useEffect, useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
  QuestStatus,
  SortColumn,
  SortDirection,
  UserQuestsService,
} from '@0xintuition/api'

import CreateIdentityModal from '@components/create-identity/create-identity-modal'
import { ErrorPage } from '@components/error-page'
import CreateAtomActivity from '@components/quest/create-atom-activity'
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
import { CHAPTER_1_MP3 } from 'app/consts'
import { MDXContentVariant } from 'app/types'

const ROUTE_ID = QuestRouteId.CREATE_ATOM

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')

  const { userQuest, quest } = await getUserQuest(request, id)
  invariant(userQuest, 'User quest not found')
  invariant(quest, 'Quest not found')

  let identity: IdentityPresenter | undefined
  if (userQuest && userQuest.quest_completion_object_id) {
    try {
      identity = await fetchWrapper(request, {
        method: IdentitiesService.getIdentityById,
        args: {
          id: userQuest.quest_completion_object_id,
        },
      })
    } catch (error) {
      // if error is APIError and status is 404
      if (error instanceof ApiError && error.status === 404) {
        logger(
          'Identity not found and status is claimable, check pending identities for user wallet',
        )
        const pendingIdentities = (
          await fetchWrapper(request, {
            method: IdentitiesService.getPendingIdentities,
            args: {
              direction: SortDirection.ASC,
              userWallet: user.wallet?.address,
              sortBy: SortColumn.CREATED_AT,
              page: 1,
              limit: 10,
              offset: 0,
            },
          })
        ).data
        if (pendingIdentities.length > 0) {
          // check if identity is pending
          identity = pendingIdentities.find(
            (identity) => identity.id === userQuest.quest_completion_object_id,
          )
        }
      }
    }
    logger('Fetched identity', identity)
  }

  return json({
    quest,
    userQuest,
    identity,
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
  const { quest, userQuest, identity } = useLoaderData<typeof loader>()
  const {
    successModalOpen,
    setSuccessModalOpen,
    checkQuestSuccess,
    isLoading: checkQuestSuccessLoading,
  } = useQuestCompletion(userQuest)
  const [activityModalOpen, setActivityModalOpen] = useState(false)
  const actionData = useActionData<typeof action>()
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest?.id)

  function handleOpenActivityModal() {
    setActivityModalOpen(true)
  }

  function handleCloseActivityModal() {
    setActivityModalOpen(false)
  }

  function handleActivitySuccess(identity: IdentityPresenter) {
    logger('Activity success', identity)
    checkQuestSuccess()
  }

  useEffect(() => {
    if (actionData?.success) {
      setSuccessModalOpen(true)
    }
  }, [actionData?.success])

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10 max-lg:px-0 max-md:gap-4">
      <div className="flex flex-col gap-10 mb-5 max-md:gap-5 max-md:mb-2">
        <Hero imgSrc={`${quest.image}-header`} />
        <div className="flex flex-col gap-10 max-md:gap-4">
          <QuestBackButton />
          <Header
            position={quest.position}
            title={quest.title}
            questStatus={userQuest?.status}
            questAudio={CHAPTER_1_MP3}
          />
          <MDXContentView body={introBody} variant={MDXContentVariant.LORE} />
          <QuestCriteriaCard
            criteria={getQuestCriteria(quest.condition)}
            questStatus={userQuest?.status ?? QuestStatus.NOT_STARTED}
            points={quest.points}
          />
        </div>
        <MDXContentView body={mainBody} />
        <CreateAtomActivity
          status={userQuest?.status ?? QuestStatus.NOT_STARTED}
          identity={identity}
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
      <CreateIdentityModal
        successAction="close"
        onClose={handleCloseActivityModal}
        open={activityModalOpen}
        onSuccess={handleActivitySuccess}
      />
      <QuestSuccessModal
        quest={quest}
        routeId={ROUTE_ID}
        userQuest={userQuest}
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="quest/chapter/1-1" />
}
