import { useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
  InfoCard,
  ProfileCard,
  Text,
} from '@0xintuition/1ui'
import {
  IdentitiesService,
  IdentityPresenter,
  QuestsService,
  QuestStatus,
  UserQuestsService,
} from '@0xintuition/api'

import questPlaceholder from '@assets/quest-placeholder.png'
import CreateIdentityModal from '@components/create-identity-modal'
import { QuestCriteriaCard } from '@components/quest/quest-criteria-card'
import QuestStatusCard from '@components/quest/quest-status-card'
import { MDXContent } from '@content-collections/mdx/react'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant, sliceString } from '@lib/utils/misc'
import {
  getQuestContentBySlug,
  getQuestCriteria,
  getQuestId,
  QuestRouteId,
} from '@lib/utils/quest'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { requireUserId } from '@server/auth'

const ROUTE_ID = QuestRouteId.CREATE_ATOM

export async function loader({ request }: LoaderFunctionArgs) {
  const id = getQuestId(ROUTE_ID)
  invariant(id, 'id is required')

  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const quest = await fetchWrapper({
    method: QuestsService.getQuest,
    args: {
      questId: id,
    },
  })
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

  const userQuest = userQuests.find((userQuest) => userQuest.quest_id === id)
  logger('Fetched user quest', userQuest)

  let identity: IdentityPresenter | undefined
  if (userQuest && userQuest.quest_completion_object_id) {
    identity = await fetchWrapper({
      method: IdentitiesService.getIdentityById,
      args: {
        id: userQuest.quest_completion_object_id,
      },
    })
    logger('Fetched identity', identity)
  }

  const questIntro = getQuestContentBySlug(`${quest.id}-intro`)
  const questContent = getQuestContentBySlug(`${quest.id}-main`)
  const questClosing = getQuestContentBySlug(`${quest.id}-closing`)
  return json({
    quest,
    questIntro,
    questContent,
    questClosing,
    userQuest,
    identity,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  invariant(userId, 'Unauthorized')

  const formData = await request.formData()
  const userQuestId = formData.get('userQuestId') as string

  // Update the user quest
  const updatedUserQuest = await fetchWrapper({
    method: UserQuestsService.getUserQuestById,
    args: {
      userQuestId,
    },
  })

  return json({ success: true, updatedUserQuest })
}

export default function Quests() {
  const { quest, questIntro, questContent, questClosing, userQuest, identity } =
    useLoaderData<typeof loader>()
  const [activityModalOpen, setActivityModalOpen] = useState(false)
  const fetcher = useFetcher()

  function handleOpenActivityModal() {
    setActivityModalOpen(true)
  }

  function handleCloseActivityModal() {
    setActivityModalOpen(false)
  }

  function handleActivitySuccess(identity: IdentityPresenter) {
    logger('Activity success', identity)
    if (userQuest) {
      logger('Submitting fetcher', identity.id, userQuest.id)
      // TODO: Handle persisting of quest details
      fetcher.load(`/resources/get-quest-status?userQuestId=${userQuest.id}`)
    }
  }

  function handleCompleteQuest() {
    // TODO: Handle completion action
    logger('Completing quest', userQuest?.id)
  }

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-10 mb-5">
        <img
          src={quest.image ?? questPlaceholder}
          alt={'quest hero'}
          className="object-cover w-full h-[350px] border-x border-b border-border/20 rounded-b-lg"
        />
        <div className="flex flex-col gap-10">
          <Link to="/app/quest/narrative/0">
            <Button variant={ButtonVariant.secondary} className="w-fit">
              <div className="flex items-center gap-2">
                <Icon name={IconName.arrowLeft} />
              </div>
            </Button>
          </Link>
          <div className="flex items-bottom justify-between w-full">
            <Text variant="heading4" weight="medium">
              {quest.title}
            </Text>
            <QuestStatusCard
              status={userQuest?.status ?? QuestStatus.NOT_STARTED}
            />
          </div>

          {questIntro?.body && <MDXLoreWrapper code={questIntro.body} />}
          <QuestCriteriaCard
            criteria={getQuestCriteria(quest.condition)}
            questStatus={userQuest?.status ?? QuestStatus.NOT_STARTED}
            points={quest.points}
          />
        </div>
        {questContent?.body && <MDXContentWrapper code={questContent.body} />}
        <CreateAtomActivity
          status={userQuest?.status ?? QuestStatus.NOT_STARTED}
          identity={identity}
          handleClick={handleOpenActivityModal}
        />
        {questClosing?.body &&
          (userQuest?.status === QuestStatus.CLAIMABLE ||
            userQuest?.status === QuestStatus.COMPLETED) && (
            <div className="flex flex-col gap-5 py-5">
              <MDXContentWrapper code={questClosing.body} />
            </div>
          )}

        <div className="flex flex-col items-center justify-center w-full gap-2 pb-20">
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            disabled={userQuest?.status !== QuestStatus.CLAIMABLE}
            onClick={handleCompleteQuest}
          >
            Complete Quest
          </Button>
          <Text variant="bodyLarge" className="text-foreground/50">
            +{quest.points} Points
          </Text>
        </div>
      </div>
      <CreateIdentityModal
        successAction="close"
        onClose={handleCloseActivityModal}
        open={activityModalOpen}
        onSuccess={handleActivitySuccess}
      />
    </div>
  )
}

export function MDXContentWrapper({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-5 py-5">
      <MDXContent
        code={code}
        components={{
          h1: (props) => <Text variant="headline" weight="medium" {...props} />,
          p: (props) => (
            <Text
              variant="bodyLarge"
              className="text-foreground/50"
              {...props}
            />
          ),
        }}
      />
    </div>
  )
}

export function MDXLoreWrapper({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-2">
      <MDXContent
        code={code}
        components={{
          h1: (props) => <Text variant="headline" weight="medium" {...props} />,
          p: (props) => (
            <Text
              variant="bodyLarge"
              className="text-foreground/50"
              {...props}
            />
          ),
        }}
      />
    </div>
  )
}

export interface CreateAtomActivityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  identity?: IdentityPresenter | null
  handleClick: () => void
}

const getCreateActivityComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 theme-border',
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 border border-accent/20 border-dashed',
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        containerClass: 'bg-primary/5 border border-success border-solid',
      }
    case QuestStatus.COMPLETED:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        containerClass: 'bg-primary/5 border border-success border-solid',
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 theme-border',
      }
  }
}

export function CreateAtomActivity({
  status,
  identity,
  handleClick,
  ...props
}: CreateAtomActivityProps) {
  const activityComponentData = getCreateActivityComponentData(status)
  return (
    <div
      className={cn(
        'rounded-lg p-5 flex flex-col w-full justify-center items-center gap-5',
        activityComponentData.containerClass,
      )}
      {...props}
    >
      <div className="w-full justify-start flex items-center">
        <Icon
          className={cn(activityComponentData.iconClass, 'h-6 w-6')}
          name={activityComponentData.iconName}
        />
      </div>
      <div className="pb-12">
        {identity ? (
          <div className="flex flex-col gap-5 theme-border rounded-md p-5">
            <ProfileCard
              variant="non-user"
              avatarSrc={identity?.image ?? ''}
              name={identity?.display_name ?? ''}
              walletAddress={sliceString(identity?.identity_id, 6, 4)}
              bio={identity?.description ?? ''}
            />
            <InfoCard
              variant="user"
              username={identity.creator?.display_name ?? ''}
              avatarImgSrc={identity.creator?.image ?? ''}
              timestamp={identity.created_at}
              onClick={() => {}}
              className="p-0 border-none"
            />
          </div>
        ) : (
          <Button
            variant={ButtonVariant.secondary}
            size={ButtonSize.lg}
            onClick={handleClick}
          >
            <Icon name={IconName.fingerprint} />
            Create Identity
          </Button>
        )}
      </div>
    </div>
  )
}
