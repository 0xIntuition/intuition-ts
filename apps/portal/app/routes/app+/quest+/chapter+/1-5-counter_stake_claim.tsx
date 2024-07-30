import { useEffect } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  GetPositionByIdResponse,
  IdentityPresenter,
  PositionPresenter,
  PositionsService,
  QuestsService,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import StakeClaimActivity from '@components/quest/activities/stake-claim-activity'
import StakeClaimUnderlyingIdentitiesActivity from '@components/quest/activities/stake-claim-underlying-identities-activity'
import {
  Header,
  Hero,
  MDXContentView,
  QuestBackButton,
} from '@components/quest/detail/layout'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import { QuestPointsDisplay } from '@components/quest/quest-points-display'
import StakeModal from '@components/stake/stake-modal'
import { useQuestMdxContent } from '@lib/hooks/useQuestMdxContent'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import {
  getQuestContentBySlug,
  getQuestCriteria,
  getQuestId,
  QuestRouteId,
} from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  useFetcher,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react'
import { CheckQuestSuccessLoaderData } from '@routes/resources+/check-quest-success'
import { requireUser, requireUserId } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { FALLBACK_CLAIM_ID } from 'consts'
import { useAtom } from 'jotai'
import {
  Identity,
  IdentityType,
  MDXContentVariant,
  VaultDetailsType,
} from 'types'

const ROUTE_ID = QuestRouteId.COUNTER_STAKE_CLAIM

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  invariant(user.wallet?.address, 'User wallet is required')

  const quest = await fetchWrapper({
    method: QuestsService.getQuest,
    args: {
      questId: id,
    },
  })
  const { id: userId } = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: user.wallet?.address!,
    },
  })
  const userQuests = (
    await fetchWrapper({
      method: UserQuestsService.search,
      args: {
        requestBody: {
          questId: id,
          userId,
        },
      },
    })
  ).data

  const userQuest = userQuests.find(
    (userQuest) => userQuest.quest_id === id && userQuest.user_id === userId,
  )
  logger('Fetched user quest', userQuest)

  let position: GetPositionByIdResponse | PositionPresenter | undefined
  let claim: ClaimPresenter | undefined
  let identities: Record<
    string,
    {
      vaultDetails: VaultDetailsType
      identity: IdentityPresenter
      type: IdentityType
    }
  > = {}
  if (userQuest && userQuest.quest_completion_object_id) {
    position = await fetchWrapper({
      method: PositionsService.getPositionById,
      args: {
        id: userQuest.quest_completion_object_id,
      },
    })
    logger('Fetched position', position)
  }

  if (position) {
    invariant(position.claim_id, 'position must be on an claim')
    claim = await fetchWrapper({
      method: ClaimsService.getClaimById,
      args: {
        id: position.claim_id!,
      },
    })
  } else {
    const dependsOnUserQuest = userQuests.find(
      (userQuest) =>
        userQuest.quest_id === quest.depends_on_quest &&
        userId === userQuest.user_id,
    )
    const dependsOnClaimId =
      dependsOnUserQuest?.quest_completion_object_id ?? FALLBACK_CLAIM_ID
    claim = await fetchWrapper({
      method: ClaimsService.getClaimById,
      args: {
        id: dependsOnClaimId,
      },
    })
  }
  logger('Fetched claim', claim)

  const vaultDetails = await getVaultDetails(
    claim.contract,
    claim.vault_id,
    user.wallet?.address as `0x${string}`,
  )

  // if position fetch underlying vault details
  if (position && claim) {
    const { subject, predicate, object } = claim
    const subjectVaultId = subject?.vault_id
    const objectVaultId = object?.vault_id
    const predicateVaultId = predicate?.vault_id
    const vaultDetails = await Promise.all([
      getVaultDetails(
        subject?.contract!,
        subjectVaultId!,
        user.wallet?.address as `0x${string}`,
      ),
      getVaultDetails(
        predicate?.contract!,
        predicateVaultId!,
        user.wallet?.address as `0x${string}`,
      ),
      getVaultDetails(
        object?.contract!,
        objectVaultId!,
        user.wallet?.address as `0x${string}`,
      ),
    ])
    identities = [subject, predicate, object].reduce(
      (acc, identity, index) => {
        if (identity) {
          acc[identity.id] = {
            vaultDetails: vaultDetails[index],
            identity,
            type: [Identity.Subject, Identity.Predicate, Identity.Object][
              index
            ],
          }
        }
        return acc
      },
      {} as Record<
        string,
        {
          vaultDetails: VaultDetailsType
          identity: IdentityPresenter
          type: IdentityType
        }
      >,
    )
  }

  return json({
    quest,
    userQuest,
    claim,
    position,
    vaultDetails,
    userWallet: user.wallet?.address,
    identities,
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
      return json({ success: true })
    }
  } catch (error) {
    logger('Error completing quest', error)
    return json({ success: false })
  }
  return json({ success: false })
}

