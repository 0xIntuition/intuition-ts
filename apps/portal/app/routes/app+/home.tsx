import { Suspense } from 'react'

import { EmptyStateCard, ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  ActivityPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  SortDirection,
} from '@0xintuition/api'

import { HomeSectionHeader } from '@components/home/home-section-header'
import { HomeStatsHeader } from '@components/home/home-stats-header'
import { ActivityList } from '@components/list/activity'
import { ClaimsList } from '@components/list/claims'
import { IdentitiesList } from '@components/list/identities'
import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/list/list-skeletons'
import { RevalidateButton } from '@components/revalidate-button'
import {
  ActivitySkeleton,
  HomeStatsHeaderSkeleton,
  PaginatedListSkeleton,
} from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getActivity } from '@lib/services/activity'
import { getFeaturedLists } from '@lib/services/lists'
import { getSystemStats } from '@lib/services/stats'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { FEATURED_LIST_OBJECT_IDS, NO_WALLET_ERROR } from 'app/consts'
import FullPageLayout from 'app/layouts/full-page-layout'
import { PaginationType } from 'app/types'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const activitySearchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

  return defer({
    systemStats: getSystemStats({ request }),
    topUsers: fetchWrapper(request, {
      method: IdentitiesService.searchIdentity,
      args: {
        limit: 5,
        direction: SortDirection.DESC,
        sortBy: 'AssetsSum',
        isUser: true,
      },
    }),
    topClaims: fetchWrapper(request, {
      method: ClaimsService.getClaims,
      args: {
        limit: 5,
        direction: SortDirection.DESC,
        sortBy: 'AssetsSum',
      },
    }),

    featuredLists: getFeaturedLists({
      request,
      listIds: FEATURED_LIST_OBJECT_IDS,
    }),
    activity: getActivity({ request, searchParams: activitySearchParams }),
  })
}

export default function HomePage() {
  const { systemStats, topUsers, topClaims, featuredLists, activity } =
    useLiveLoader<typeof loader>(['attest', 'create'])

  return (
    <FullPageLayout>
      <div className="w-full flex flex-col gap-6">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground self-start w-full"
        >
          Intuition System Stats
        </Text>
        <Suspense fallback={<HomeStatsHeaderSkeleton />}>
          <Await
            resolve={systemStats}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedStats) => (
              <HomeStatsHeader
                totalIdentities={resolvedStats.totalIdentities}
                totalClaims={resolvedStats.totalClaims}
                totalUsers={resolvedStats.totalUsers}
                totalStaked={
                  Number(formatBalance(resolvedStats.totalStaked, 18, 4)) || 0
                }
                totalSignals={resolvedStats.totalSignals || 0}
              />
            )}
          </Await>
        </Suspense>
        <HomeSectionHeader
          title="Featured Lists"
          buttonText="Explore Lists"
          buttonLink="/app/explore/lists"
        />
        <Suspense
          fallback={
            <ListClaimsSkeletonLayout
              totalItems={6}
              enableSearch={false}
              enableSort={false}
            />
          }
        >
          <Await
            resolve={featuredLists}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedFeaturedLists) => {
              if (
                !resolvedFeaturedLists ||
                resolvedFeaturedLists.featuredLists.length === 0
              ) {
                return <EmptyStateCard message="No lists found." />
              }
              return (
                <ListClaimsList
                  listClaims={resolvedFeaturedLists.featuredLists}
                  enableSort={false}
                  enableSearch={false}
                  columns={3}
                />
              )
            }}
          </Await>
        </Suspense>
        <HomeSectionHeader
          title="Top Claims"
          buttonText="Explore Claims"
          buttonLink="/app/explore/claims"
        />
        <Suspense
          fallback={
            <PaginatedListSkeleton enableSearch={false} enableSort={false} />
          }
        >
          <Await
            resolve={topClaims}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedClaims) => {
              if (!resolvedClaims || resolvedClaims.data.length === 0) {
                return <EmptyStateCard message="No claims found." />
              }
              return (
                <ClaimsList
                  claims={resolvedClaims.data}
                  paramPrefix="claims"
                  enableHeader={false}
                  enableSearch={false}
                  enableSort={false}
                />
              )
            }}
          </Await>
        </Suspense>
        <HomeSectionHeader
          title="Top Users"
          buttonText="Explore Users"
          buttonLink="/app/explore/users"
        />
        <Suspense
          fallback={
            <PaginatedListSkeleton enableSearch={false} enableSort={false} />
          }
        >
          <Await
            resolve={topUsers}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedTopUsers) => {
              if (!resolvedTopUsers || resolvedTopUsers.data.length === 0) {
                return <EmptyStateCard message="No users found." />
              }
              return (
                <IdentitiesList
                  identities={resolvedTopUsers.data}
                  enalbeHeader={false}
                  enableSearch={false}
                  enableSort={false}
                />
              )
            }}
          </Await>
        </Suspense>
        <HomeSectionHeader
          title="Global Feed"
          buttonText="Open Feed"
          buttonLink="/app/activity/global"
        />
        <Suspense fallback={<ActivitySkeleton />}>
          <Await
            resolve={activity}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedActivity) => (
              <ActivityList
                activities={resolvedActivity.activity as ActivityPresenter[]}
                pagination={resolvedActivity.pagination as PaginationType}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </FullPageLayout>
  )
}
