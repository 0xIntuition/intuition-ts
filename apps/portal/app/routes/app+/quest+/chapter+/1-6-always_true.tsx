import { Suspense, useEffect } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  ProfileCardHeader,
} from '@0xintuition/1ui'
import {
  ClaimsService,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { TagsList } from '@components/list/tags'
import {
  Header,
  Hero,
  MDXContentView,
  QuestBackButton,
} from '@components/quest/detail/layout'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import { QuestPointsDisplay } from '@components/quest/quest-points-display'
import QuestSuccessModal from '@components/quest/quest-success-modal'
import { PaginatedListSkeleton } from '@components/skeleton'
import { useQuestCompletion } from '@lib/hooks/useQuestCompletion'
import { useQuestMdxContent } from '@lib/hooks/useQuestMdxContent'
import { getListIdentities } from '@lib/services/lists'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestId, QuestRouteId } from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, Form, useActionData, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserId } from '@server/auth'
import { getUserQuest } from '@server/quest'
import { CHAPTER_6_MP3, FALLBACK_LIST_ID_FOR_QUERY } from 'app/consts'
import { IdentityListType, MDXContentVariant } from 'app/types'

const ROUTE_ID = QuestRouteId.ALWAYS_TRUE

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  invariant(user.wallet?.address, 'User wallet is required')

  const { quest, userQuest } = await getUserQuest(request, id)

  const { id: userId } = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: user.wallet.address,
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

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const claim = await fetchWrapper(request, {
    method: ClaimsService.getClaimById,
    args: { id: FALLBACK_LIST_ID_FOR_QUERY },
  })

  const globalListIdentities = await getListIdentities({
    request,
    objectId: claim.object?.id ?? '',
    searchParams,
  })

  logger('Fetched user quest', userQuest)

  logger('Fetched user quest status', status)

  return json({
    quest,
    userQuest,
    userWallet: user.wallet?.address,
    claim,
    globalListIdentities,
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
  const { quest, userQuest, userWallet, claim, globalListIdentities } =
    useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const { successModalOpen, setSuccessModalOpen } =
    useQuestCompletion(userQuest)
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest.id)

  useEffect(() => {
    if (actionData?.success) {
      setSuccessModalOpen(true)
    }
  }, [actionData])

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
            questAudio={CHAPTER_6_MP3}
          />
          <MDXContentView body={introBody} variant={MDXContentVariant.LORE} />
          <QuestCriteriaCard
            criteria={getQuestCriteria(quest.condition)}
            questStatus={userQuest?.status ?? QuestStatus.NOT_STARTED}
            points={quest.points}
          />
        </div>
        <MDXContentView body={mainBody} />

        <div className="rounded-lg theme-border p-5 flex min-h-96 theme-border text-warning/30 overflow-auto">
          <Suspense fallback={<PaginatedListSkeleton />}>
            <Await resolve={globalListIdentities}>
              {(resolvedGlobalListIdentities: IdentityListType | null) => {
                if (!resolvedGlobalListIdentities) {
                  return <PaginatedListSkeleton />
                }
                return (
                  <>
                    <div className="flex flex-col w-full gap-6 text-foreground">
                      <ProfileCardHeader
                        variant="non-user"
                        avatarSrc={claim.object?.image ?? ''}
                        name={claim.object?.display_name ?? ''}
                        id={claim.object?.identity_id ?? ''}
                        maxStringLength={72}
                      />
                      <TagsList
                        identities={resolvedGlobalListIdentities.listIdentities}
                        claims={resolvedGlobalListIdentities.claims}
                        pagination={resolvedGlobalListIdentities.pagination}
                        claim={claim}
                        wallet={userWallet}
                        enableSearch={true}
                        enableSort={true}
                      />
                    </div>
                  </>
                )
              }}
            </Await>
          </Suspense>
        </div>

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

export function ErrorBoundary() {
  return <ErrorPage routeName="quest/chapter/1-6" />
}
