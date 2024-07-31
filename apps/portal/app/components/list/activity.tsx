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
import { ActivityPresenter, SortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
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
      className={`grow shrink basis-0 self-stretch p-6 bg-black rounded-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex w-full my-6 first:mt-0 last:mb-0`}
    >
      <div className="flex flex-row items-center justify-between min-w-full">
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
          <div className="hover:cursor-pointer bg-secondary-foreground/10 pl-12 pr-6 py-4 rounded-xl flex flex-row w-full gap-6 items-center">
            <IdentityContentRow
              variant={
                activity.identity.is_user ? Identity.user : Identity.nonUser
              }
              avatarSrc={
                activity.identity.user?.image ?? activity.identity.image ?? ''
              }
              name={
                activity.identity.user?.display_name ??
                activity.identity.display_name
              }
              walletAddress={
                activity.identity.user?.wallet ?? activity.identity.identity_id
              }
              amount={
                +formatBalance(
                  BigInt(activity.identity.user_assets ?? '0'),
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
          <div className="hover:cursor-pointer bg-secondary-foreground/10 pl-12 pr-6 py-4 rounded-xl flex flex-row w-full gap-6 items-center">
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
                subject={{
                  variant: activity.claim.subject?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label:
                    activity.claim.subject?.user?.display_name ??
                    activity.claim.subject?.display_name ??
                    activity.claim.subject?.identity_id ??
                    '',
                  imgSrc: activity.claim.subject?.image,
                }}
                predicate={{
                  variant: activity.claim.predicate?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label:
                    activity.claim.predicate?.user?.display_name ??
                    activity.claim.predicate?.display_name ??
                    activity.claim.predicate?.identity_id ??
                    '',
                  imgSrc: activity.claim.predicate?.image,
                }}
                object={{
                  variant: activity.claim.object?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label:
                    activity.claim.object?.user?.display_name ??
                    activity.claim.object?.display_name ??
                    activity.claim.object?.identity_id ??
                    '',
                  imgSrc: activity.claim.object?.image,
                }}
              />
            </ClaimRow>
            <Link
              to={`${PATHS.PROFILE}/${activity.claim.claim_id}`}
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
