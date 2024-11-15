import {
  Button,
  ButtonSize,
  ButtonVariant,
  Claim,
  ClaimPosition,
  ClaimRow,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IconName,
  Identity,
  IdentityRow,
  IdentityTag,
  ProfileCard,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { SortColumn } from '@0xintuition/api'
import { Events, Events_Aggregate } from '@0xintuition/graphql'

import RemixLink from '@components/remix-link'
import { stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
} from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { BLOCK_EXPLORER_URL, PATHS } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { formatDistance } from 'date-fns'
import { useSetAtom } from 'jotai'

import { List } from './list'

export function ActivityList({
  activities,
  pagination,
  paramPrefix,
}: {
  activities: Events[]
  pagination: PaginationType
  paramPrefix?: string
}) {
  const eventMessages: EventMessages = {
    createAtom: 'created an identity',
    createTriple: 'created a claim',
    depositAtom: (value: string) =>
      `deposited ${formatBalance(value, 18)} ETH on an identity`,
    redeemAtom: (value: string) =>
      `redeemed ${formatBalance(value, 18)} ETH from an identity`,
    depositTriple: (value: string) =>
      `deposited ${formatBalance(value, 18)} ETH on a claim`,
    redeemTriple: (value: string) =>
      `redeemed ${formatBalance(value, 18)} ETH from a claim`,
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
}: {
  activity: Events
  eventMessages: EventMessages
}) {
  const eventMessage = eventMessages[activity.type as keyof EventMessages]
  const isRedeemEvent = activity.type?.startsWith('redeem') || false
  const value = activity.value || '0'
  const message = eventMessage
    ? typeof eventMessage === 'function'
      ? (eventMessage as (value: string) => string)(value).toString()
      : eventMessage.toString()
    : ''

  const setStakeModalActive = useSetAtom(stakeModalAtom)

  // Basic required fields with fallbacks
  const timestamp = activity.blockTimestamp
    ? new Date(parseInt(activity.blockTimestamp.toString()) * 1000)
    : new Date()

  const creator = activity.atom?.creator
  const creatorAddress = activity.atom?.creator_address || '0x'
  const atomId = activity.atom?.id || ''

  return (
    <div
      key={activity.id}
      className={`bg-background rounded-xl mb-6 last:mb-0 flex flex-col w-full max-sm:p-3`}
    >
      <div className="flex flex-row items-center py-3 justify-between min-w-full max-md:flex-col max-md:gap-3">
        <div className="flex flex-row items-center gap-2 max-md:flex-col">
          <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Link
                to={
                  creator
                    ? `${PATHS.PROFILE}/${creator.id}`
                    : `${BLOCK_EXPLORER_URL}/address/${creatorAddress}`
                }
                prefetch="intent"
              >
                <IdentityTag
                  variant={Identity.user}
                  size="lg"
                  imgSrc={creator?.image ?? ''}
                >
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
                    name={creator.label ?? ''}
                    id={creator.id}
                    bio={creator.description ?? ''}
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
        </div>
        <div className="flex gap-2 items-center">
          <Text className="text-secondary-foreground">
            {formatDistance(timestamp, new Date())} ago
          </Text>
          <a
            href={`${BLOCK_EXPLORER_URL}/tx/${activity.transactionHash}`}
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
      {activity.atom && (
        <IdentityRow
          variant={
            activity.atom.type === 'user' ? Identity.user : Identity.nonUser
          }
          avatarSrc={activity.atom.image ?? ''}
          name={activity.atom.label ?? atomId}
          description={activity.atom.description ?? ''}
          id={activity.atom.id}
          totalTVL={formatBalance(
            BigInt(activity.atom.vault?.totalShares ?? '0'),
            18,
          )}
          numPositions={
            activity.atom.vault?.positions_aggregate.nodes.length ?? 0
          }
          link={getAtomLink(activity.atom)}
          ipfsLink={getAtomIpfsLink(activity.atom)}
          onStakeClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'identity',
              isOpen: true,
              identity: activity.atom ?? undefined,
              vaultId: activity.atom?.vault?.id ?? null,
            }))
          }
          className="w-full hover:bg-transparent"
        />
      )}
    </div>
  )
}
