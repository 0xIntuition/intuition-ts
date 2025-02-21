import { Suspense } from 'react'

import {
  Banner,
  BannerVariant,
  formatWalletAddress,
  IconName,
  ProfileCardHeader,
  Separator,
  Skeleton,
  Text,
} from '@0xintuition/1ui'
import {
  GetUserByWalletResponse,
  QuestNarrative,
  UsersService,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { PointsEarnedCard } from '@components/points-card/points-card'
import { QuestSetCard } from '@components/quest/quest-set-card'
import { QuestSetProgressCard } from '@components/quest/quest-set-progress-card'
import { ReferralCard } from '@components/referral-card/referral-card'
import RelicPointCard from '@components/relic-point-card/relic-point-card'
import { fetchRelicPoints } from '@lib/services/points'
import { invariant } from '@lib/utils/misc'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Await, Link, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getQuestsProgress } from '@server/quest'
import {
  BLOCK_EXPLORER_URL,
  COMING_SOON_QUEST_SET,
  HEADER_BANNER_HELP_CENTER,
  QUEST_LOG_DESCRIPTION,
  QUESTS_DISABLED_BANNER_MESSAGE,
  QUESTS_DISABLED_BANNER_TITLE,
  QUESTS_ENABLED,
  STANDARD_QUEST_SET,
} from 'app/consts'
import { fetchProtocolFees } from 'app/lib/services/protocol'
import { fetchRelicCounts } from 'app/lib/services/relic'
import { isAddress } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, 'Unauthorized')

  const [relicCounts, protocolFees, relicPoints] = await Promise.all([
    fetchRelicCounts(userWallet.toLowerCase()),
    fetchProtocolFees(userWallet.toLowerCase()),
    fetchRelicPoints(userWallet.toLowerCase()),
  ])

  const userProfile = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: userWallet,
    },
  })

  const userTotals = await fetchWrapper(request, {
    method: UsersService.getUserTotals,
    args: {
      id: userWallet,
    },
  })

  const inviteCodes = await fetchWrapper(request, {
    method: UsersService.getInviteCodesByUser,
    args: {
      id: userProfile.id,
    },
  })

  const details = await getQuestsProgress({
    request,
    options: {
      narrative: QuestNarrative.STANDARD,
    },
  })

  return {
    details,
    userWallet,
    userProfile,
    userTotals,
    inviteCodes: inviteCodes.invite_codes,
    relicHoldCount: relicCounts.holdCount,
    mintCount: relicCounts.mintCount,
    relicPoints,
    protocolFees,
  }
}

