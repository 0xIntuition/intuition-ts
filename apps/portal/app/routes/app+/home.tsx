import { Suspense } from 'react'

import { EmptyStateCard, ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  ActivityPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  SortDirection,
} from '@0xintuition/api'
import {
  fetcher,
  GetStatsDocument,
  GetStatsQuery,
  useGetStatsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import HomeBanner from '@components/home/home-banner'
import { HomeSectionHeader } from '@components/home/home-section-header'
import { HomeStatsHeader } from '@components/home/home-stats-header'
import { ActivityList } from '@components/list/activity'
import { ClaimsList } from '@components/list/claims'
import { IdentitiesList } from '@components/list/identities'
import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { RevalidateButton } from '@components/revalidate-button'
import {
  ActivitySkeleton,
  HomeStatsHeaderSkeleton,
  PaginatedListSkeleton,
} from '@components/skeleton'
import { getActivity } from '@lib/services/activity'
import { getFeaturedLists } from '@lib/services/lists'
import { getFeaturedListObjectIds } from '@lib/utils/app'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_WALLET_ERROR } from 'app/consts'
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

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['GetStats'],
    queryFn: () => fetcher(GetStatsDocument)(),
  })

  const systemStats = queryClient.getQueryData<GetStatsQuery>(['GetStats'])

  return defer({
    systemStats,
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
      listIds: getFeaturedListObjectIds(CURRENT_ENV),
    }),
    activity: getActivity({ request, searchParams: activitySearchParams }),
  })
}

export default function HomePage() {
  const { topUsers, topClaims, featuredLists, activity } =
    useLoaderData<typeof loader>()

  const { data: systemStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['GetStats'],
    },
  )

  return (
    <FullPageLayout>
      <div className="w-full flex flex-col gap-12">
        <HomeBanner />
        <div className="flex flex-col gap-4">
          <Text
            variant="headline"
            weight="medium"
            className="text-secondary-foreground self-start w-full"
          >
            System Stats
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
              {(resolvedStats) => {
                if (!resolvedStats?.stats?.[0]) {
                  return <ErrorStateCard message="No stats data available" />
                }

                const stats = resolvedStats.stats[0]
                return (
                  <HomeStatsHeader
                    totalIdentities={stats.totalAtoms}
                    totalClaims={stats.totalTriples}
                    totalUsers={stats.totalAccounts}
                    totalStaked={stats.contractBalance}
                    totalSignals={stats.totalSignals}
                  />
                )
              }}
            </Await>
          </Suspense>
        </div>
        <div className="flex flex-col gap-4">
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
        </div>
        <div className="flex flex-col gap-4">
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
        </div>
        <div className="flex flex-col gap-4">
          <HomeSectionHeader
            title="Top Users"
            buttonText="Explore Users"
            buttonLink="/app/explore/identities?identity=&tagIds=&isUser=true"
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
        </div>
        <div className="flex flex-col gap-4">
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
      </div>
    </FullPageLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="home" />
}
