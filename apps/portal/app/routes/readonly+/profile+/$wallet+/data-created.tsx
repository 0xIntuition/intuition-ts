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
  GetAtomsQuery,
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
import { NO_WALLET_ERROR } from '@consts/errors'
import { useOffsetPagination } from '@lib/hooks/useOffsetPagination'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'

type Atom = NonNullable<GetAtomsQuery['atoms']>[number]
type Triple = NonNullable<
  NonNullable<GetTriplesWithPositionsQuery['triples']>[number]
>

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(!!wallet, NO_WALLET_ERROR)
  const queryAddress = wallet.toLowerCase()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const queryClient = new QueryClient()

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
    accountId: {
      _eq: queryAddress,
    },
    vault: {
      tripleId: {
        _is_null: true,
      },
    },
  }

  const triplePositionsWhere = {
    accountId: {
      _eq: queryAddress,
    },
    vault: {
      atomId: {
        _is_null: true,
      },
    },
  }

  const atomsLimit = parseInt(
    searchParams.get('createdIdentities_limit') || '10',
  )
  const atomsOffset = parseInt(
    searchParams.get('createdIdentities_offset') || '0',
  )
  const atomsOrderBy = searchParams.get('createdIdentities_sort_by')

  const triplesLimit = parseInt(searchParams.get('createdClaims_limit') || '10')
  const triplesOffset = parseInt(
    searchParams.get('createdClaims_offset') || '0',
  )
  const triplesOrderBy = searchParams.get('createdClaims_sort_by')

  const atomPositionsLimit = parseInt(
    searchParams.get('atomPositions_limit') || '10',
  )
  const atomPositionsOffset = parseInt(
    searchParams.get('atomPositions_offset') || '0',
  )
  const atomPositionsOrderBy = searchParams.get('atomPositions_sort_by')
    ? [{ [searchParams.get('atomPositions_sort_by')!]: 'desc' }]
    : undefined

  const triplePositionsLimit = parseInt(
    searchParams.get('triplePositions_limit') || '10',
  )
  const triplePositionsOffset = parseInt(
    searchParams.get('triplePositions_offset') || '0',
  )
  const triplePositionsOrderBy = searchParams.get('triplePositions_sort_by')
    ? [{ [searchParams.get('triplePositions_sort_by')!]: 'desc' }]
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
  const { queryAddress, initialParams } = useLoaderData<typeof loader>()

  const { data: accountResult } = useGetAccountQuery(
    {
      address: queryAddress,
    },
    {
      queryKey: ['get-account', { address: queryAddress }],
    },
  )

  const {
    offset: createdIdentitiesOffset,
    limit: createdIdentitiesLimit,
    onOffsetChange: onCreatedIdentitiesOffsetChange,
    onLimitChange: onCreatedIdentitiesLimitChange,
  } = useOffsetPagination({
    paramPrefix: 'createdIdentities',
    initialOffset: initialParams.atomsOffset,
    initialLimit: initialParams.atomsLimit,
  })

  const {
    offset: createdClaimsOffset,
    limit: createdClaimsLimit,
    onOffsetChange: onCreatedClaimsOffsetChange,
    onLimitChange: onCreatedClaimsLimitChange,
  } = useOffsetPagination({
    paramPrefix: 'createdClaims',
    initialOffset: initialParams.triplesOffset,
    initialLimit: initialParams.triplesLimit,
  })

  const {
    offset: atomPositionsOffset,
    limit: atomPositionsLimit,
    onOffsetChange: onAtomPositionsOffsetChange,
    onLimitChange: onAtomPositionsLimitChange,
  } = useOffsetPagination({
    paramPrefix: 'atomPositions',
    initialOffset: initialParams.atomPositionsOffset,
    initialLimit: initialParams.atomPositionsLimit,
  })

  const {
    offset: triplePositionsOffset,
    limit: triplePositionsLimit,
    onOffsetChange: onTriplePositionsOffsetChange,
    onLimitChange: onTriplePositionsLimitChange,
  } = useOffsetPagination({
    paramPrefix: 'triplePositions',
    initialOffset: initialParams.triplePositionsOffset,
    initialLimit: initialParams.triplePositionsLimit,
  })

  const {
    data: atomsCreatedResult,
    isLoading: isLoadingAtomsCreated,
    isError: isErrorAtomsCreated,
    error: errorAtomsCreated,
  } = useGetAtomsWithPositionsQuery(
    {
      where: initialParams.atomsWhere,
      limit: createdIdentitiesLimit,
      offset: createdIdentitiesOffset,
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
          limit: createdIdentitiesLimit,
          offset: createdIdentitiesOffset,
          orderBy: initialParams.atomsOrderBy,
          address: initialParams.queryAddress,
        },
      ],
    },
  )

  const {
    data: triplesCreatedResult,
    isLoading: isLoadingTriplesCreated,
    isError: isErrorTriplesCreated,
    error: errorTriplesCreated,
  } = useGetTriplesWithPositionsQuery(
    {
      where: initialParams.triplesWhere,
      limit: createdClaimsLimit,
      offset: createdClaimsOffset,
      orderBy: initialParams.triplesOrderBy
        ? [{ [initialParams.triplesOrderBy]: 'desc' }]
        : [
            {
              vault: {
                totalShares: 'desc',
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
          limit: createdClaimsLimit,
          offset: createdClaimsOffset,
          orderBy: initialParams.triplesOrderBy,
          address: queryAddress,
        },
      ],
    },
  )

  const {
    data: atomPositionsResult,
    isLoading: isLoadingAtomPositions,
    isError: isErrorAtomPositions,
    error: errorAtomPositions,
  } = useGetPositionsQuery(
    {
      where: initialParams.atomPositionsWhere,
      limit: atomPositionsLimit,
      offset: atomPositionsOffset,
      orderBy: initialParams.atomPositionsOrderBy,
    },
    {
      queryKey: [
        'get-atom-positions',
        {
          where: initialParams.atomPositionsWhere,
          limit: atomPositionsLimit,
          offset: atomPositionsOffset,
          orderBy: initialParams.atomPositionsOrderBy,
        },
      ],
    },
  )

  const {
    data: triplePositionsResult,
    isLoading: isLoadingTriplePositions,
    isError: isErrorTriplePositions,
    error: errorTriplePositions,
  } = useGetPositionsQuery(
    {
      where: initialParams.triplePositionsWhere,
      limit: triplePositionsLimit,
      offset: triplePositionsOffset,
      orderBy: initialParams.triplePositionsOrderBy,
    },
    {
      queryKey: [
        'get-triple-positions',
        {
          where: initialParams.triplePositionsWhere,
          limit: triplePositionsLimit,
          offset: triplePositionsOffset,
          orderBy: initialParams.triplePositionsOrderBy,
        },
      ],
    },
  )

  const [searchParams] = useSearchParams()
  const positionDirection = searchParams.get('positionDirection')

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
                totalCount={triplePositionsResult?.total?.aggregate?.count ?? 0}
                disabled={triplePositionsResult === undefined}
              />
            </TabsList>
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
                      pagination={{
                        totalEntries:
                          atomPositionsResult.total?.aggregate?.count ?? 0,
                        limit: atomPositionsLimit,
                        offset: atomPositionsOffset,
                        onOffsetChange: onAtomPositionsOffsetChange,
                        onLimitChange: onAtomPositionsLimitChange,
                      }}
                      paramPrefix="atomPositions"
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
                        totalEntries:
                          triplePositionsResult?.total?.aggregate?.count ?? 0,
                        limit: triplePositionsLimit,
                        offset: triplePositionsOffset,
                        onOffsetChange: onTriplePositionsOffsetChange,
                        onLimitChange: onTriplePositionsLimitChange,
                      }}
                      paramPrefix="triplePositions"
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
                variant={DataCreatedHeaderVariants.createdIdentities}
              >
                {atomsCreatedResult && (
                  <IdentitiesList
                    identities={atomsCreatedResult.atoms as Atom[]}
                    pagination={{
                      totalEntries:
                        atomsCreatedResult?.total?.aggregate?.count ?? 0,
                      limit: createdIdentitiesLimit,
                      offset: createdIdentitiesOffset,
                      onOffsetChange: onCreatedIdentitiesOffsetChange,
                      onLimitChange: onCreatedIdentitiesLimitChange,
                    }}
                    paramPrefix="createdIdentities"
                    enableSearch
                    enableSort
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
                variant={DataCreatedHeaderVariants.createdClaims}
              >
                {triplesCreatedResult && (
                  <ClaimsList
                    claims={triplesCreatedResult.triples as Triple[]}
                    pagination={{
                      totalEntries:
                        triplesCreatedResult?.total?.aggregate?.count ?? 0,
                      limit: createdClaimsLimit,
                      offset: createdClaimsOffset,
                      onOffsetChange: onCreatedClaimsOffsetChange,
                      onLimitChange: onCreatedClaimsLimitChange,
                    }}
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
