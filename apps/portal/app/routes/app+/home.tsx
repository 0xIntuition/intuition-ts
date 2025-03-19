import { Suspense, useCallback } from 'react'

import { EmptyStateCard, ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsWithPositionsDocument,
  GetAtomsWithPositionsQuery,
  GetAtomsWithPositionsQueryVariables,
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  useGetAtomsWithPositionsQuery,
  useGetListsQuery,
  useGetSignalsQuery,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import HomeBanner from '@components/home/home-banner'
import { HomeSectionHeader } from '@components/home/home-section-header'
import { HomeStatsHeader } from '@components/home/home-stats-header'
import { ActivityFeed } from '@components/list/activity'
import { ClaimsListNew } from '@components/list/claims'
import { IdentitiesListNew } from '@components/list/identities'
import { FeaturedListCarouselNew as FeaturedListCarousel } from '@components/lists/featured-lists-carousel'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { RevalidateButton } from '@components/revalidate-button'
import { ActivitySkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { getActivity } from '@lib/services/activity'
import { getFeaturedLists } from '@lib/services/lists'
import { getSystemStats } from '@lib/services/stats'
import { getFeaturedListObjectIds } from '@lib/utils/app'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useSearchParams } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, ZERO_ADDRESS } from 'app/consts'
import FullPageLayout from 'app/layouts/full-page-layout'
import { Atom } from 'app/types/atom'
import { Triple } from 'app/types/triple'

// Default pagination values
const DEFAULT_PAGE_SIZE = 5
const DEFAULT_PAGE = 1

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  const wallet = user?.wallet?.address
    ? user.wallet.address.toLowerCase()
    : ZERO_ADDRESS

  const url = new URL(request.url)

  // Activity feed pagination
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  // Top users pagination
  const userLimit = parseInt(
    url.searchParams.get('userLimit') || String(DEFAULT_PAGE_SIZE),
  )
  const userPage = parseInt(
    url.searchParams.get('userPage') || String(DEFAULT_PAGE),
  )
  const userOffset = (userPage - 1) * userLimit

  // Top claims pagination
  const claimLimit = parseInt(
    url.searchParams.get('claimLimit') || String(DEFAULT_PAGE_SIZE),
  )
  const claimPage = parseInt(
    url.searchParams.get('claimPage') || String(DEFAULT_PAGE),
  )
  const claimOffset = (claimPage - 1) * claimLimit

  const queryClient = new QueryClient()

  // Prefetch top users (replacing IdentitiesService.searchIdentity)
  await queryClient.prefetchQuery({
    queryKey: [
      'get-top-users',
      {
        limit: userLimit,
        offset: userOffset,
        orderBy: [{ vault: { total_shares: 'desc' } }],
        where: { type: { _eq: 'Account' } },
        address: wallet,
      },
    ],
    queryFn: () =>
      fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(
        GetAtomsWithPositionsDocument,
        {
          limit: userLimit,
          offset: userOffset,
          orderBy: [{ vault: { total_shares: 'desc' } }],
          where: { type: { _eq: 'Account' } },
          address: wallet,
        },
      )(),
  })

  // Prefetch top claims (replacing ClaimsService.getClaims)
  await queryClient.prefetchQuery({
    queryKey: [
      'get-top-claims',
      {
        limit: claimLimit,
        offset: claimOffset,
        orderBy: [{ vault: { total_shares: 'desc' } }],
        address: wallet,
      },
    ],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        limit: claimLimit,
        offset: claimOffset,
        orderBy: [{ vault: { total_shares: 'desc' } }],
        address: wallet,
      })(),
  })

  return defer({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      wallet,
      userLimit,
      userPage,
      claimLimit,
      claimPage,
    },
    featuredListsParams: await getFeaturedLists({
      request,
      listIds: getFeaturedListObjectIds(CURRENT_ENV),
      queryClient,
    }),
    systemStats: getSystemStats({ queryClient }),
    activity: getActivity({ queryClient }),
    activityParams: {
      activityLimit,
      activityOffset,
    },
  })
}