export default function Quests() {
  const {
    userTotals,
    inviteCodes,
    mintCount,
    relicHoldCount,
    relicPoints,
    protocolFees,
    details,
  } = useLoaderData<typeof loader>()

  return (
    <div className="p-10 w-full max-w-7xl mx-auto flex flex-col gap-5 max-md:p-5 max-sm:p-2">
      {!QUESTS_ENABLED && (
        <Banner
          variant={BannerVariant.warning}
          title={QUESTS_DISABLED_BANNER_TITLE}
          message={QUESTS_DISABLED_BANNER_MESSAGE}
        />
      )}
      <ExploreHeader
        title="Quests"
        content="Explore the Intuition ecosystem, and earn IQ points along the way."
        icon={IconName.crystalBall}
        bgImage={HEADER_BANNER_HELP_CENTER}
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <UserHeader />
        </div>
        <Separator className="mb-5 max-md:mb-2" />
      </div>
      <div className="flex flex-col gap-16 max-md:gap-5">
        <div className="flex gap-10 flex-grow max-md:flex-col max-md:gap-5">
          <div className="flex-1">
            <Suspense fallback={<Skeleton className="h-52 w-full" />}>
              <Await resolve={details}>
                {(resolvedDetails) => (
                  <QuestSetProgressCard
                    imgSrc={`${STANDARD_QUEST_SET.imgSrc}-thumbnail`}
                    title={STANDARD_QUEST_SET.title}
                    numberQuests={resolvedDetails.numQuests}
                    numberCompletedQuests={resolvedDetails.numCompletedQuests}
                    to={STANDARD_QUEST_SET.navigatePath}
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="space-y-5">
          <Text variant="headline">Your Inventory</Text>
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <div className="flex-shrink-0 min-w-[256px] w-1/3 max-md:min-w-full max-md:w-full">
              <Suspense fallback={<Skeleton className="h-52 w-full" />}>
                <Await resolve={userTotals}>
                  {(resolvedUserTotals) => (
                    <PointsEarnedCard
                      totalPoints={
                        resolvedUserTotals.referral_points +
                        resolvedUserTotals.quest_points +
                        relicPoints.totalPoints +
                        parseInt(protocolFees.totalPoints)
                      }
                      activities={[
                        {
                          name: 'Portal',
                          points: resolvedUserTotals.quest_points,
                        },
                        {
                          name: 'Protocol',
                          points: parseInt(protocolFees.totalPoints),
                        },
                        {
                          name: 'NFT',
                          points: relicPoints.totalPoints,
                        },
                        {
                          name: 'Referrals',
                          points: resolvedUserTotals.referral_points,
                        },
                        {
                          name: 'Community',
                          points: 0,
                          disabled: true,
                        },
                      ]}
                    />
                  )}
                </Await>
              </Suspense>
            </div>
            <RelicPointCard
              relicsMintCount={mintCount}
              relicsHoldCount={relicHoldCount}
              relicsPoints={relicPoints.totalPoints}
            />
          </div>
        </div>
        <div id="referrals" className="space-y-5">
          <Text variant="headline">Referrals</Text>
          <Suspense fallback={<Skeleton className="h-52 w-full" />}>
            <Await resolve={inviteCodes} errorElement={<></>}>
              {(resolvedInviteCodes) => (
                <Await resolve={userTotals} errorElement={<></>}>
                  {(resolvedUserTotals) => (
                    <ReferralCard
                      points={resolvedUserTotals.referral_points}
                      inviteCodes={resolvedInviteCodes}
                    />
                  )}
                </Await>
              )}
            </Await>
          </Suspense>
        </div>
        <div className="flex flex-col gap-10 max-md:gap-5">
          <div className="space-y-5 max-md:space-y-3">
            <Text variant="headline">Quest Log</Text>
            <Text variant="body" className="text-foreground/70">
              {QUEST_LOG_DESCRIPTION}
            </Text>
          </div>
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 max-md:gap-5">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <Await resolve={details}>
                {(resolvedDetails) => (
                  <Link to={STANDARD_QUEST_SET.navigatePath} prefetch="intent">
                    <li className="col-span-1 h-full">
                      <QuestSetCard
                        imgSrc={STANDARD_QUEST_SET.imgSrc}
                        title={STANDARD_QUEST_SET.title}
                        description={STANDARD_QUEST_SET.description}
                        numberQuests={resolvedDetails.numQuests}
                        numberCompletedQuests={
                          resolvedDetails.numCompletedQuests
                        }
                      />
                    </li>
                  </Link>
                )}
              </Await>
            </Suspense>
            <li className="col-span-1 h-full">
              <QuestSetCard
                disabled
                imgSrc={COMING_SOON_QUEST_SET.imgSrc}
                title={COMING_SOON_QUEST_SET.title}
                description={COMING_SOON_QUEST_SET.description}
                numberQuests={0}
                numberCompletedQuests={0}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function UserHeader() {
  const { userWallet, userProfile } = useLoaderData<typeof loader>()

  function getUserName(userProfile: GetUserByWalletResponse) {
    if (userProfile?.display_name) {
      return userProfile.display_name
    }
    if (userProfile?.ens_name) {
      return userProfile.ens_name
    }
    if (isAddress(userWallet)) {
      return formatWalletAddress(userWallet)
    }
    return userWallet
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center space-x-4">
          <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3.5 w-16" />
          </div>
        </div>
      }
    >
      <Await resolve={userProfile}>
        {(userProfile) => {
          return (
            <ProfileCardHeader
              name={getUserName(userProfile as GetUserByWalletResponse)}
              id={userWallet}
              avatarSrc={userProfile?.image ?? undefined}
              link={`${BLOCK_EXPLORER_URL}/address/${userProfile.wallet}`}
            />
          )
        }}
      </Await>
    </Suspense>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="quest/index" />
}
