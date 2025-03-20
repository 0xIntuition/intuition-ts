import { ReactNode, Suspense } from 'react'

import {
  ErrorStateCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsWithPositionsDocument,
  GetAtomsWithPositionsQuery,
  GetAtomsWithPositionsQueryVariables,
  GetPositionsDocument,
  GetPositionsQuery,
  GetPositionsQueryVariables,
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  useGetAccountQuery,
  useGetAtomsWithPositionsQuery,
  useGetPositionsQuery,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ActivePositionsOnClaimsNew as ActivePositionsOnClaims } from '@components/list/active-positions-on-claims'
import { ActivePositionsOnIdentitiesNew as ActivePositionsOnIdentities } from '@components/list/active-positions-on-identities'
import { ClaimsListNew as ClaimsList } from '@components/list/claims'
import { IdentitiesListNew as IdentitiesList } from '@components/list/identities'
import {
  DataCreatedHeaderNew as DataCreatedHeader,
  DataCreatedHeaderVariants,
  DataCreatedHeaderVariantType,
} from '@components/profile/data-created-header'
import { RevalidateButton } from '@components/revalidate-button'
import {
  DataHeaderSkeleton,
  PaginatedListSkeleton,
  TabsSkeleton,
} from '@components/skeleton'
import logger from '@lib/utils/logger'
import { calculateTotalPages, formatBalance, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { getUser, getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NO_WALLET_ERROR } from 'app/consts'
import { Atom } from 'app/types/atom'
import { PaginationType } from 'app/types/pagination'
import { Triple } from 'app/types/triple'

// Helper function to map GraphQL response to Triple type
const mapToTriples = (
  triples: GetTriplesWithPositionsQuery['triples'],
): Triple[] => {
  if (!triples) {
    return []
  }

  return triples.map((triple) => triple as unknown as Triple)
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)
  const userWallet = user.wallet?.address
  const queryAddress = userWallet.toLowerCase()

  const url = new URL(request.url)
  // const searchParams = new URLSearchParams(url.search)
  const searchParams = new URLSearchParams(url.search)
  const queryClient = new QueryClient()

  // Get standard pagination params for identities tab
  const { page: identityPage, limit: identityLimit } = getStandardPageParams({
    searchParams,
    paramPrefix: 'identity',
  })
  const identitySortBy = searchParams.get('identitySortBy') || 'block_timestamp'

  // Get standard pagination params for claims tab
  const { page: claimsPage, limit: claimsLimit } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdClaims',
  })
  const claimsSortBy =
    searchParams.get('createdClaimsSortBy') || 'block_timestamp'

  // TODO: once we fully fix sort/pagination, we'll want to update these to use triples instead of claims, and orderBy instead of sortBy in the actual query params

  const atomsWhere = {
    creator: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const triplesWhere = {
    creator: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const atomPositionsWhere = {
    account_id: {
      _eq: queryAddress,
    },
    vault: {
      triple_id: {
        _is_null: true,
      },
    },
  }

  // this query is effectively the same as using a Claims query, but this query is more flexible
  const triplePositionsWhere = {
    accountId: {
      _eq: queryAddress,
    },
    vault: {
      atom_id: {
        _is_null: true,
      },
    },
  }

  const atomsLimit = identityLimit
  const atomsOffset = (identityPage - 1) * identityLimit
  const atomsOrderBy = identitySortBy

  const triplesLimit = claimsLimit
  const triplesOffset = (claimsPage - 1) * claimsLimit
  const triplesOrderBy = claimsSortBy

  const atomPositionsLimit = parseInt(
    url.searchParams.get('claimsLimit') || '10',
  )
  const atomPositionsOffset = parseInt(
    url.searchParams.get('claimsOffset') || '0',
  )
  const atomPositionsOrderBy = url.searchParams.get('claimsSortBy')
    ? [{ [url.searchParams.get('claimsSortBy')!]: 'desc' }]
    : undefined

  const triplePositionsLimit = parseInt(
    url.searchParams.get('claimsLimit') || '10',
  )
  const triplePositionsOffset = parseInt(
    url.searchParams.get('claimsOffset') || '0',
  )

  const triplePositionsOrderBy = url.searchParams.get('claimsSortBy')
    ? [{ [url.searchParams.get('claimsSortBy')!]: 'desc' }]
    : undefined
  await queryClient.prefetchQuery({
    queryKey: [
      'get-atoms-with-positions',
      {
        atomsWhere,
        atomsLimit,
        atomsOffset,
        atomsOrderBy,
        address: queryAddress,
      },
    ],
    queryFn: () =>
      fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(
        GetAtomsWithPositionsDocument,
        {
          where: atomsWhere,
          limit: atomsLimit,
          offset: atomsOffset,
          orderBy: atomsOrderBy ? [{ [atomsOrderBy]: 'desc' }] : undefined,
          address: queryAddress,
        },
      )(),
  })

  const atomsData = await queryClient.fetchQuery({
    queryKey: ['get-atoms-count', { where: atomsWhere }],
    queryFn: () =>
      fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(
        GetAtomsWithPositionsDocument,
        {
          where: atomsWhere,
          address: queryAddress,
        },
      )(),
  })

  const atomsCount = atomsData?.total?.aggregate?.count ?? 0
  const atomsTotalPages = calculateTotalPages(atomsCount, identityLimit)

  await queryClient.prefetchQuery({
    queryKey: [
      'get-triples-with-positions',
      {
        triplesWhere,
        triplesLimit,
        triplesOffset,
        triplesOrderBy,
        address: queryAddress,
      },
    ],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: triplesWhere,
        limit: triplesLimit,
        offset: triplesOffset,
        orderBy: triplesOrderBy ? [{ [triplesOrderBy]: 'desc' }] : undefined,
        address: queryAddress,
      })(),
  })

  const triplesData = await queryClient.fetchQuery({
    queryKey: ['get-triples-count', { where: triplesWhere }],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: triplesWhere,
        address: queryAddress,
      })(),
  })

  const triplesCount = triplesData?.total?.aggregate?.count ?? 0
  const triplesTotalPages = calculateTotalPages(triplesCount, claimsLimit)

  await queryClient.prefetchQuery({
    queryKey: ['get-atom-positions', { where: atomPositionsWhere }],
    queryFn: () =>
      fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
        GetPositionsDocument,
        {
          where: atomPositionsWhere,
          limit: atomPositionsLimit,
          offset: atomPositionsOffset,
          orderBy: atomPositionsOrderBy,
        },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-triple-positions', { where: triplePositionsWhere }],
    queryFn: () =>
      fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
        GetPositionsDocument,
        {
          where: triplePositionsWhere,
          limit: triplePositionsLimit,
          offset: triplePositionsOffset,
          orderBy: triplePositionsOrderBy,
        },
      )(),
  })

  return json({
    queryAddress,
    identitiesPagination: {
      currentPage: identityPage,
      limit: identityLimit,
      totalEntries: atomsCount,
      totalPages: atomsTotalPages,
    } as PaginationType,
    claimsPagination: {
      currentPage: claimsPage,
      limit: claimsLimit,
      totalEntries: triplesCount,
      totalPages: triplesTotalPages,
    } as PaginationType,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      atomsLimit,
      atomsOffset,
      atomsOrderBy,
      atomsWhere,
      triplesLimit,
      triplesOffset,
      triplesOrderBy,
      triplesWhere,
      atomPositionsLimit,
      atomPositionsOffset,
      atomPositionsOrderBy,
      atomPositionsWhere,
      triplePositionsLimit,
      triplePositionsOffset,
      triplePositionsOrderBy,
      triplePositionsWhere,
      queryAddress,
    },
  })
}

