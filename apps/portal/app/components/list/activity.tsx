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
  useSidebarLayoutContext,
} from '@0xintuition/1ui'
import {
  ActivityPresenter,
  IdentityPresenter,
  Redeemed,
  SortColumn,
} from '@0xintuition/api'
import { Events } from '@0xintuition/graphql'

import RemixLink from '@components/remix-link'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomIpfsLinkNew,
  getAtomLabel,
  getAtomLink,
  getAtomLinkNew,
  getClaimUrl,
} from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { BLOCK_EXPLORER_URL, PATHS } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { formatDistance } from 'date-fns'
import { useSetAtom } from 'jotai'

import { List } from './list'

type EventMessagesNew = {
  AtomCreated: string
  TripleCreated: string
  depositAtom: (value: string) => string
  redeemAtom: (value: string) => string
  depositTriple: (value: string) => string
  redeemTriple: (value: string) => string
}

export function ActivityListNew({
  activities,
  pagination,
  paramPrefix,
}: {
  activities: Events[]
  pagination: PaginationType
  paramPrefix?: string
}) {
  const eventMessagesNew: EventMessagesNew = {
    AtomCreated: 'created an identity',
    TripleCreated: 'created a claim',
    depositAtom: (value: string) =>
      `deposited ${formatBalance(value, 18)} ETH on an identity`,
    redeemAtom: (value: string) =>
      `redeemed ${formatBalance(value, 18)} ETH from an identity`,
    depositTriple: (value: string) =>
      `deposited ${formatBalance(value, 18)} ETH on a claim`,
    redeemTriple: (value: string) =>
      `redeemed ${formatBalance(value, 18)} ETH from a claim`,
  }

  logger('activities in activity list', activities)
  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="activities"
      paramPrefix={paramPrefix}
      enableSearch={false}
      enableSort={false}
    >
      {activities.map((activity) => (
        <ActivityItemNew
          key={activity.id}
          activity={activity}
          eventMessages={eventMessagesNew}
        />
      ))}
    </List>
  )
}

