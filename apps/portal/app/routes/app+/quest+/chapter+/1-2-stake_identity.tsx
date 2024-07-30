import { useEffect } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  GetPositionByIdResponse,
  IdentitiesService,
  IdentityPresenter,
  PositionsService,
  QuestsService,
  QuestStatus,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import StakeIdentityActivity from '@components/quest/activities/stake-identity-activity'
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
import { getVaultDetails } from '@server/multivault'
import { FALLBACK_IDENTITY_ID } from 'consts/quest'
import { useAtom } from 'jotai'
import { MDXContentVariant, VaultDetailsType } from 'types'

const ROUTE_ID = QuestRouteId.STAKE_IDENTITY

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  const userWallet = user.wallet?.address
  invariant(userWallet, 'Unauthorized')

  const quest = await fetchWrapper({
    method: QuestsService.getQuest,
    args: {
      questId: id,
    },
  })
  invariant(quest, 'quest is required')

  // Fetching all quests to potentially find quest details of dependent quest
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

  const { id: userId } = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: userWallet,
    },
  })
  const userQuest = userQuests.find(
    (userQuest) => userQuest.quest_id === id && userId === userQuest.user_id,
  )
  logger('Fetched user quest', userQuest)

  let position: GetPositionByIdResponse | undefined
  let identity: IdentityPresenter
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
    invariant(position.identity_id, 'position must be on an identity')
    identity = await fetchWrapper({
      method: IdentitiesService.getIdentityById,
      args: {
        id: position.identity_id,
      },
    })
  } else {
    // if no position is found, use the identity they just created
    // OR, use the defaulted FALLBACK_IDENTITY_ID
    const dependsOnUserQuest = userQuests.find(
      (userQuest) =>
        userQuest.quest_id === quest.depends_on_quest &&
        userId === userQuest.user_id,
    )
    const dependsOnIdentityId =
      dependsOnUserQuest?.quest_completion_object_id ?? FALLBACK_IDENTITY_ID
    identity = await fetchWrapper({
      method: IdentitiesService.getIdentityById,
      args: {
        id: dependsOnIdentityId,
      },
    })
  }
  invariant(identity, 'identity is required')

  const vaultDetails = await getVaultDetails(
    identity.contract,
    identity.vault_id,
    userWallet as `0x${string}`,
  )

  return json({
    quest,
    userQuest,
    identity,
    vaultDetails,
    position,
    userWallet,
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
  const { quest, userQuest, identity, position, vaultDetails, userWallet } =
    useLoaderData<typeof loader>()
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest?.id)

  const fetcher = useFetcher<CheckQuestSuccessLoaderData>()
  const { revalidate } = useRevalidator()

  function handleDepositActivityClick() {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: true,
      id: identity.id,
      modalType: 'identity',
      mode: 'deposit',
    }))
  }

  function handleRedeemActivityClick() {
    setStakeModalActive((prevState) => ({
      ...prevState,
      isOpen: true,
      id: identity.id,
      modalType: 'identity',
      mode: 'redeem',
    }))
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
    logger('Activity success', args.identity)
    const { identity } = args
    if (userQuest) {
      logger('Submitting fetcher', identity?.id, userQuest.id)
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
        <StakeIdentityActivity
          status={userQuest?.status ?? QuestStatus.NOT_STARTED}
          identity={identity}
          position={position}
          vaultDetails={vaultDetails}
          handleDepositIdentityClick={handleDepositActivityClick}
          handleRedeemIdentityClick={handleRedeemActivityClick}
          isLoading={fetcher.state !== 'idle'}
          disabled={
            userQuest?.status === QuestStatus.CLAIMABLE ||
            fetcher.state !== 'idle'
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
        identity={identity}
        userWallet={userWallet}
        contract={identity.contract}
        vaultDetails={vaultDetails}
        onClose={handleCloseActivityModal}
        onSuccess={handleActivitySuccess}
      />
    </div>
  )
}
