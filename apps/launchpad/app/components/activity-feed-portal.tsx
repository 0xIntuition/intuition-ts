import {
  Button,
  ButtonSize,
  ButtonVariant,
  Claim,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'

import { GetActivityQuery, Signals } from '@lib/graphql'
import { formatBalance } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { formatDistance } from 'date-fns'

type EventMessagesNew = {
  AtomCreated: string
  TripleCreated: string
  depositAtom: (value: string) => string
  redeemAtom: (value: string) => string
  depositTriple: (value: string) => string
  redeemTriple: (value: string) => string
}

export function ActivityFeedPortal({
  activities,
}: {
  activities: GetActivityQuery['signals']
}) {
  const eventMessagesNew: EventMessagesNew = {
    AtomCreated: 'created an identity',
    TripleCreated: 'created a claim',
    depositAtom: (value: string) =>
      `deposited ${formatBalance(BigInt(value), 18)} ETH on`,
    redeemAtom: (value: string) =>
      `redeemed ${formatBalance(BigInt(value), 18)} ETH from`,
    depositTriple: (value: string) =>
      `deposited ${formatBalance(BigInt(value), 18)} ETH on`,
    redeemTriple: (value: string) =>
      `redeemed ${formatBalance(BigInt(value), 18)} ETH from`,
  }

  return (
    <div className="space-y-4 bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 p-4 rounded-lg">
      {activities.map((activity) => (
        <ActivityItemNew
          key={activity.id}
          activity={activity as Signals}
          eventMessages={eventMessagesNew}
        />
      ))}
    </div>
  )
}

function ActivityItemNew({
  activity,
  eventMessages,
}: {
  activity: Signals
  eventMessages: EventMessagesNew
}) {
  let messageKey: keyof EventMessagesNew | undefined

  const isAtomAction = activity.atom !== null

  if (activity.deposit) {
    messageKey = isAtomAction ? 'depositAtom' : 'depositTriple'
  } else if (activity.redemption) {
    messageKey = isAtomAction ? 'redeemAtom' : 'redeemTriple'
  } else if (activity.atom) {
    messageKey = 'AtomCreated'
  } else if (activity.triple) {
    messageKey = 'TripleCreated'
  }

  const eventMessage = messageKey ? eventMessages[messageKey] : undefined
  const value =
    activity.deposit?.sender_assets_after_total_fees ||
    activity.redemption?.assets_for_receiver ||
    '0'

  const message = eventMessage
    ? typeof eventMessage === 'function'
      ? (eventMessage as (value: string) => string)(value || '0').toString()
      : eventMessage.toString()
    : ''

  const timestamp = activity.block_timestamp
    ? new Date(parseInt(activity.block_timestamp.toString()) * 1000)
    : new Date()

  const creator = activity.deposit
    ? activity.deposit.sender
    : activity.redemption?.receiver

  const creatorAddress = creator?.id || '0x'

  return (
    <div className="rounded-xl p-4 last:mb-0 flex flex-col w-full max-sm:p-3 border border-border/10">
      <div className="flex flex-col justify-between gap-3 min-w-full max-md:flex-col max-md:gap-3">
        <div className="flex flex-row items-center gap-2 max-md:flex-col">
          <IdentityTag
            variant={Identity.user}
            imgSrc={creator?.image ?? creator?.atom?.image ?? ''}
            disabled={true}
            className="!opacity-100"
          >
            <Trunctacular
              value={creator?.label ?? creator?.id ?? creatorAddress ?? '?'}
              maxStringLength={32}
            />
          </IdentityTag>
          <Text>{message}</Text>
          {activity.atom && (
            <IdentityTag
              variant={
                activity.atom.type === 'Default' ||
                activity.atom.type === 'Account'
                  ? Identity.user
                  : Identity.nonUser
              }
              imgSrc={activity.atom.image ?? ''}
              id={activity.atom.id}
              disabled={true}
              className="!opacity-100"
            >
              {activity.atom.label ?? activity.atom.id}
            </IdentityTag>
          )}
          {activity.triple && (
            <Claim
              subject={{
                variant:
                  activity.triple.subject?.type === 'user'
                    ? Identity.user
                    : Identity.nonUser,
                label: activity.triple.subject?.label ?? '',
                imgSrc: activity.triple.subject?.image ?? '',
                id: activity.triple.subject?.id,
              }}
              predicate={{
                variant:
                  activity.triple.predicate?.type === 'user'
                    ? Identity.user
                    : Identity.nonUser,
                label: activity.triple.predicate?.label ?? '',
                imgSrc: activity.triple.predicate?.image ?? '',
                id: activity.triple.predicate?.id,
              }}
              object={{
                variant:
                  activity.triple.object?.type === 'user'
                    ? Identity.user
                    : Identity.nonUser,
                label: activity.triple.object?.label ?? '',
                imgSrc: activity.triple.object?.image ?? '',
                id: activity.triple.object?.id,
              }}
              shouldHover={false}
              disabled={true}
              className="!opacity-100"
            />
          )}
        </div>
        <div className="flex gap-2 items-end justify-between">
          <Text className="text-secondary-foreground">
            {formatDistance(timestamp, new Date())} ago
          </Text>
          <a
            href={`${BLOCK_EXPLORER_URL}/tx/${activity.transaction_hash}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.md}
              className="w-max h-fit"
            >
              View on Explorer{' '}
              <Icon name={IconName.squareArrowTopRight} className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