function ActivityItemNew({
  activity,
  eventMessages,
}: {
  activity: Events
  eventMessages: EventMessagesNew
}) {
  let messageKey: keyof EventMessagesNew | undefined

  const isAtomAction = activity.atom !== null

  if (activity.type === 'Deposited') {
    messageKey = isAtomAction ? 'depositAtom' : 'depositTriple'
  } else if (activity.type === 'Redeemed') {
    messageKey = isAtomAction ? 'redeemAtom' : 'redeemTriple'
  } else if (activity.type === 'AtomCreated') {
    messageKey = 'AtomCreated'
  } else if (activity.type === 'TripleCreated') {
    messageKey = 'TripleCreated'
  }

  const eventMessage = messageKey ? eventMessages[messageKey] : undefined
  const value =
    activity.type === 'Deposited' || activity.type === 'Redeemed'
      ? activity.redemption?.assets_for_receiver
      : null

  const message = eventMessage
    ? typeof eventMessage === 'function'
      ? (eventMessage as (value: string) => string)(value || '0').toString()
      : eventMessage.toString()
    : ''

  logger('activity', activity)
  logger(
    'user shares on triple',
    activity?.triple?.vault?.positions?.[0]?.shares ?? '0',
  )

  const setStakeModalActive = useSetAtom(stakeModalAtom)

  // Basic required fields with fallbacks
  const timestamp = activity.block_timestamp
    ? new Date(parseInt(activity.block_timestamp.toString()) * 1000)
    : new Date()

  // Get creator from either atom or triple
  const creator = activity.atom?.creator || activity.triple?.creator
  logger('creator', creator)
  const creatorAddress =
    activity?.atom?.creator?.id || activity?.triple?.creator?.id || '0x'
  const atomId = activity.atom?.id || ''

  function formatTransactionHash(txHash: string): string {
    return `0x${txHash.replace('\\x', '')}`
  }

  logger('format balance test', formatBalance('3726450001000000', 18))

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
                    name={creator.label || creator.id || ''}
                    id={creator.id}
                    // bio={creator.description ?? ''} // TODO: we need to determine best way to surface this field
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
      {activity.atom && (
        <IdentityRow
          variant={
            activity.atom.type === 'user' ? Identity.user : Identity.nonUser
          }
          avatarSrc={activity.atom.image ?? ''}
          name={activity.atom.label ?? atomId}
          // description={activity.atom.description ?? ''} // TODO: we need to determine best way to surface this field
          id={activity.atom.id}
          totalTVL={formatBalance(
            BigInt(activity.atom.vault?.total_shares ?? '0'),
            18,
          )}
          userPosition={formatBalance(
            activity.atom.vault?.positions?.[0]?.shares ?? '0',
            18,
          )}
          numPositions={activity.atom.vault?.position_count ?? 0}
          link={getAtomLinkNew(activity.atom)}
          // link={activity.atom.id}
          ipfsLink={getAtomIpfsLinkNew(activity.atom)}
          onStakeClick={() =>
            // @ts-ignore // TODO: Fix the staking actions to use correct types
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'identity',
              isOpen: true,
              identity: activity.atom ?? undefined,
              vaultId: activity.atom?.id ?? null,
            }))
          }
          className="w-full hover:bg-transparent"
        />
      )}
      {activity.triple && (
        <ClaimRow
          numPositionsFor={activity.triple.vault?.position_count ?? 0}
          numPositionsAgainst={
            activity.triple.counter_vault?.position_count ?? 0
          }
          tvlFor={formatBalance(activity.triple.vault?.total_shares ?? '0', 18)}
          tvlAgainst={formatBalance(
            activity.triple.counter_vault?.total_shares ?? '0',
            18,
          )}
          totalTVL={formatBalance(
            BigInt(activity.triple.vault?.total_shares ?? '0') +
              BigInt(activity.triple.counter_vault?.total_shares ?? '0'),
            18,
          )}
          userPosition={formatBalance(
            activity.triple.vault?.positions?.[0]?.shares ??
              activity.triple.counter_vault?.positions?.[0]?.shares ??
              '0',
            18,
          )}
          positionDirection={
            activity.triple.vault?.positions?.[0]?.shares
              ? ClaimPosition.claimFor
              : activity.triple.counter_vault?.positions?.[0]?.shares
                ? ClaimPosition.claimAgainst
                : undefined
          }
          onStakeForClick={() =>
            // @ts-ignore // TODO: Fix the staking actions to use correct types
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'claim',
              direction: ClaimPosition.claimFor,
              isOpen: true,
              claim: activity.triple ?? undefined,
              vaultId: activity.triple?.vault?.id ?? '0',
              counterVaultId: activity.triple?.counter_vault?.id ?? '0',
            }))
          }
          onStakeAgainstClick={() =>
            // @ts-ignore // TODO: Fix the staking actions to use correct types
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'claim',
              direction: ClaimPosition.claimAgainst,
              isOpen: true,
              claim: activity.triple ?? undefined,
              vaultId: activity.triple?.counter_vault?.id ?? '0',
              counterVaultId: activity.triple?.counter_vault?.id ?? '0',
            }))
          }
          className="w-full hover:bg-transparent"
        >
          <Link to={getClaimUrl(activity.triple.id)} prefetch="intent">
            <Claim
              size="md"
              subject={{
                variant:
                  activity.triple.subject?.type === 'user'
                    ? Identity.user
                    : Identity.nonUser,
                // label: getAtomLabel(activity.triple.subject), // TODO: rework this util function once settled
                label: activity.triple.subject?.label ?? '',
                imgSrc: activity.triple.subject?.image ?? '',
                id: activity.triple.subject?.id,
                // description: activity.triple.subject?.data?.description ?? '', // TODO: we need to determine best way to surface this field
                ipfsLink: activity.triple.subject
                  ? getAtomIpfsLinkNew(activity.triple.subject)
                  : '',
                link: activity.triple.subject
                  ? getAtomLinkNew(activity.triple.subject)
                  : '',
                linkComponent: RemixLink,
              }}
              predicate={{
                variant:
                  activity.triple.predicate?.type === 'user'
                    ? Identity.user
                    : Identity.nonUser,
                // label: getAtomLabel(activity.triple.predicate),
                label: activity.triple.predicate?.label ?? '', // TODO: rework this util function once settled
                imgSrc: activity.triple.predicate?.image ?? '',
                id: activity.triple.predicate?.id,
                // description: activity.triple.predicate?.data?.description ?? '', // TODO: we need to determine best way to surface this field
                ipfsLink: activity.triple.predicate
                  ? getAtomIpfsLinkNew(activity.triple.predicate)
                  : '',
                link: activity.triple.predicate
                  ? getAtomLinkNew(activity.triple.predicate)
                  : '',
                linkComponent: RemixLink,
              }}
              object={{
                variant:
                  activity.triple.object?.type === 'user'
                    ? Identity.user
                    : Identity.nonUser,
                // label: getAtomLabel(activity.triple.object),
                label: activity.triple.object?.label ?? '', // TODO: rework this util function once settled
                imgSrc: activity.triple.object?.image ?? '',
                id: activity.triple.object?.id,
                // description: activity.triple.object?.data?.description ?? '', // TODO: we need to determine best way to surface this field
                ipfsLink: activity.triple.object
                  ? getAtomIpfsLinkNew(activity.triple.object)
                  : '',
                link: activity.triple.object
                  ? getAtomLinkNew(activity.triple.object)
                  : '',
                linkComponent: RemixLink,
              }}
              isClickable={true}
            />
          </Link>
        </ClaimRow>
      )}
    </div>
  )
}