export default function HomePage() {
  const { featuredListsParams, activityParams, initialParams } =
    useLoaderData<typeof loader>()
  const wallet = initialParams.wallet
  const [searchParams, setSearchParams] = useSearchParams()

  // Activity feed pagination
  const activityLimit = parseInt(
    searchParams.get('activityLimit') || String(activityParams.activityLimit),
  )
  const activityOffset = parseInt(
    searchParams.get('activityOffset') || String(activityParams.activityOffset),
  )

  // Top users pagination
  const userLimit = parseInt(
    searchParams.get('userLimit') || String(initialParams.userLimit),
  )
  const userPage = parseInt(
    searchParams.get('userPage') || String(initialParams.userPage),
  )
  const userOffset = (userPage - 1) * userLimit

  // Top claims pagination
  const claimLimit = parseInt(
    searchParams.get('claimLimit') || String(initialParams.claimLimit),
  )
  const claimPage = parseInt(
    searchParams.get('claimPage') || String(initialParams.claimPage),
  )
  const claimOffset = (claimPage - 1) * claimLimit

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

  const { data: topUsersData } = useGetAtomsWithPositionsQuery(
    {
      limit: userLimit,
      offset: userOffset,
      orderBy: [{ vault: { total_shares: 'desc' } }],
      where: { type: { _eq: 'Account' } },
      address: wallet,
    },
    {
      queryKey: [
        'get-top-users',
        {
          limit: userLimit,
          offset: userOffset,
          orderBy: [{ vault: { total_shares: 'desc' } }],
          where: { type: { _eq: 'Account' } },
          address: wallet,
        },
      ],
    },
  )

  const { data: topClaimsData } = useGetTriplesWithPositionsQuery(
    {
      limit: claimLimit,
      offset: claimOffset,
      orderBy: [{ vault: { total_shares: 'desc' } }],
      address: wallet,
    },
    {
      queryKey: [
        'get-top-claims',
        {
          limit: claimLimit,
          offset: claimOffset,
          orderBy: [{ vault: { total_shares: 'desc' } }],
          address: wallet,
        },
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

  // Handle pagination for users
  const handleUserPaginationChange = useCallback(
    (page: number, limit: number) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('userPage', String(page))
      if (limit !== initialParams.userLimit) {
        newParams.set('userLimit', String(limit))
      }
      setSearchParams(newParams, { replace: true })
    },
    [searchParams, setSearchParams, initialParams.userLimit],
  )

  // Handle pagination for claims
  const handleClaimPaginationChange = useCallback(
    (page: number, limit: number) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('claimPage', String(page))
      if (limit !== initialParams.claimLimit) {
        newParams.set('claimLimit', String(limit))
      }
      setSearchParams(newParams, { replace: true })
    },
    [searchParams, setSearchParams, initialParams.claimLimit],
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
            {topClaimsData?.triples?.length ? (
              <ClaimsListNew
                claims={topClaimsData.triples as Triple[]}
                pagination={{
                  currentPage: claimPage,
                  limit: claimLimit,
                  totalEntries: topClaimsData.total?.aggregate?.count || 0,
                  totalPages: Math.ceil(
                    (topClaimsData.total?.aggregate?.count || 0) / claimLimit,
                  ),
                }}
                paramPrefix="claim"
                enableHeader={false}
                enableSearch={false}
                enableSort={false}
                onPageChange={(page: number) =>
                  handleClaimPaginationChange(page, claimLimit)
                }
                onLimitChange={(limit: number) =>
                  handleClaimPaginationChange(claimPage, limit)
                }
              />
            ) : (
              <EmptyStateCard message="No claims found." />
            )}
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
            {topUsersData?.atoms?.length ? (
              <IdentitiesListNew
                identities={topUsersData.atoms as Atom[]}
                pagination={{
                  currentPage: userPage,
                  limit: userLimit,
                  totalEntries: topUsersData.total?.aggregate?.count || 0,
                  totalPages: Math.ceil(
                    (topUsersData.total?.aggregate?.count || 0) / userLimit,
                  ),
                }}
                paramPrefix="user"
                enableHeader={false}
                enableSearch={false}
                enableSort={false}
                onPageChange={(page: number) =>
                  handleUserPaginationChange(page, userLimit)
                }
                onLimitChange={(limit: number) =>
                  handleUserPaginationChange(userPage, limit)
                }
              />
            ) : (
              <EmptyStateCard message="No users found." />
            )}
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
