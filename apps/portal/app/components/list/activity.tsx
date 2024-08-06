import {
  Button,
  ButtonSize,
  ButtonVariant,
  Claim,
  ClaimRow,
  Icon,
  IconName,
  Identity,
  IdentityContentRow,
  IdentityTag,
  Text,
} from '@0xintuition/1ui'
import {
  ActivityPresenter,
  IdentityPresenter,
  SortColumn,
} from '@0xintuition/api'

import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { Link, useNavigate } from '@remix-run/react'
import { PATHS } from 'consts'
import { formatDistance } from 'date-fns'
import { PaginationType } from 'types/pagination'

import { List } from './list'

export function ActivityList({
  activities,
  pagination,
  paramPrefix,
}: {
  activities: ActivityPresenter[]
  pagination: PaginationType
  paramPrefix?: string
}) {
  const navigate = useNavigate()

  const eventMessages: EventMessages = {
    createAtom: 'created an identity',
    createTriple: 'created a claim',
    depositAtom: (value: string) =>
      `deposited ${formatBalance(value, 18, 4)} ETH on an identity`,
    redeemAtom: (value: string) =>
      `redeemed ${formatBalance(value, 18, 4)} ETH from an identity`,
    depositTriple: (value: string) =>
      `deposited ${formatBalance(value, 18, 4)} ETH on a claim`,
    redeemTriple: (value: string) =>
      `redeemed ${formatBalance(value, 18, 4)} ETH from a claim`,
  }

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="activities"
      paramPrefix={paramPrefix}
      enableSearch={false}
      enableSort={false}
    >
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          eventMessages={eventMessages}
          navigate={navigate}
        />
      ))}
    </List>
  )
}

type EventMessages = {
  createAtom: string
  createTriple: string
  depositAtom: (value: string) => string
  redeemAtom: (value: string) => string
  depositTriple: (value: string) => string
  redeemTriple: (value: string) => string
}

function ActivityItem({
  activity,
  eventMessages,
  navigate,
}: {
  activity: ActivityPresenter
  eventMessages: EventMessages
  navigate: ReturnType<typeof useNavigate>
}) {
  const eventMessage = eventMessages[activity.event_type as keyof EventMessages]
  const message = eventMessage
    ? typeof eventMessage === 'function'
      ? (eventMessage as (value: string) => string)(activity.value).toString()
      : eventMessage.toString()
    : ''

  return (
    <div
      key={activity.id}
      className={`p-6 bg-black rounded-xl theme-border mb-6 last:mb-0 flex flex-col w-full`}
    >
      <div className="flex flex-row items-center justify-between min-w-full mb-4">
        <div className="flex flex-row items-center gap-2">
          <IdentityTag
            variant={Identity.user}
            size="lg"
            imgSrc={activity.creator?.image ?? ''}
          >
            {activity.creator?.display_name ?? activity.creator?.wallet ?? ''}
          </IdentityTag>
          <Text>{message}</Text>
        </div>
        <Text className="text-secondary-foreground">
          {formatDistance(new Date(activity.timestamp), new Date())} ago
        </Text>
      </div>
      <div className="flex w-full">
        {activity.identity && (
          <div className="hover:cursor-pointer bg-secondary-foreground/10 px-6 py-4 rounded-xl flex flex-row w-full gap-6 items-center justify-between">
            <IdentityContentRow
              variant={
                activity.identity.is_user ? Identity.user : Identity.nonUser
              }
              avatarSrc={
                activity.identity.user?.image ?? activity.identity.image ?? ''
              }
              name={
                activity.identity.user_display_name ??
                activity.identity.display_name
              }
              walletAddress={
                activity.identity.user?.wallet ?? activity.identity.identity_id
              }
              amount={
                +formatBalance(
                  BigInt(activity.identity.assets_sum ?? '0'),
                  18,
                  4,
                )
              }
              totalFollowers={activity.identity.num_positions}
              onClick={() => {
                if (activity.identity) {
                  navigate(
                    activity.identity.is_user
                      ? `${PATHS.PROFILE}/${activity.identity.identity_id}`
                      : `${PATHS.IDENTITY}/${activity.identity.id}`,
                  )
                }
              }}
            />
            <Link
              to={
                activity.identity.is_user
                  ? `${PATHS.PROFILE}/${activity.identity.identity_id}`
                  : `${PATHS.IDENTITY}/${activity.identity.id}`
              }
              prefetch="intent"
            >
              <Button
                variant={ButtonVariant.secondary}
                size={ButtonSize.md}
                className="w-40 h-fit"
              >
                View Identity{' '}
                <Icon name={IconName.arrowUpRightFromCircleIcon} />
              </Button>
            </Link>
          </div>
        )}
        {activity.claim && (
          <div className="hover:cursor-pointer bg-secondary-foreground/10 px-6 py-4 rounded-xl flex flex-row w-full gap-6 items-center">
            <ClaimRow
              claimsFor={activity.claim.for_num_positions}
              claimsAgainst={activity.claim.against_num_positions}
              amount={+formatBalance(activity.claim.assets_sum, 18, 4)}
              onClick={() => {
                if (activity.claim) {
                  navigate(`${PATHS.CLAIM}/${activity.claim.claim_id}`)
                }
              }}
              className="hover:cursor-pointer w-full"
            >
              <Claim
                size="md"
                link={`${PATHS.CLAIM}/${activity.claim.claim_id}`}
                subject={{
                  variant: activity.claim.subject?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label: getAtomLabel(
                    activity.claim.subject as IdentityPresenter,
                  ),
                  imgSrc: getAtomImage(
                    activity.claim.subject as IdentityPresenter,
                  ),
                  id: activity.claim.subject?.identity_id,
                  description: getAtomDescription(
                    activity.claim.subject as IdentityPresenter,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    activity.claim.subject as IdentityPresenter,
                  ),
                  link: getAtomLink(
                    activity.claim.subject as IdentityPresenter,
                  ),
                }}
                predicate={{
                  variant: activity.claim.predicate?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label: getAtomLabel(
                    activity.claim.predicate as IdentityPresenter,
                  ),
                  imgSrc: getAtomImage(
                    activity.claim.predicate as IdentityPresenter,
                  ),
                  id: activity.claim.predicate?.identity_id,
                  description: getAtomDescription(
                    activity.claim.predicate as IdentityPresenter,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    activity.claim.predicate as IdentityPresenter,
                  ),
                  link: getAtomLink(
                    activity.claim.predicate as IdentityPresenter,
                  ),
                }}
                object={{
                  variant: activity.claim.object?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label: getAtomLabel(
                    activity.claim.object as IdentityPresenter,
                  ),
                  imgSrc: getAtomImage(
                    activity.claim.object as IdentityPresenter,
                  ),
                  id: activity.claim.object?.identity_id,
                  description: getAtomDescription(
                    activity.claim.object as IdentityPresenter,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    activity.claim.object as IdentityPresenter,
                  ),
                  link: getAtomLink(activity.claim.object as IdentityPresenter),
                }}
              />
            </ClaimRow>
            <Link
              to={`${PATHS.CLAIM}/${activity.claim.claim_id}`}
              prefetch="intent"
            >
              <Button
                variant={ButtonVariant.secondary}
                size={ButtonSize.md}
                className="w-40 h-fit"
              >
                View Claim <Icon name={IconName.arrowUpRightFromCircleIcon} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
