import { Suspense } from 'react'

import { ErrorStateCard, Text } from '@0xintuition/1ui'
import { useGetListsQuery, useGetSignalsQuery } from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import HomeBanner from '@components/home/home-banner'
import { HomeSectionHeader } from '@components/home/home-section-header'
import { HomeStatsHeader } from '@components/home/home-stats-header'
import { ActivityFeed } from '@components/list/activity'
import { FeaturedListCarouselNew as FeaturedListCarousel } from '@components/lists/featured-lists-carousel'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { RevalidateButton } from '@components/revalidate-button'
import { ActivitySkeleton } from '@components/skeleton'
import { getActivity } from '@lib/services/activity'
import { getFeaturedLists } from '@lib/services/lists'
import { getSystemStats } from '@lib/services/stats'
import { getFeaturedListObjectIds } from '@lib/utils/app'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useSearchParams } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_WALLET_ERROR } from 'app/consts'
import FullPageLayout from 'app/layouts/full-page-layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  return defer({
    dehydratedState: dehydrate(queryClient),
    featuredListsParams: await getFeaturedLists({
      request,
      listIds: getFeaturedListObjectIds(CURRENT_ENV),
      queryClient,
    }),
    systemStats: getSystemStats({ queryClient }),
    // topUsers: fetchWrapper(request, {
    //   method: IdentitiesService.searchIdentity,
    //   args: {
    //     limit: 5,
    //     direction: SortDirection.DESC,
    //     sortBy: 'AssetsSum',
    //     isUser: true,
    //   },
    // }),
    // topClaims: fetchWrapper(request, {
    //   method: ClaimsService.getClaims,
    //   args: {
    //     limit: 5,
    //     direction: SortDirection.DESC,
    //     sortBy: 'AssetsSum',
    //   },
    // }),
    activity: getActivity({ queryClient }),
    activityParams: {
      activityLimit,
      activityOffset,
    },
  })
}

export default function HomePage() {
  const { featuredListsParams, activityParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()

  const activityLimit = parseInt(
    searchParams.get('activityLimit') || String(activityParams.activityLimit),
  )
  const activityOffset = parseInt(
    searchParams.get('activityOffset') || String(activityParams.activityOffset),
  )

  const { data: resolvedFeaturedLists } = useGetListsQuery(
    {
      where: featuredListsParams.initialParams.listsWhere,
    },
    {
      queryKey: [
        'get-featured-lists',
        { where: featuredListsParams.initialParams.listsWhere },
      ],
    },
  )

  const { data: signalsData } = useGetSignalsQuery(
    {
      limit: activityLimit,
      offset: activityOffset,
      addresses: [],
      orderBy: [{ block_timestamp: 'desc' }],
    },
    {
      queryKey: [
        'get-signals-global',
        {
          limit: activityLimit,
          offset: activityOffset,
          where: {
            type: {
              _neq: 'FeesTransfered',
            },
          },
        },
      ],
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
          <HomeStatsHeader />
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
            <FeaturedListCarousel
              lists={resolvedFeaturedLists?.predicate_objects ?? []}
            />
          </Suspense>
        </div>
        {/* <div className="flex flex-col gap-4">
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
                    enableHeader={false}
                    enableSearch={false}
                    enableSort={false}
                  />
                )
              }}
            </Await>
          </Suspense>
        </div> */}
        <div className="flex flex-col gap-4">
          <HomeSectionHeader
            title="Global Feed"
            buttonText="Open Feed"
            buttonLink="/app/activity/global"
          />
          <Suspense fallback={<ActivitySkeleton />}>
            <Await
              resolve={signalsData}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedSignals) => (
                <ActivityFeed
                  activities={{
                    signals: resolvedSignals?.signals || [],
                    total: {
                      aggregate: {
                        count: resolvedSignals?.total.aggregate?.count || 0,
                      },
                    },
                  }}
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
