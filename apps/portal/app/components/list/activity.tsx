import {
  Claim,
  ClaimRow,
  EmptyStateCard,
  Identity,
  IdentityContentRow,
  IdentityTag,
  Text,
} from '@0xintuition/1ui'
import { ActivityPresenter, SortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { formatDistance } from 'date-fns'
import { PaginationType } from 'types/pagination'

import { List } from './list'

type EventMessages = {
  createAtom: string
  createTriple: string
  depositAtom: (value: string) => string
  redeemAtom: (value: string) => string
  depositTriple: (value: string) => string
  redeemTriple: (value: string) => string
}

// ... existing code ...

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
      className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex w-full`}
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
      <div className="flex w-full px-6">
        {activity.identity && (
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
                    ? `/app/profile/${activity.identity.identity_id}`
                    : `/app/identity/${activity.identity.identity_id}`,
                )
              }
            }}
            className="hover:cursor-pointer"
          />
        )}
        {activity.claim && (
          <div className="flex flex-row w-full">
            <ClaimRow
              claimsFor={activity.claim.for_num_positions}
              claimsAgainst={activity.claim.against_num_positions}
              amount={+formatBalance(activity.claim.assets_sum, 18, 4)}
              onClick={() => {
                if (activity.claim) {
                  navigate(`/app/claim/${activity.claim.claim_id}`)
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
          </div>
        )}
      </div>
    </div>
  )
}

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
      paginationLabel="identities"
      paramPrefix={paramPrefix}
      enableSearch={false}
    >
      {!activities.length ? (
        <EmptyStateCard message="No activities found." />
      ) : (
        activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            eventMessages={eventMessages}
            navigate={navigate}
          />
        ))
      )}
    </List>
  )
}
