import { Suspense, useEffect } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  ProfileCardHeader,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'
import { GetAtomQuery, GetListDetailsQuery } from '@0xintuition/graphql'

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
import SaveListModal from '@components/save-list/save-list-modal'
import { PaginatedListSkeleton } from '@components/skeleton'
import { useQuestCompletion } from '@lib/hooks/useQuestCompletion'
import { useQuestMdxContent } from '@lib/hooks/useQuestMdxContent'
import { getListClaims } from '@lib/services/lists'
import { saveListModalAtom } from '@lib/state/store'
import { getQuestObjects } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { identityToAtom, invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestId, QuestRouteId } from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, Form, useActionData, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserId } from '@server/auth'
import { getUserQuest } from '@server/quest'
import {
  CHAPTER_6_MP3,
  CURRENT_ENV,
  MIN_DEPOSIT,
  MULTIVAULT_CONTRACT_ADDRESS,
} from 'app/consts'
import { MDXContentVariant } from 'app/types'
import { useAtom } from 'jotai'
import { parseUnits, Status } from 'viem'

const ROUTE_ID = QuestRouteId.ALWAYS_TRUE

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  // get fallback claim
  const discoverListFallbackAtomId =
    getQuestObjects(CURRENT_ENV).discoverListFallbackAtom.id

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
    args: { id: discoverListFallbackAtomId },
  })

  const globalListClaims = await getListClaims({
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
    globalListClaims,
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

// Add mapping function
const claimToTriple = (
  claim: ClaimPresenter,
): GetListDetailsQuery['globalTriples'][number] => ({
  __typename: 'triples',
  id: claim.claim_id,
  vault_id: claim.vault_id,
  counter_vault_id: claim.counter_vault_id,
  subject: {
    __typename: 'atoms',
    id: claim.subject?.id ?? '',
    vault_id: claim.subject?.vault_id ?? '',
    label: claim.subject?.display_name ?? '',
    wallet_id: claim.subject?.identity_id ?? '',
    image: claim.subject?.image ?? null,
    type: claim.subject?.entity_type ?? 'Default',
    tags: {
      __typename: 'triples_aggregate',
      nodes: [],
      aggregate: {
        __typename: 'triples_aggregate_fields',
        count: 0,
      },
    },
  },
  object: {
    __typename: 'atoms',
    id: claim.object?.id ?? '',
    vault_id: claim.object?.vault_id ?? '',
    label: claim.object?.display_name ?? '',
    wallet_id: claim.object?.identity_id ?? '',
    image: claim.object?.image ?? null,
    type: claim.object?.entity_type ?? 'Default',
  },
  predicate: {
    __typename: 'atoms',
    id: claim.predicate?.id ?? '',
    vault_id: claim.predicate?.vault_id ?? '',
    label: claim.predicate?.display_name ?? '',
    wallet_id: claim.predicate?.identity_id ?? '',
    image: claim.predicate?.image ?? null,
    type: claim.predicate?.entity_type ?? 'Default',
  },
  vault: {
    __typename: 'vaults',
    current_share_price: '0',
    positions_aggregate: {
      __typename: 'positions_aggregate',
      aggregate: {
        __typename: 'positions_aggregate_fields',
        count: 0,
        sum: {
          __typename: 'positions_sum_fields',
          shares: '0',
        },
      },
    },
  },
})

export default function Quests() {
  const { quest, userQuest, userWallet, claim, globalListClaims } =
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

  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10 max-lg:px-4 max-md:gap-4">
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
            <Await resolve={globalListClaims}>
              {(resolveGlobalListClaims) => {
                if (!resolveGlobalListClaims) {
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
                        triples={resolveGlobalListClaims.claims.map(
                          claimToTriple,
                        )}
                        enableSearch={true}
                        enableSort={true}
                      />
                      <SaveListModal
                        contract={
                          claim.object?.contract ?? MULTIVAULT_CONTRACT_ADDRESS
                        }
                        atom={
                          identityToAtom(
                            (saveListModalActive.identity ?? {
                              asset_delta: '',
                              assets_sum: '',
                              contract: '',
                              conviction_price: '',
                              conviction_price_delta: '',
                              conviction_sum: '',
                              created_at: '',
                              creator_address: '',
                              display_name: '',
                              follow_vault_id: '',
                              id: '',
                              identity_hash: '',
                              identity_id: '',
                              is_contract: false,
                              is_user: false,
                              num_positions: 0,
                              predicate: false,
                              status: 'active' as Status,
                              updated_at: '',
                              vault_id: '',
                            }) as IdentityPresenter,
                          ) as GetAtomQuery['atom']
                        }
                        tagAtom={
                          identityToAtom(
                            claim.object as IdentityPresenter,
                          ) as GetAtomQuery['atom']
                        }
                        userWallet={userWallet}
                        open={saveListModalActive.isOpen}
                        onClose={() =>
                          setSaveListModalActive({
                            ...saveListModalActive,
                            isOpen: false,
                          })
                        }
                        min_deposit={parseUnits(MIN_DEPOSIT, 18).toString()}
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