// LEGACY IMPLEMENTATION -- CAN REMOVE ONCE ALL ACTIVITIES ARE CONVERTED TO NEW IMPLEMENTATION
export function ActivityList({
  activities,
  pagination,
  paramPrefix,
}: {
  activities: ActivityPresenter[]
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
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          eventMessages={eventMessages}
          index={index}
          totalItems={activities.length}
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
  activity: ActivityPresenter
  eventMessages: EventMessages
  index: number
  totalItems: number
}) {
  const setStakeModalActive = useSetAtom(stakeModalAtom)

  const eventMessage = eventMessages[activity.event_type as keyof EventMessages]
  const isRedeemEvent = activity.event_type.startsWith('redeem')
  const value = isRedeemEvent
    ? (activity.logs?.[0] as { Redeemed: Redeemed }).Redeemed
        .assets_for_receiver
    : activity.value
  const message = eventMessage
    ? typeof eventMessage === 'function'
      ? (eventMessage as (value: string) => string)(value).toString()
      : eventMessage.toString()
    : ''

  const { isMobileView } = useSidebarLayoutContext()

  return (
    <div
      key={activity.id}
      className="grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start inline-flex"
    >
      <div className="flex flex-row items-center px-4 py-3 justify-between min-w-full max-md:flex-col max-md:gap-3">
        <div className="flex flex-row items-center gap-2 max-md:flex-col">
          <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Link
                to={
                  activity.creator
                    ? `${PATHS.PROFILE}/${activity.creator?.wallet}`
                    : `${BLOCK_EXPLORER_URL}/address/${activity.identity?.creator_address}`
                }
                prefetch="intent"
              >
                <IdentityTag
                  variant={Identity.user}
                  size="lg"
                  imgSrc={activity.creator?.image ?? ''}
                >
                  <Trunctacular
                    value={
                      activity.creator?.display_name ??
                      activity.creator?.wallet ??
                      activity.identity?.creator_address ??
                      '?'
                    }
                    maxStringLength={32}
                  />
                </IdentityTag>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-max">
              <div className="w-80 max-md:w-[80%]">
                {activity.creator ? (
                  <ProfileCard
                    variant={Identity.user}
                    avatarSrc={activity.creator?.image ?? ''}
                    name={activity.creator?.display_name ?? ''}
                    id={activity.creator?.wallet}
                    bio={activity.creator?.description ?? ''}
                    ipfsLink={`${BLOCK_EXPLORER_URL}/address/${activity.creator?.wallet}`}
                    className="w-80"
                  />
                ) : (
                  <ProfileCard
                    variant={Identity.user}
                    avatarSrc={''}
                    name={activity.identity?.creator_address ?? ''}
                    id={activity.identity?.creator_address}
                    bio={
                      'There is no user associated with this wallet. This data was created on-chain, outside of the Intuition Portal.'
                    }
                    ipfsLink={`${BLOCK_EXPLORER_URL}/address/${activity.identity?.creator_address}`}
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
            {formatDistance(new Date(activity.timestamp), new Date())} ago
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
      <div className="flex w-full px-5 pb-4">
        {activity.identity !== null && activity.identity !== undefined && (
          <IdentityRow
            variant={
              activity.identity.is_user ? Identity.user : Identity.nonUser
            }
            avatarSrc={getAtomImage(activity.identity)}
            name={getAtomLabel(activity.identity)}
            description={getAtomDescription(activity.identity)}
            id={activity.identity.user?.wallet ?? activity.identity.identity_id}
            totalTVL={formatBalance(
              BigInt(activity.identity.assets_sum ?? '0'),
              18,
            )}
            numPositions={activity.identity.num_positions}
            link={getAtomLink(activity.identity)}
            ipfsLink={getAtomIpfsLink(activity.identity)}
            tags={
              activity.identity.tags?.map((tag) => ({
                label: tag.display_name,
                value: tag.num_tagged_identities,
              })) ?? undefined
            }
            onStakeClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                isOpen: true,
                identity: activity.identity ?? undefined,
                vaultId: activity.identity?.vault_id ?? '0',
              }))
            }
            className="w-full hover:bg-transparent"
          />
        )}
        {activity.claim && (
          <ClaimRow
            numPositionsFor={activity.claim.for_num_positions}
            numPositionsAgainst={activity.claim.against_num_positions}
            tvlFor={formatBalance(activity.claim.for_assets_sum, 18)}
            tvlAgainst={formatBalance(activity.claim.against_assets_sum, 18)}
            totalTVL={formatBalance(activity.claim.assets_sum, 18)}
            userPosition={formatBalance(activity.claim.user_assets, 18)}
            positionDirection={
              +activity.claim.user_assets_for > 0
                ? ClaimPosition.claimFor
                : +activity.claim.user_assets_against > 0
                  ? ClaimPosition.claimAgainst
                  : undefined
            }
            onStakeForClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimFor,
                isOpen: true,
                claim: activity.claim ?? undefined,
                vaultId: activity.claim?.vault_id ?? '0',
              }))
            }
            onStakeAgainstClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimAgainst,
                isOpen: true,
                claim: activity.claim ?? undefined,
                vaultId: activity.claim?.counter_vault_id ?? '0',
              }))
            }
            className="w-full hover:bg-transparent"
          >
            <Link to={getClaimUrl(activity.claim.vault_id)} prefetch="intent">
              <Claim
                size="md"
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
                  linkComponent: RemixLink,
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
                  linkComponent: RemixLink,
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
                  linkComponent: RemixLink,
                }}
                isClickable={true}
                orientation={isMobileView ? 'vertical' : 'horizontal'}
              />
            </Link>
          </ClaimRow>
        )}
      </div>
    </div>
  )
}
