import { Suspense } from 'react'

import {
  formatWalletAddress,
  QuestSetCard,
  QuestSetProgressCard,
  Separator,
  Skeleton,
  Text,
} from '@0xintuition/1ui'
import { ProfileCardHeader } from '@0xintuition/1ui/src/components/ProfileCard/components'
import { GetUserByWalletResponse } from '@0xintuition/api'

import questPlaceholder from '@assets/quest-placeholder.png'
import { QUEST_LOG_DESCRIPTION } from '@lib/utils/constants/quest'
import { getUserByWallet } from '@lib/utils/fetches'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, Link, useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { isAddress } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, 'Unauthorized')

  const userProfile = getUserByWallet(userWallet)

  return defer({
    userWallet,
    userProfile,
  })
}

export default function Quests() {
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
              <QuestSetProgressCard
                imgSrc={questPlaceholder}
                title={'Tutorial Island: The Primitive Elements'}
                numberQuests={10}
                numberCompletedQuests={5}
                onButtonClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
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
          <div className="bg-warning/5 rounded-lg theme-border p-5 flex justify-center align-items h-[360px] border-warning/30 text-warning/30 text-bold border-dashed">
            Invites
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="space-y-5">
            <Text variant="headline">Quest Log</Text>
            <Text variant="body" className="text-foreground/70">
              {QUEST_LOG_DESCRIPTION}
            </Text>
          </div>
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Link to={`/app/quest/book/${i}`} key={`${i}-quest-card`}>
                <li className="col-span-1 h-full">
                  <QuestSetCard
                    disabled={i === 1}
                    imgSrc={questPlaceholder}
                    title={
                      i === 1
                        ? 'Coming soon'
                        : 'Tutorial Island: The Primitive Elements'
                    }
                    description={
                      'Something inside you stirs, urging you to rekindle and reclaim humanity’s lost intuition...'
                    }
                    numberQuests={12}
                    numberCompletedQuests={0}
                  />
                </li>
              </Link>
            ))}
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
              name={getUserName(userProfile)}
              walletAddress={userWallet}
              avatarSrc={userProfile?.image ?? undefined}
            />
          )
        }}
      </Await>
    </Suspense>
  )
}