const TabContent = ({
  value,
  totalResults,
  totalStake,
  variant,
  children,
  atomImage,
  atomLabel,
}: {
  value: string
  variant: DataCreatedHeaderVariantType
  totalStake?: number
  totalResults?: number
  atomImage?: string
  atomLabel?: string
  children?: ReactNode
}) => {
  return (
    <TabsContent value={value} className="flex flex-col w-full gap-6">
      <DataCreatedHeader
        variant={variant}
        atomLabel={atomLabel}
        atomImage={atomImage}
        totalResults={totalResults}
        totalStake={totalStake}
      />
      {children}
    </TabsContent>
  )
}

export default function ProfileDataCreated() {
  const {
    queryAddress,
    initialParams,
    identitiesPagination,
    claimsPagination,
  } = useLoaderData<typeof loader>()
  const submit = useSubmit()
  const [searchParams] = useSearchParams()
  const positionDirection = searchParams.get('positionDirection')

  // Add pagination handlers
  const handlePageChange = (page: number) => {
    const formData = new FormData()
    formData.append('page', page.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleLimitChange = (limit: number) => {
    const formData = new FormData()
    formData.append('limit', limit.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const { data: accountResult } = useGetAccountQuery(
    {
      address: queryAddress,
    },
    {
      queryKey: ['get-account', { address: queryAddress }],
    },
  )

  logger('accountResult', accountResult)

  const {
    data: atomsCreatedResult,
    isLoading: isLoadingAtomsCreated,
    isError: isErrorAtomsCreated,
    error: errorAtomsCreated,
  } = useGetAtomsWithPositionsQuery(
    {
      where: initialParams.atomsWhere,
      limit: initialParams.atomsLimit,
      offset: initialParams.atomsOffset,
      orderBy: initialParams.atomsOrderBy
        ? [{ [initialParams.atomsOrderBy]: 'desc' }]
        : undefined,
      address: queryAddress,
    },
    {
      queryKey: [
        'get-atoms-with-positions',
        {
          where: initialParams.atomsWhere,
          limit: initialParams.atomsLimit,
          offset: initialParams.atomsOffset,
          orderBy: initialParams.atomsOrderBy,
          address: initialParams.queryAddress,
        },
      ],
    },
  )

  logger('Atoms Created Result (Client):', atomsCreatedResult)

  const {
    data: triplesCreatedResult,
    isLoading: isLoadingTriplesCreated,
    isError: isErrorTriplesCreated,
    error: errorTriplesCreated,
  } = useGetTriplesWithPositionsQuery(
    {
      where: initialParams.triplesWhere,
      limit: initialParams.triplesLimit,
      offset: initialParams.triplesOffset,
      orderBy: initialParams.triplesOrderBy
        ? [{ [initialParams.triplesOrderBy]: 'desc' }]
        : [
            {
              vault: {
                total_shares: 'desc',
              },
            },
          ],
      address: queryAddress,
    },

    {
      queryKey: [
        'get-triples-with-positions',
        {
          where: initialParams.triplesWhere,
          limit: initialParams.triplesLimit,
          offset: initialParams.triplesOffset,
          orderBy: initialParams.triplesOrderBy,
          address: queryAddress,
        },
      ],
    },
  )

  logger('Triples Created Result (Client):', triplesCreatedResult)

  const {
    data: atomPositionsResult,
    isLoading: isLoadingAtomPositions,
    isError: isErrorAtomPositions,
    error: errorAtomPositions,
  } = useGetPositionsQuery(
    {
      where: initialParams.atomPositionsWhere,
      limit: initialParams.atomPositionsLimit,
      offset: initialParams.atomPositionsOffset,
      orderBy: initialParams.atomPositionsOrderBy,
    },
    {
      queryKey: [
        'get-atom-positions',
        {
          where: initialParams.atomPositionsWhere,
          limit: initialParams.atomPositionsLimit,
          offset: initialParams.atomPositionsOffset,
          orderBy: initialParams.atomPositionsOrderBy,
        },
      ],
    },
  )

  logger('Atom Positions Result (Client):', atomPositionsResult)

  const {
    data: triplePositionsResult,
    isLoading: isLoadingTriplePositions,
    isError: isErrorTriplePositions,
    error: errorTriplePositions,
  } = useGetPositionsQuery(
    {
      where: initialParams.triplePositionsWhere,
      limit: initialParams.triplePositionsLimit,
      offset: initialParams.triplePositionsOffset,
      orderBy: initialParams.triplePositionsOrderBy,
    },
    {
      queryKey: [
        'get-triple-positions',
        {
          where: initialParams.triplePositionsWhere,
          limit: initialParams.triplePositionsLimit,
          offset: initialParams.triplePositionsOffset,
          orderBy: initialParams.triplePositionsOrderBy,
        },
      ],
    },
  )

  logger('Triple Positions Result (Client):', triplePositionsResult)

  return (
    <div className="flex-col justify-start items-start flex w-full gap-12">
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col w-full gap-4">
          <div className="self-stretch justify-between items-center inline-flex">
            <Text
              variant="headline"
              weight="medium"
              className="text-secondary-foreground w-full"
            >
              Active Positions
            </Text>
          </div>
          <Tabs
            defaultValue={DataCreatedHeaderVariants.activeIdentities}
            className="w-full"
          >
            <Suspense
              fallback={
                <div className="mb-6">
                  <TabsSkeleton numOfTabs={2} />
                </div>
              }
            >
              <TabsList className="mb-6">
                <TabsTrigger
                  value={DataCreatedHeaderVariants.activeIdentities}
                  label="Identities"
                  totalCount={atomPositionsResult?.total?.aggregate?.count ?? 0}
                  disabled={atomPositionsResult === undefined}
                />
                <TabsTrigger
                  value={DataCreatedHeaderVariants.activeClaims}
                  label="Claims"
                  totalCount={
                    triplePositionsResult?.total?.aggregate?.count ?? 0
                  }
                  disabled={triplePositionsResult === undefined}
                />
              </TabsList>
            </Suspense>
            <Suspense
              fallback={
                <div className="mb-6">
                  <TabsSkeleton numOfTabs={2} />
                </div>
              }
            >
              {isLoadingAtomPositions ? (
                <div className="flex flex-col w-full gap-6">
                  <DataHeaderSkeleton />
                  <PaginatedListSkeleton />
                </div>
              ) : isErrorAtomPositions ? (
                <ErrorStateCard
                  title="Failed to load positions on identities"
                  message={
                    (errorAtomPositions as Error)?.message ??
                    'An unexpected error occurred'
                  }
                >
                  <RevalidateButton />
                </ErrorStateCard>
              ) : (
                <TabContent
                  value={DataCreatedHeaderVariants.activeIdentities}
                  totalResults={atomPositionsResult?.total?.aggregate?.count}
                  atomImage={accountResult?.account?.image ?? ''}
                  atomLabel={accountResult?.account?.label ?? ''}
                  totalStake={
                    +formatBalance(
                      atomPositionsResult?.total?.aggregate?.sum?.shares ?? '0',
                      18,
                    )
                  }
                  variant={DataCreatedHeaderVariants.activeIdentities}
                >
                  {atomPositionsResult && (
                    <ActivePositionsOnIdentities
                      identities={atomPositionsResult.positions}
                      pagination={
                        atomPositionsResult.total?.aggregate?.count ?? 0
                      }
                    />
                  )}
                </TabContent>
              )}
            </Suspense>
            <Suspense
              fallback={
                <div className="mb-6">
                  <TabsSkeleton numOfTabs={2} />
                </div>
              }
            >
              {isLoadingTriplePositions ? (
                <div className="flex flex-col w-full gap-6">
                  <DataHeaderSkeleton />
                  <PaginatedListSkeleton />
                </div>
              ) : isErrorTriplePositions ? (
                <ErrorStateCard
                  title="Failed to load positions on claims"
                  message={
                    (errorTriplePositions as Error)?.message ??
                    'An unexpected error occurred'
                  }
                >
                  <RevalidateButton />
                </ErrorStateCard>
              ) : (
                <TabContent
                  value={DataCreatedHeaderVariants.activeClaims}
                  totalResults={triplePositionsResult?.total?.aggregate?.count}
                  atomImage={accountResult?.account?.image ?? ''}
                  atomLabel={accountResult?.account?.label ?? ''}
                  totalStake={
                    +formatBalance(
                      triplePositionsResult?.total?.aggregate?.sum?.shares ??
                        '0',
                      18,
                    )
                  }
                  variant={DataCreatedHeaderVariants.activeClaims}
                >
                  {triplePositionsResult && (
                    <ActivePositionsOnClaims
                      positions={triplePositionsResult?.positions ?? []}
                      pagination={{
                        aggregate: {
                          count:
                            triplePositionsResult?.total?.aggregate?.count ?? 0,
                        },
                      }}
                      positionDirection={positionDirection ?? undefined}
                    />
                  )}
                </TabContent>
              )}
            </Suspense>
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="self-stretch justify-between items-center inline-flex">
          <Text
            variant="headline"
            weight="medium"
            className="text-secondary-foreground w-full"
          >
            Created
          </Text>
        </div>
        <Tabs
          defaultValue={DataCreatedHeaderVariants.createdIdentities}
          className="w-full"
        >
          <Suspense
            fallback={
              <div className="mb-6">
                <TabsSkeleton numOfTabs={2} />
              </div>
            }
          >
            <TabsList className="mb-6">
              <TabsTrigger
                value={DataCreatedHeaderVariants.createdIdentities}
                label="Identities"
                totalCount={atomsCreatedResult?.total?.aggregate?.count ?? 0}
                disabled={atomsCreatedResult === undefined}
              />
              <TabsTrigger
                value={DataCreatedHeaderVariants.createdClaims}
                label="Claims"
                totalCount={triplesCreatedResult?.total?.aggregate?.count ?? 0}
                disabled={triplesCreatedResult === undefined}
              />
            </TabsList>
          </Suspense>
          <Suspense
            fallback={
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            }
          >
            {isLoadingAtomsCreated ? (
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            ) : isErrorAtomsCreated ? (
              <ErrorStateCard
                title="Failed to load identities created"
                message={
                  (errorAtomsCreated as Error)?.message ??
                  'An unexpected error occurred'
                }
              >
                <RevalidateButton />
              </ErrorStateCard>
            ) : (
              <TabContent
                value={DataCreatedHeaderVariants.createdIdentities}
                totalResults={atomsCreatedResult?.total?.aggregate?.count}
                atomImage={accountResult?.account?.image ?? ''}
                atomLabel={accountResult?.account?.label ?? ''}
                // totalStake={
                //   +formatBalance(resolvedIdentitiesSummary?.assets ?? '0', 18)
                // }  // Can't get TVL on created atoms at the moment
                variant={DataCreatedHeaderVariants.createdIdentities}
              >
                {atomsCreatedResult && (
                  <IdentitiesList
                    identities={atomsCreatedResult.atoms as Atom[]}
                    pagination={identitiesPagination}
                    enableSearch={false}
                    enableSort={true}
                    paramPrefix="createdIdentities"
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                  />
                )}
              </TabContent>
            )}
          </Suspense>
          <Suspense
            fallback={
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            }
          >
            {isLoadingTriplesCreated ? (
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            ) : isErrorTriplesCreated ? (
              <ErrorStateCard
                title="Failed to load claims created"
                message={
                  (errorTriplesCreated as Error)?.message ??
                  'An unexpected error occurred'
                }
              >
                <RevalidateButton />
              </ErrorStateCard>
            ) : (
              <TabContent
                value={DataCreatedHeaderVariants.createdClaims}
                totalResults={triplesCreatedResult?.total?.aggregate?.count}
                atomImage={accountResult?.account?.image ?? ''}
                atomLabel={accountResult?.account?.label ?? ''}
                // TODO: get TVL on created atoms
                // totalStake={
                //   +formatBalance(resolvedIdentitiesSummary?.assets ?? '0', 18)
                // }  // Can't get TVL on created atoms at the moment
                variant={DataCreatedHeaderVariants.createdClaims}
              >
                {triplesCreatedResult && (
                  <ClaimsList
                    claims={mapToTriples(triplesCreatedResult.triples)}
                    pagination={claimsPagination}
                    paramPrefix="createdClaims"
                    enableSearch
                    enableSort
                  />
                )}
              </TabContent>
            )}
          </Suspense>
        </Tabs>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/data-created" />
}
