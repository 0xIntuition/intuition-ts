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
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  useGetAccountQuery,
  useGetAtomsWithPositionsQuery,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
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
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NO_WALLET_ERROR } from 'app/consts'

type Atom = NonNullable<GetAtomsQuery['atoms']>[number]
type Triple = NonNullable<
  NonNullable<GetTriplesWithPositionsQuery['triples']>[number]
>

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)
  const userWallet = user.wallet?.address
  const queryAddress = userWallet.toLowerCase()

  const url = new URL(request.url)
  // const searchParams = new URLSearchParams(url.search)
  const queryClient = new QueryClient()

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
  const atomsLimit = parseInt(url.searchParams.get('claimsLimit') || '10')
  const atomsOffset = parseInt(url.searchParams.get('claimsOffset') || '0')
  // const atomsOrderBy = url.searchParams.get('claimsSortBy')
  const atomsOrderBy = [
    {
      vault: {
        totalShares: 'desc',
      },
    },
  ]
  const triplesLimit = parseInt(url.searchParams.get('claimsLimit') || '10')
  const triplesOffset = parseInt(url.searchParams.get('claimsOffset') || '0')
  const triplesOrderBy = url.searchParams.get('claimsSortBy')

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
          orderBy: [
            {
              vault: {
                totalShares: 'desc',
              },
            },
          ],
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
      orderBy: [
        {
          vault: {
            totalShares: 'desc',
          },
        },
      ],
      // orderBy: initialParams.atomsOrderBy
      //   ? [{ [initialParams.atomsOrderBy]: 'desc' }]
      //   : undefined,
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
          limit: initialParams.triplesLimit,
          offset: initialParams.triplesOffset,
          orderBy: initialParams.triplesOrderBy,
          address: queryAddress,
        },
      ],
    },
  )

  logger('Triples Created Result (Client):', triplesCreatedResult)

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
            {/* <Suspense
              fallback={
                <div className="mb-6">
                  <TabsSkeleton numOfTabs={2} />
                </div>
              }
            >
              <TabsList className="mb-6">
                <Await resolve={activeIdentities} errorElement={<></>}>
                  {(resolvedIdentities) => (
                    <TabsTrigger
                      value={DataCreatedHeaderVariants.activeIdentities}
                      label="Identities"
                      totalCount={resolvedIdentities.pagination.totalEntries}
                      disabled={activeIdentities === undefined}
                    />
                  )}
                </Await>
                <Await resolve={activeClaims} errorElement={<></>}>
                  {(resolvedClaims) => (
                    <TabsTrigger
                      value={DataCreatedHeaderVariants.activeClaims}
                      label="Claims"
                      totalCount={resolvedClaims.pagination.totalEntries}
                      disabled={activeClaims === undefined}
                    />
                  )}
                </Await>
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
              <Await
                resolve={activeIdentities}
                errorElement={
                  <ErrorStateCard>
                    <RevalidateButton />
                  </ErrorStateCard>
                }
              >
                {(resolvedIdentities) => (
                  <TabContent
                    value={DataCreatedHeaderVariants.activeIdentities}
                    userIdentity={userIdentity}
                    userTotals={userTotals}
                    totalResults={resolvedIdentities.pagination.totalEntries}
                    totalStake={
                      +formatBalance(
                        userTotals.total_position_value_on_identities ?? '0',
                        18,
                      )
                    }
                    variant={DataCreatedHeaderVariants.activeIdentities}
                  >
                    <ActivePositionsOnIdentities
                      identities={resolvedIdentities.data}
                      pagination={resolvedIdentities.pagination}
                    />
                  </TabContent>
                )}
              </Await>
              <Await
                resolve={activeClaims}
                errorElement={
                  <ErrorStateCard>
                    <RevalidateButton />
                  </ErrorStateCard>
                }
              >
                {(resolvedClaims) => (
                  <Await
                    resolve={activeClaims}
                    errorElement={
                      <ErrorStateCard>
                        <RevalidateButton />
                      </ErrorStateCard>
                    }
                  >
                    <TabContent
                      value={DataCreatedHeaderVariants.activeClaims}
                      userIdentity={userIdentity}
                      userTotals={userTotals}
                      totalResults={resolvedClaims.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          userTotals.total_position_value_on_claims ?? '0',
                          18,
                        )
                      }
                      variant={DataCreatedHeaderVariants.activeClaims}
                    >
                      <ActivePositionsOnClaims
                        claims={resolvedClaims.data}
                        pagination={resolvedClaims.pagination}
                      />
                    </TabContent>
                  </Await>
                )}
              </Await>
            </Suspense> */}
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
                    pagination={
                      atomsCreatedResult?.total?.aggregate?.count ?? 0
                    }
                    paramPrefix="createdIdentities"
                    enableSearch //
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
                value={DataCreatedHeaderVariants.createdClaims}
                totalResults={triplesCreatedResult?.total?.aggregate?.count}
                atomImage={accountResult?.account?.image ?? ''}
                atomLabel={accountResult?.account?.label ?? ''}
                // totalStake={
                //   +formatBalance(resolvedIdentitiesSummary?.assets ?? '0', 18)
                // }  // Can't get TVL on created atoms at the moment
                variant={DataCreatedHeaderVariants.createdClaims}
              >
                {triplesCreatedResult && (
                  <ClaimsList
                    claims={triplesCreatedResult.triples as Triple[]}
                    pagination={
                      triplesCreatedResult?.total?.aggregate?.count ?? 0
                    }
                    paramPrefix="createdClaims"
                    enableSearch //
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
