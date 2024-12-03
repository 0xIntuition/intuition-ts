import { isError } from 'util'
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
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  UserTotalsPresenter,
} from '@0xintuition/api'
import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  GetTriplesDocument,
  GetTriplesQuery,
  GetTriplesQueryVariables,
  useGetAccountQuery,
  useGetAtomsQuery,
  useGetTriplesQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ActivePositionsOnClaims } from '@components/list/active-positions-on-claims'
import { ActivePositionsOnIdentities } from '@components/list/active-positions-on-identities'
import { ClaimsList } from '@components/list/claims'
import { IdentitiesList } from '@components/list/identities'
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
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  getCreatedClaims,
  getCreatedIdentities,
  getUserClaims,
  getUserIdentities,
} from '@lib/services/users'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'

import { ProfileLoaderData } from './_layout'

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
  const atomsOrderBy = url.searchParams.get('claimsSortBy')
  const triplesLimit = parseInt(url.searchParams.get('claimsLimit') || '10')
  const triplesOffset = parseInt(url.searchParams.get('claimsOffset') || '0')
  const triplesOrderBy = url.searchParams.get('claimsSortBy')

  await queryClient.prefetchQuery({
    queryKey: [
      'get-atoms',
      { atomsWhere, atomsLimit, atomsOffset, atomsOrderBy },
    ],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        where: atomsWhere,
        limit: atomsLimit,
        offset: atomsOffset,
        orderBy: atomsOrderBy ? [{ [atomsOrderBy]: 'desc' }] : undefined,
      })(),
  })

  await queryClient.prefetchQuery({
    queryKey: [
      'get-triples',
      { triplesWhere, triplesLimit, triplesOffset, triplesOrderBy },
    ],
    queryFn: () =>
      fetcher<GetTriplesQuery, GetTriplesQueryVariables>(GetTriplesDocument, {
        where: triplesWhere,
        limit: triplesLimit,
        offset: triplesOffset,
        orderBy: triplesOrderBy ? [{ [triplesOrderBy]: 'desc' }] : undefined,
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
  const {
    queryAddress,
    initialParams,
    // activeIdentities,
    // createdIdentities,
    // createdIdentitiesSummary,
    // activeClaims,
    // createdClaims,
    // createdClaimsSummary,
  } = useLiveLoader<typeof loader>(['attest'])

  const { userIdentity, userTotals } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)
  invariant(userTotals, NO_USER_TOTALS_ERROR)

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
  } = useGetAtomsQuery(
    {
      where: initialParams.atomsWhere,
      limit: initialParams.atomsLimit,
      offset: initialParams.atomsOffset,
      orderBy: initialParams.atomsOrderBy
        ? [{ [initialParams.atomsOrderBy]: 'desc' }]
        : undefined,
    },
    {
      queryKey: [
        'get-atoms',
        {
          where: initialParams.atomsWhere,
          limit: initialParams.atomsLimit,
          offset: initialParams.atomsOffset,
          orderBy: initialParams.atomsOrderBy,
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
  } = useGetTriplesQuery(
    {
      where: initialParams.triplesWhere,
      limit: initialParams.triplesLimit,
      offset: initialParams.triplesOffset,
      orderBy: initialParams.triplesOrderBy
        ? [{ [initialParams.triplesOrderBy]: 'desc' }]
        : undefined,
    },
    {
      queryKey: [
        'get-triples',
        {
          where: initialParams.triplesWhere,
          limit: initialParams.triplesLimit,
          offset: initialParams.triplesOffset,
          orderBy: initialParams.triplesOrderBy,
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
                {/* <IdentitiesList
                  identities={atomsCreatedResult}
                  pagination={atomsCreatedResult?.total?.aggregate?.count}
                  paramPrefix="createdIdentities"
                  enableSearch
                  enableSort
                /> */}
              </TabContent>
            )}
          </Suspense>
          {/* <Suspense
            fallback={
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            }
          >
            <Await
              resolve={createdIdentities}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedIdentities) => (
                <Await
                  resolve={createdIdentitiesSummary}
                  errorElement={
                    <ErrorStateCard>
                      <RevalidateButton />
                    </ErrorStateCard>
                  }
                >
                  {(resolvedIdentitiesSummary) => (
                    <TabContent
                      value={DataCreatedHeaderVariants.createdIdentities}
                      userIdentity={userIdentity}
                      userTotals={userTotals}
                      totalResults={resolvedIdentities.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          resolvedIdentitiesSummary?.assets ?? '0',
                          18,
                        )
                      }
                      variant={DataCreatedHeaderVariants.createdIdentities}
                    >
                      <IdentitiesList
                        identities={resolvedIdentities.data}
                        pagination={resolvedIdentities.pagination}
                        paramPrefix="createdIdentities"
                        enableSearch
                        enableSort
                      />
                    </TabContent>
                  )}
                </Await>
              )}
            </Await>
            <Await
              resolve={createdClaims}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedClaims) => (
                <Await
                  resolve={createdClaimsSummary}
                  errorElement={
                    <ErrorStateCard>
                      <RevalidateButton />
                    </ErrorStateCard>
                  }
                >
                  {(resolvedClaimsSummary) => (
                    <TabContent
                      value={DataCreatedHeaderVariants.createdClaims}
                      userIdentity={userIdentity}
                      userTotals={userTotals}
                      totalResults={resolvedClaims.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          resolvedClaimsSummary?.assets_sum ?? '0',
                          18,
                        )
                      }
                      variant={DataCreatedHeaderVariants.createdClaims}
                    >
                      <ClaimsList
                        claims={resolvedClaims.data}
                        pagination={resolvedClaims.pagination}
                        paramPrefix="createdClaims"
                        enableSearch
                        enableSort
                      />
                    </TabContent>
                  )}
                </Await>
              )}
            </Await>
          </Suspense> */}
        </Tabs>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/data-created" />
}
