import { Suspense } from 'react'

import { Button, ErrorStateCard, Icon, IconName, Text } from '@0xintuition/1ui'
import {
  ClaimSortColumn,
  IdentityPresenter,
  SortDirection,
  UserTotalsPresenter,
} from '@0xintuition/api'
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
import { getIdentityOrPending } from '@lib/services/identities'
import { getUserSavedLists } from '@lib/services/lists'
import { globalCreateClaimModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import {
  CURRENT_ENV,
  NO_PARAM_ID_ERROR,
  NO_USER_IDENTITY_ERROR,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import { useSetAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  const queryAddress = wallet.toLowerCase()

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    wallet,
  )

  // const url = new URL(request.url)
  // const searchParams = new URLSearchParams(url.search)

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

  if (!accountResult.account?.atom_id) {
    throw new Error('No atom ID found for account')
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-account', { address: wallet }],
    queryFn: () => accountResult,
  })

  // TODO: once we fully fix sort/pagination, we'll want to update these to use triples instead of claims, and orderBy instead of sortBy in the actual query params
  const triplesWhere = {
    _or: [
      {
        subject_id: {
          _eq: accountResult.account?.atom_id,
        },
      },
      {
        predicate_id: {
          _eq: accountResult.account?.atom_id,
        },
      },
      {
        object_id: {
          _eq: accountResult.account?.atom_id,
        },
      },
    ],
  }

  const triplesCountWhere = {
    _or: [
      {
        subject_id: {
          _eq: accountResult.account?.atom_id,
        },
      },
      {
        object_id: {
          _eq: accountResult.account?.atom_id,
        },
      },
      {
        predicate_id: {
          _eq: accountResult.account?.atom_id,
        },
      },
    ],
  }

  const positionsCountWhere = {
    vault_id: {
      _eq: accountResult.account?.atom_id,
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
      triple_id: {
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
      atom_id: {
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

  const followersWhere = {
    subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
    predicateId: getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
    objectId: accountResult.account.atom_id,
    positionsLimit: 10,
    positionsOffset: 0,
    positionsOrderBy: {
      shares: 'desc' as Order_By,
    },
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-triples-with-positions', { triplesWhere }],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: triplesWhere,
        limit: 10,
        offset: 0,
        orderBy: [{ block_number: 'desc' }],
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
      atomId: accountResult.account?.atom_id,
      triplesWhere,
      triplesCountWhere,
      positionsCountWhere,
      createdTriplesWhere,
      createdAtomsWhere,
      atomPositionsWhere,
      triplePositionsWhere,
      allPositionsWhere,
      followersWhere,
    },
    ...(!isPending &&
      !!userIdentity && {
        savedListClaims: await getUserSavedLists({
          request,
          userWallet,
          searchParams: listSearchParams,
        }),
      }),
  })
}

export default function ProfileOverview() {
  const { queryAddress, initialParams, savedListClaims } =
    useLoaderData<typeof loader>()
  const { userIdentity } =
    useRouteLoaderData<{
      userIdentity: IdentityPresenter
      userTotals: UserTotalsPresenter
      isPending: boolean
    }>('routes/app+/profile+/$wallet') ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  const params = useParams()
  const { wallet } = params

  const setCreateClaimModalActive = useSetAtom(globalCreateClaimModalAtom)

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
    data: triplesResult,
    isLoading: isLoadingTriples,
    isError: isErrorTriples,
    error: errorTriples,
  } = useGetTriplesWithPositionsQuery(
    {
      where: initialParams.triplesWhere,
      limit: 10,
      offset: 0,
      orderBy: [{ block_number: 'desc' }],
      address: queryAddress,
    },
    {
      queryKey: [
        'get-triples-with-positions',
        {
          where: initialParams.triplesWhere,
          limit: 10,
          offset: 0,
          orderBy: [{ blockNumber: 'desc' }],
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
      positionsLimit: 10,
      positionsOffset: 0,
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
          positionsLimit: 10,
          positionsOffset: 0,
          positionsOrderBy: {
            shares: 'desc',
          },
        },
      ],
    },
  )

  logger('Follower Data (Client):', followerData)

  return (
    <div className="flex flex-col gap-12">
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
            link={`${PATHS.PROFILE}/data-created`}
          />
          <div className="flex flex-row w-full items-center gap-6 max-md:flex-col">
            <OverviewCreatedHeader
              variant="identities"
              totalCreated={
                createdAtomsResult?.atoms_aggregate?.aggregate?.count ?? 0
              }
              link={`${PATHS.PROFILE}/data-created`}
            />
            <OverviewCreatedHeader
              variant="claims"
              totalCreated={
                createdTriplesResult?.triples_aggregate?.total?.count ?? 0
              }
              link={`${PATHS.PROFILE}/data-created`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-6">
        <div className="flex max-lg:flex-col justify-between items-center max-lg:w-full">
          <div className="self-stretch justify-between items-center inline-flex">
            <Text
              variant="headline"
              weight="medium"
              className="text-secondary-foreground w-full"
            >
              Top Claims about this Identity
            </Text>
          </div>
          <Button
            variant="primary"
            className="max-lg:w-full max-lg:mt-2"
            onClick={() => setCreateClaimModalActive(true)}
          >
            <Icon name={IconName.claim} className="h-4 w-4" /> Make a Claim
          </Button>
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
              pagination={triplesResult?.total?.aggregate?.count ?? {}}
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
        currentSharePrice={
          followerData?.triples[0]?.vault?.current_share_price ?? 0
        }
        paramPrefix={ConnectionsHeaderVariants.followers}
        enableSearch={false}
        enableSort={false}
      />
    </div>
  )
}
