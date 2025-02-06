import {
  Button,
  ButtonSize,
  ButtonVariant,
  Claim,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  ProfileCard,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { GetSignalsQuery, Signals } from '@0xintuition/graphql'

import { formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
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
  activities: GetSignalsQuery
}) {
  const eventMessagesNew: EventMessagesNew = {
    AtomCreated: 'created an identity',
    TripleCreated: 'created a claim',
    depositAtom: (value: string) =>
      `deposited ${formatBalance(BigInt(value), 18)} ETH on atom`,
    redeemAtom: (value: string) =>
      `redeemed ${formatBalance(BigInt(value), 18)} ETH from atom`,
    depositTriple: (value: string) =>
      `deposited ${formatBalance(BigInt(value), 18)} ETH on triple`,
    redeemTriple: (value: string) =>
      `redeemed ${formatBalance(BigInt(value), 18)} ETH from triple`,
  }

  return (
    <div className="space-y-4 bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 p-4 rounded-lg">
      {activities.signals.map((activity) => (
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

  function formatTransactionHash(txHash: string): string {
    return `0x${txHash.replace('\\x', '')}`
  }

  return (
    <div className="rounded-xl p-4 last:mb-0 flex flex-col w-full max-sm:p-3 border border-border/10">
      <div className="flex flex-col justify-between min-w-full max-md:flex-col max-md:gap-3">
        <div className="flex flex-row items-center gap-2 max-md:flex-col">
          <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Link
                to={`${BLOCK_EXPLORER_URL}/address/${creator}`}
                prefetch="intent"
              >
                <IdentityTag variant={Identity.user} size="lg" imgSrc={''}>
                  <Trunctacular
                    value={
                      creator?.label ?? creator?.id ?? creatorAddress ?? '?'
                    }
                    maxStringLength={32}
                  />
                </IdentityTag>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-max">
              <div className="w-80 max-md:w-[80%]">
                {creator ? (
                  <ProfileCard
                    variant={Identity.user}
                    avatarSrc={creator.image ?? ''}
                    name={creator.label || creator.id || ''}
                    id={creator.id}
                    ipfsLink={`${BLOCK_EXPLORER_URL}/address/${creator.id}`}
                    className="w-80"
                  />
                ) : (
                  <ProfileCard
                    variant={Identity.user}
                    avatarSrc={''}
                    name={creatorAddress}
                    id={creatorAddress}
                    bio={'No user profile available'}
                    ipfsLink={`${BLOCK_EXPLORER_URL}/address/${creatorAddress}`}
                    className="w-80"
                  />
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
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
            >
              {activity.atom.label ?? activity.atom.id}
            </IdentityTag>
          )}
          {activity.triple && (
            <Claim
              size="md"
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
            />
          )}
        </div>
        <div className="flex gap-2 items-center justify-between">
          <Text className="text-secondary-foreground">
            {formatDistance(timestamp, new Date())} ago
          </Text>
          <a
            href={`${BLOCK_EXPLORER_URL}/tx/${formatTransactionHash(activity.transaction_hash)}`}
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
