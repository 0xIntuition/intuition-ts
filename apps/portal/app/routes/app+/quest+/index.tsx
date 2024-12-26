import { Suspense } from 'react'

import {
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
import { QuestSetProgressCard } from '@components/quest/quest-set-progress-card'
import { ReferralCard } from '@components/referral-card/referral-card'
import RelicPointCard from '@components/relic-point-card/relic-point-card'
import { useRelicCounts } from '@lib/hooks/useRelicCounts'
import { calculatePointsFromFees, invariant } from '@lib/utils/misc'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getQuestsProgress } from '@server/quest'
import {
  BLOCK_EXPLORER_URL,
  HEADER_BANNER_HELP_CENTER,
  STANDARD_QUEST_SET,
} from 'app/consts'
import { isAddress } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, 'Unauthorized')

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
  }
}

export default function Quests() {
  const { userTotals, inviteCodes, userWallet, details } =
    useLoaderData<typeof loader>()
  const { mintCount, holdCount, totalNftPoints } = useRelicCounts(userWallet)

  return (
    <div className="p-10 w-full max-w-7xl mx-auto flex flex-col gap-5 max-md:p-5 max-sm:p-2">
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
                        totalNftPoints +
                        calculatePointsFromFees(
                          resolvedUserTotals.total_protocol_fee_paid,
                        )
                      }
                      activities={[
                        {
                          name: 'Portal',
                          points: resolvedUserTotals.quest_points,
                        },
                        {
                          name: 'Protocol',
                          points: calculatePointsFromFees(
                            resolvedUserTotals.total_protocol_fee_paid,
                          ),
                        },
                        {
                          name: 'NFT',
                          points: totalNftPoints,
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
              relicsHoldCount={holdCount}
              relicsPoints={totalNftPoints}
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
