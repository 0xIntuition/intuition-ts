import { useEffect } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  GetPositionByIdResponse,
  IdentitiesService,
  IdentityPresenter,
  PositionsService,
  QuestStatus,
  UserQuest,
  UserQuestsService,
  UsersService,
} from '@0xintuition/api'

import questAudio from '@assets/audio/quests/chapter-2.mp3'
import { ErrorPage } from '@components/error-page'
import StakeIdentityActivity from '@components/quest/activities/stake-identity-activity'
import {
  Header,
  Hero,
  MDXContentView,
  QuestBackButton,
} from '@components/quest/detail/layout'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import { QuestPointsDisplay } from '@components/quest/quest-points-display'
import QuestSuccessModal from '@components/quest/quest-success-modal'
import StakeModal from '@components/stake/stake-modal'
import { useQuestCompletion } from '@lib/hooks/useQuestCompletion'
import { useQuestMdxContent } from '@lib/hooks/useQuestMdxContent'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { getQuestCriteria, getQuestId, QuestRouteId } from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserId } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { getUserQuest } from '@server/quest'
import { FALLBACK_IDENTITY_ID } from 'app/consts/quest'
import { MDXContentVariant, VaultDetailsType } from 'app/types'
import { useAtom } from 'jotai'

const ROUTE_ID = QuestRouteId.STAKE_IDENTITY

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const user = await requireUser(request)
  invariant(user, 'Unauthorized')
  const userWallet = user.wallet?.address
  invariant(userWallet, 'Unauthorized')

  const { userQuest, quest } = await getUserQuest(request, id)
  invariant(userQuest, 'User quest not found')
  invariant(quest, 'Quest not found')

  let position: GetPositionByIdResponse | undefined
  let identity: IdentityPresenter
  let userQuests: UserQuest[] = []
  if (userQuest.quest_completion_object_id) {
    position = await fetchWrapper(request, {
      method: PositionsService.getPositionById,
      args: {
        id: userQuest.quest_completion_object_id,
      },
    })
    logger('Fetched position', position)
  }
  if (position) {
    invariant(position.identity_id, 'position must be on an identity')
    identity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: {
        id: position.identity_id,
      },
    })
  } else {
    // if no position is found, use the identity they just created
    // OR, use the defaulted FALLBACK_IDENTITY_ID
    if (quest.depends_on_quest) {
      const { id: userId } = await fetchWrapper(request, {
        method: UsersService.getUserByWalletPublic,
        args: {
          wallet: userWallet,
        },
      })
      const { data } = await fetchWrapper(request, {
        method: UserQuestsService.search,
        args: {
          requestBody: {
            userId,
          },
        },
      })
      userQuests = data
    }
    const dependsOnUserQuest = userQuests.find(
      (userQuest) =>
        userQuest.quest_id === quest.depends_on_quest &&
        user.id === userQuest.user_id,
    )
    const dependsOnIdentityId =
      dependsOnUserQuest?.quest_completion_object_id ?? FALLBACK_IDENTITY_ID
    identity = await fetchWrapper(request, {
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
  const { quest, userQuest, identity, position, vaultDetails, userWallet } =
    useLoaderData<typeof loader>()
  const {
    successModalOpen,
    setSuccessModalOpen,
    checkQuestSuccess,
    isLoading: checkQuestSuccessLoading,
  } = useQuestCompletion(userQuest)
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const { introBody, mainBody, closingBody } = useQuestMdxContent(quest?.id)
  const actionData = useActionData<typeof action>()

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
    if (userQuest?.status !== QuestStatus.COMPLETED) {
      checkQuestSuccess()
    }
  }

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
            questAudio={questAudio}
          />
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
          isLoading={checkQuestSuccessLoading}
          disabled={
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
      <StakeModal
        open={stakeModalActive.isOpen}
        identity={identity}
        userWallet={userWallet}
        contract={identity.contract}
        vaultDetails={vaultDetails}
        onClose={handleCloseActivityModal}
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

export function ErrorBoundary() {
  return <ErrorPage routeName="quest/chapter/1-2" />
}