export default function Quests() {
  const {
    quest,
    userQuest,
    claim,
    position,
    vaultDetails,
    userWallet,
    identities,
  } = useLoaderData<typeof loader>()
  const { introBody, mainBody, mainBody2, closingBody } = useQuestMdxContent(
    quest.id,
  )
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  const fetcher = useFetcher<CheckQuestSuccessLoaderData>()
  const { revalidate } = useRevalidator()

  function handleOpenForActivityModal() {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: true,
      id: claim.claim_id,
      modalType: 'claim',
      mode: 'deposit',
      direction: 'for',
    }))
  }

  function handleOpenAgainstActivityModal() {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: true,
      id: claim.claim_id,
      modalType: 'claim',
      mode: 'deposit',
      direction: 'against',
    }))
  }

  function handleSellClick() {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: true,
      id: claim.claim_id,
      modalType: 'claim',
      mode: 'redeem',
    }))
    logger('redeem claim', claim)
  }
  function handleSellIdentityClick(identity: IdentityPresenter) {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: true,
      id: identity.id,
      modalType: 'identity',
      mode: 'redeem',
    }))
    logger('redeem identity', identity)
  }

  function handleCloseActivityModal() {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: false,
      mode: undefined,
    }))
  }

  function handleActivitySuccess(args: {
    identity?: IdentityPresenter
    claim?: ClaimPresenter
    vaultDetails: VaultDetailsType
    direction?: 'for' | 'against'
  }) {
    logger('Activity success', claim)
    if (userQuest) {
      logger('Submitting fetcher', claim.claim_id, userQuest.id)
      fetcher.load(`/resources/check-quest-success?userQuestId=${userQuest.id}`)
    }
  }

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      logger('Fetched fetcher', fetcher.data)
      if (
        fetcher.data.success &&
        fetcher.data.status === QuestStatus.COMPLETED
      ) {
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
        <StakeClaimActivity
          status={userQuest?.status ?? QuestStatus.NOT_STARTED}
          claim={claim}
          position={position}
          handleForClick={handleOpenForActivityModal}
          handleAgainstClick={handleOpenAgainstActivityModal}
          handleSellClick={handleSellClick}
          vaultDetails={vaultDetails}
          direction={'against'}
          isLoading={fetcher.state !== 'idle'}
          isDisabled={
            fetcher.state !== 'idle' ||
            userQuest?.status === QuestStatus.CLAIMABLE
          }
        />
        <MDXContentView
          body={mainBody2}
          shouldDisplay={
            userQuest?.status === QuestStatus.CLAIMABLE ||
            (userQuest?.status === QuestStatus.COMPLETED && !!position)
          }
        />
        {!!identities.length && !!position && (
          <StakeClaimUnderlyingIdentitiesActivity
            identities={identities}
            handleSellClick={handleSellIdentityClick}
            status={QuestStatus.NOT_STARTED}
            userWallet={userWallet}
          />
        )}

        <MDXContentView
          body={closingBody}
          variant={MDXContentVariant.LORE}
          shouldDisplay={
            userQuest?.status === QuestStatus.CLAIMABLE ||
            (userQuest?.status === QuestStatus.COMPLETED && !!position)
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
      <StakeModal
        open={stakeModalActive.isOpen}
        claim={claim}
        userWallet={userWallet}
        contract={claim.contract}
        vaultDetails={vaultDetails}
        onClose={handleCloseActivityModal}
        onSuccess={handleActivitySuccess}
        direction={stakeModalActive.direction}
      />
    </div>
  )
}
