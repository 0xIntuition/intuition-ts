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
import { IdentityPresenter, Redeemed, SortColumn } from '@0xintuition/api'
import { Events, Events_Aggregate } from '@0xintuition/graphql'

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

type EventMessages = {
  AtomCreated: string
  TripleCreated: string
  depositAtom: (value: string) => string
  redeemAtom: (value: string) => string
  depositTriple: (value: string) => string
  redeemTriple: (value: string) => string
}

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
        <ActivityItem
          key={activity.id}
          activity={activity}
          eventMessages={eventMessages}
        />
      ))}
    </List>
  )
}

function ActivityItem({
  activity,
  eventMessages,
}: {
  activity: Events
  eventMessages: EventMessages
}) {
  let messageKey: keyof EventMessages | undefined

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
      ? activity.redemption?.assetsForReceiver
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
  const timestamp = activity.blockTimestamp
    ? new Date(parseInt(activity.blockTimestamp.toString()) * 1000)
    : new Date()

  const creator = activity.atom?.creator
  logger('creator', creator)
  const creatorAddress = activity?.atom?.creator?.id || '0x'
  const atomId = activity.atom?.id || ''

  function formatTransactionHash(txHash: string): string {
    return `0x${txHash.replace('\\x', '')}`
  }

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
            href={`${BLOCK_EXPLORER_URL}/tx/${formatTransactionHash(activity.transactionHash)}`}
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
            BigInt(activity.atom.vault?.totalShares ?? '0'),
            18,
          )}
          userPosition={formatBalance(
            activity.atom.vault?.positions?.[0]?.shares ?? '0',
            18,
          )}
          numPositions={activity.atom.vault?.positionCount ?? 0}
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
              vaultId: activity.atom?.vault?.id ?? null,
            }))
          }
          className="w-full hover:bg-transparent"
        />
      )}
      {activity.triple && (
        <ClaimRow
          numPositionsFor={activity.triple.vault?.positionCount ?? 0}
          numPositionsAgainst={activity.triple.counterVault?.positionCount ?? 0}
          tvlFor={formatBalance(activity.triple.vault?.totalShares ?? '0', 18)}
          tvlAgainst={formatBalance(
            activity.triple.counterVault?.totalShares ?? '0',
            18,
          )}
          totalTVL={formatBalance(
            BigInt(activity.triple.vault?.totalShares ?? '0') +
              BigInt(activity.triple.counterVault?.totalShares ?? '0'),
            18,
          )}
          userPosition={formatBalance(
            activity.triple.vault?.positions?.[0]?.shares ??
              activity.triple.counterVault?.positions?.[0]?.shares ??
              '0',
            18,
          )}
          positionDirection={
            activity.triple.vault?.positions?.[0]?.shares
              ? ClaimPosition.claimFor
              : activity.triple.counterVault?.positions?.[0]?.shares
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
              vaultId: activity.triple?.vaultId ?? '0',
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
              vaultId: activity.triple?.counterVaultId ?? '0',
            }))
          }
          className="w-full hover:bg-transparent"
        >
          <Link
            to={getClaimUrl(activity.triple.vaultId ?? '0')}
            prefetch="intent"
          >
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
