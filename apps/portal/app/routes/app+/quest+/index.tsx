import { Suspense } from 'react'

import {
  formatWalletAddress,
  Separator,
  Skeleton,
  Text,
} from '@0xintuition/1ui'
import { ProfileCardHeader } from '@0xintuition/1ui/src/components/ProfileCard/components'
import { GetUserByWalletResponse, UsersService } from '@0xintuition/api'

import { QuestSetCard } from '@components/quest/quest-set-card'
import { QuestSetProgressCard } from '@components/quest/quest-set-progress-card'
import { ReferralCard } from '@components/referral-card/referral-card'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, Link, useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { fetchQuestNarrativeProgress } from '@server/quest'
import {
  COMING_SOON_QUEST_SET,
  QUEST_LOG_DESCRIPTION,
  STANDARD_QUEST_SET,
} from 'consts'
import { isAddress } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, 'Unauthorized')

  const userProfile = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: userWallet,
    },
  })

  const standardQuestsProgress = fetchQuestNarrativeProgress('Standard')

  return defer({
    userWallet,
    userProfile,
    standardQuestsProgress,
  })
}

// TODO: Remove this once we are getting the data from BE.
const mockReferralData = {
  points: 2100,
  inviteCodes: [
    {
      code: 'M9W5B',
      isActivated: true,
      identity: {
        id: '1',
        name: 'Sophie Nélisse',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
    },
    {
      code: 'H6K9Q1',
      isActivated: true,
      identity: {
        id: '2',
        name: 'Mia Rodriguez',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
    },
    {
      code: 'T3R7F9',
      isActivated: false,
    },
    {
      code: 'L2P8X6',
      isActivated: false,
    },
  ],
}

export default function Quests() {
  const { standardQuestsProgress } = useLoaderData<typeof loader>()

  return (
    <div className="p-10 w-full max-w-7xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <UserHeader />
        </div>
        <Separator className="mb-5" />
      </div>
      <div className="flex flex-col gap-16">
        <div>
          <div className="flex gap-10">
            <div className="flex-shrink-0 min-w-[256px] w-1/3">
              <div className="bg-warning/5 rounded-lg theme-border p-5 flex justify-center align-items h-full border-warning/30 text-warning/30 text-bold border-dashed">
                Points
              </div>
            </div>
            <div className="flex-1">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <Await resolve={standardQuestsProgress}>
                  {(progress) => (
                    <QuestSetProgressCard
                      imgSrc={STANDARD_QUEST_SET.imgSrc}
                      title={STANDARD_QUEST_SET.title}
                      numberQuests={progress.numQuests}
                      numberCompletedQuests={progress.numCompletedQuests}
                      to={STANDARD_QUEST_SET.navigatePath}
                    />
                  )}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <Text variant="headline">Your Inventory</Text>
          <div className="bg-warning/5 rounded-lg theme-border p-5 flex justify-center align-items h-96 border-warning/30 border-dashed text-warning/30 text-bold">
            Relics
          </div>
        </div>
        <div className="space-y-5">
          <Text variant="headline">Referrals</Text>
          <ReferralCard
            points={mockReferralData.points}
            inviteCodes={mockReferralData.inviteCodes}
          />
        </div>
        <div className="flex flex-col gap-10">
          <div className="space-y-5">
            <Text variant="headline">Quest Log</Text>
            <Text variant="body" className="text-foreground/70">
              {QUEST_LOG_DESCRIPTION}
            </Text>
          </div>
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <Await resolve={standardQuestsProgress}>
                {(progress) => (
                  <Link to={STANDARD_QUEST_SET.navigatePath} prefetch="intent">
                    <li className="col-span-1 h-full">
                      <QuestSetCard
                        imgSrc={STANDARD_QUEST_SET.imgSrc}
                        title={STANDARD_QUEST_SET.title}
                        description={STANDARD_QUEST_SET.description}
                        numberQuests={progress.numQuests}
                        numberCompletedQuests={progress.numCompletedQuests}
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
              walletAddress={userWallet}
              avatarSrc={userProfile?.image ?? undefined}
            />
          )
        }}
      </Await>
    </Suspense>
  )
}
