import { Suspense } from 'react'

import { ErrorStateCard, Text } from '@0xintuition/1ui'
import { ClaimSortColumn, SortDirection } from '@0xintuition/api'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomsCountDocument,
  GetAtomsCountQuery,
  GetAtomsCountQueryVariables,
  GetFollowerPositionsDocument,
  GetFollowerPositionsQuery,
  GetFollowerPositionsQueryVariables,
  GetPositionsCountByTypeDocument,
  GetPositionsCountByTypeQuery,
  GetPositionsCountByTypeQueryVariables,
  GetPositionsCountDocument,
  GetPositionsCountQuery,
  GetPositionsCountQueryVariables,
  GetTriplesCountDocument,
  GetTriplesCountQuery,
  GetTriplesCountQueryVariables,
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  Order_By,
  useGetAccountQuery,
  useGetAtomsCountQuery,
  useGetFollowerPositionsQuery,
  useGetPositionsCountByTypeQuery,
  useGetTriplesCountQuery,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ClaimsListNew as ClaimsAboutIdentity } from '@components/list/claims'
import { FollowList } from '@components/list/follow'
import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { ConnectionsHeaderVariants } from '@components/profile/connections-header'
import DataAboutHeader from '@components/profile/data-about-header'
import { OverviewCreatedHeader } from '@components/profile/overview-created-header'
import { OverviewStakingHeader } from '@components/profile/overview-staking-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useOffsetPagination } from '@lib/hooks/useOffsetPagination'
import { getIdentityOrPending } from '@lib/services/identities'
import { getUserSavedLists } from '@lib/services/lists'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useParams } from '@remix-run/react'
import { QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_PARAM_ID_ERROR, PATHS } from 'app/consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  const queryAddress = wallet.toLowerCase()

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    wallet,
  )

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortsBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

  const queryClient = new QueryClient()

  const accountResult = await fetcher<
    GetAccountQuery,
    GetAccountQueryVariables
  >(GetAccountDocument, { address: wallet })()

  if (!accountResult) {
    throw new Error('No account data found for address')
  }

  if (!accountResult.account?.atomId) {
    throw new Error('No atom ID found for account')
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-account', { address: wallet }],
    queryFn: () => accountResult,
  })

  const triplesWhere = {
    _or: [
      {
        subjectId: {
          _eq: accountResult.account?.atomId,
        },
      },
      {
        objectId: {
          _eq: accountResult.account?.atomId,
        },
      },
      {
        predicateId: {
          _eq: accountResult.account?.atomId,
        },
      },
    ],
  }

  const triplesCountWhere = {
    _or: [
      {
        subjectId: {
          _eq: accountResult.account?.atomId,
        },
      },
      {
        predicateId: {
          _eq: accountResult.account?.atomId,
        },
      },
      {
        objectId: {
          _eq: accountResult.account?.atomId,
        },
      },
    ],
  }

  const positionsCountWhere = {
    vaultId: {
      _eq: accountResult.account?.atomId,
    },
  }

  const createdTriplesWhere = {
    creator: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const createdAtomsWhere = {
    creator: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const atomPositionsWhere = {
    account: {
      id: {
        _eq: queryAddress,
      },
    },
    vault: {
      tripleId: {
        _is_null: true,
      },
    },
  }

  const triplePositionsWhere = {
    account: {
      id: {
        _eq: queryAddress,
      },
    },
    vault: {
      atomId: {
        _is_null: true,
      },
    },
  }

  const allPositionsWhere = {
    account: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const claimsLimit = parseInt(searchParams.get('claims_limit') || '10')
  const claimsOffset = parseInt(searchParams.get('claims_offset') || '0')
  const claimsSortBy = searchParams.get('claims_sort_by')

  const followersLimit = parseInt(searchParams.get('followers_limit') || '10')
  const followersOffset = parseInt(searchParams.get('followers_offset') || '0')

  const followersWhere = {
    subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
    predicateId: getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
    objectId: accountResult.account.atomId,
    positionsLimit: followersLimit,
    positionsOffset: followersOffset,
    positionsOrderBy: {
      shares: 'desc' as Order_By,
    },
  }

  await queryClient.prefetchQuery({
    queryKey: [
      'get-triples-with-positions',
      { triplesWhere, limit: claimsLimit, offset: claimsOffset },
    ],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: triplesWhere,
        limit: claimsLimit,
        offset: claimsOffset,
        orderBy: claimsSortBy
          ? [{ [claimsSortBy]: 'desc' }]
          : [{ blockNumber: 'desc' }],
        address: queryAddress,
      }),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-triples-count', { where: triplesCountWhere }],
    queryFn: () =>
      fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(
        GetTriplesCountDocument,
        { where: triplesCountWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-positions-count', { where: positionsCountWhere }],
    queryFn: () =>
      fetcher<GetPositionsCountQuery, GetPositionsCountQueryVariables>(
        GetPositionsCountDocument,
        { where: positionsCountWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-created-triples', { where: createdTriplesWhere }],
    queryFn: () =>
      fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(
        GetTriplesCountDocument,
        { where: createdTriplesWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-created-atoms', { where: createdAtomsWhere }],
    queryFn: () =>
      fetcher<GetAtomsCountQuery, GetAtomsCountQueryVariables>(
        GetAtomsCountDocument,
        { where: createdAtomsWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-atom-positions', { where: atomPositionsWhere }],
    queryFn: () =>
      fetcher<
        GetPositionsCountByTypeQuery,
        GetPositionsCountByTypeQueryVariables
      >(GetPositionsCountByTypeDocument, { where: atomPositionsWhere })(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-triple-positions', { where: triplePositionsWhere }],
    queryFn: () =>
      fetcher<
        GetPositionsCountByTypeQuery,
        GetPositionsCountByTypeQueryVariables
      >(GetPositionsCountByTypeDocument, { where: triplePositionsWhere })(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-all-positions', { where: allPositionsWhere }],
    queryFn: () =>
      fetcher<
        GetPositionsCountByTypeQuery,
        GetPositionsCountByTypeQueryVariables
      >(GetPositionsCountByTypeDocument, { where: allPositionsWhere })(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-follower-positions', {}],
    queryFn: () =>
      fetcher<GetFollowerPositionsQuery, GetFollowerPositionsQueryVariables>(
        GetFollowerPositionsDocument,
        followersWhere,
      )(),
  })

  return json({
    queryAddress,
    initialParams: {
      atomId: accountResult.account?.atomId,
      triplesWhere,
      triplesCountWhere,
      positionsCountWhere,
      createdTriplesWhere,
      createdAtomsWhere,
      atomPositionsWhere,
      triplePositionsWhere,
      allPositionsWhere,
      followersWhere,
      claimsLimit,
      claimsOffset,
      claimsSortBy,
      followersLimit,
      followersOffset,
    },
    ...(!isPending &&
      !!userIdentity && {
        savedListClaims: await getUserSavedLists({
          request,
          userWallet: wallet,
          searchParams: listSearchParams,
        }),
      }),
  })
}

export default function ReadOnlyProfileOverview() {
  const { queryAddress, initialParams, savedListClaims } =
    useLoaderData<typeof loader>()

  const {
    createdTriplesWhere,
    createdAtomsWhere,
    atomPositionsWhere,
    triplePositionsWhere,
    allPositionsWhere,
  } = initialParams

  const { data: accountResult } = useGetAccountQuery(
    { address: queryAddress },
    { queryKey: ['get-account', { address: queryAddress }] },
  )

  const { data: createdTriplesResult } = useGetTriplesCountQuery(
    { where: createdTriplesWhere },
    { queryKey: ['get-created-triples', { where: createdTriplesWhere }] },
  )

  const { data: createdAtomsResult } = useGetAtomsCountQuery(
    { where: createdAtomsWhere },
    { queryKey: ['get-created-atoms', { where: createdAtomsWhere }] },
  )

  const { data: atomPositionsResult } = useGetPositionsCountByTypeQuery(
    {
      where: atomPositionsWhere,
    },
    {
      queryKey: ['get-atom-positions', { where: atomPositionsWhere }],
    },
  )

  const { data: triplePositionsResult } = useGetPositionsCountByTypeQuery(
    { where: triplePositionsWhere },
    { queryKey: ['get-triple-positions', { where: triplePositionsWhere }] },
  )

  const { data: allPositionsResult } = useGetPositionsCountByTypeQuery({
    where: allPositionsWhere,
  })

  const {
    offset: claimsOffset,
    limit: claimsLimit,
    onOffsetChange: onClaimsOffsetChange,
    onLimitChange: onClaimsLimitChange,
  } = useOffsetPagination({
    paramPrefix: 'claims',
    initialOffset: initialParams.claimsOffset,
    initialLimit: initialParams.claimsLimit,
  })

  const {
    data: triplesResult,
    isLoading: isLoadingTriples,
    isError: isErrorTriples,
    error: errorTriples,
  } = useGetTriplesWithPositionsQuery(
    {
      where: initialParams.triplesWhere,
      limit: claimsLimit,
      offset: claimsOffset,
      orderBy: initialParams.claimsSortBy
        ? [{ [initialParams.claimsSortBy]: 'desc' }]
        : [{ blockNumber: 'desc' }],
      address: queryAddress,
    },
    {
      queryKey: [
        'get-triples-with-positions',
        {
          where: initialParams.triplesWhere,
          limit: claimsLimit,
          offset: claimsOffset,
          orderBy: initialParams.claimsSortBy,
          address: queryAddress,
        },
      ],
    },
  )

  logger('Triples Result (Client):', triplesResult)

  const { data: followerData } = useGetFollowerPositionsQuery(
    {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: initialParams.atomId,
      positionsLimit: initialParams.followersLimit,
      positionsOffset: initialParams.followersOffset,
      positionsOrderBy: {
        shares: 'desc',
      },
    },
    {
      queryKey: [
        'get-follower-positions',
        {
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: initialParams.atomId,
          positionsLimit: initialParams.followersLimit,
          positionsOffset: initialParams.followersOffset,
          positionsOrderBy: {
            shares: 'desc',
          },
        },
      ],
    },
  )

  logger('Follower Data (Client):', followerData)

  const params = useParams()
  const { wallet } = params

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Text
            variant="headline"
            weight="medium"
            className="text-secondary-foreground"
          >
            User Stats
          </Text>
          <div className="flex flex-col items-center gap-6">
            <OverviewStakingHeader
              totalClaims={
                triplePositionsResult?.positions_aggregate?.total?.count ?? 0
              }
              totalIdentities={
                atomPositionsResult?.positions_aggregate?.total?.count ?? 0
              }
              totalStake={
                +formatBalance(
                  allPositionsResult?.positions_aggregate?.total?.sum?.shares ??
                    '0',
                  18,
                )
              }
              link={`${PATHS.READONLY_PROFILE}/${wallet}/data-created`}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-6 max-md:flex-col">
          <OverviewCreatedHeader
            variant="identities"
            totalCreated={
              createdAtomsResult?.atoms_aggregate?.aggregate?.count ?? 0
            }
            link={`${PATHS.READONLY_PROFILE}/${wallet}/data-created`}
          />
          <OverviewCreatedHeader
            variant="claims"
            totalCreated={
              createdTriplesResult?.triples_aggregate?.total?.count ?? 0
            }
            link={`${PATHS.READONLY_PROFILE}/${wallet}/data-created`}
          />
        </div>
        <Suspense fallback={<DataHeaderSkeleton />}>
          <DataAboutHeader
            variant="claims"
            atomImage={accountResult?.account?.image ?? ''}
            atomLabel={accountResult?.account?.label ?? ''}
            atomVariant="user" // TODO: Determine based on atom type
            totalClaims={triplesResult?.total?.aggregate?.count ?? 0}
            totalStake={0} // TODO: need to find way to get the shares -- may need to update the schema
            // totalStake={
            //   +formatBalance(
            //     triplesResult?.total?.aggregate?.sums?.shares ?? 0,
            //     18,
            //   )
            // }
          />
        </Suspense>
      </div>
      <div className="flex flex-col gap-4">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Top Claims about this Identity
        </Text>
        <Suspense fallback={<PaginatedListSkeleton />}>
          {isLoadingTriples ? (
            <PaginatedListSkeleton />
          ) : isErrorTriples ? (
            <ErrorStateCard
              title="Failed to load claims"
              message={
                (errorTriples as Error)?.message ??
                'An unexpected error occurred'
              }
            >
              <RevalidateButton />
            </ErrorStateCard>
          ) : (
            <ClaimsAboutIdentity
              claims={triplesResult?.triples ?? []}
              pagination={{
                totalEntries: triplesResult?.total?.aggregate?.count ?? 0,
                limit: claimsLimit,
                offset: claimsOffset,
                onOffsetChange: onClaimsOffsetChange,
                onLimitChange: onClaimsLimitChange,
              }}
              paramPrefix="claims"
              enableSearch={false} // TODO: (ENG-4481) Re-enable search and sort
              enableSort={false} // TODO: (ENG-4481) Re-enable search and sort
            />
          )}
        </Suspense>
      </div>
      {followerData && <TopFollowers followerData={followerData} />}
      <div className="flex flex-col gap-4">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Top Lists
        </Text>
        <Suspense fallback={<ListClaimsSkeletonLayout totalItems={6} />}>
          <Await resolve={savedListClaims}>
            {(resolvedSavedListClaims) => {
              return (
                <ListClaimsList
                  listClaims={resolvedSavedListClaims?.savedListClaims ?? []}
                  enableSort={false}
                  enableSearch={false}
                  sourceUserAddress={wallet}
                  readOnly={true}
                />
              )
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="wallet/index" />
}

function TopFollowers({
  followerData,
}: {
  followerData: GetFollowerPositionsQuery
}) {
  return (
    <div className="flex flex-col gap-6">
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        Top Followers
      </Text>
      <FollowList
        positions={followerData?.triples[0]?.vault?.positions ?? []}
        currentSharePrice={followerData?.triples[0]?.vault?.currentSharePrice}
        paramPrefix={ConnectionsHeaderVariants.followers}
        enableSearch={false}
        enableSort={false}
        readOnly={true}
      />
    </div>
  )
}
