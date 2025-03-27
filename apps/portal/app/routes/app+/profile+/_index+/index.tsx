import { Text } from '@0xintuition/1ui'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomsCountDocument,
  GetAtomsCountQuery,
  GetAtomsCountQueryVariables,
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
  useGetAccountQuery,
  useGetAtomsCountQuery,
  useGetPositionsCountByTypeQuery,
  useGetPositionsCountQuery,
  useGetTriplesCountQuery,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ListClaimsListNew as ListClaimsList } from '@components/list/list-claims'
import { OverviewAboutHeaderNew as OverviewAboutHeader } from '@components/profile/overview-about-header'
import { OverviewCreatedHeader } from '@components/profile/overview-created-header'
import { OverviewStakingHeader } from '@components/profile/overview-staking-header'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_WALLET_ERROR, PATHS } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)
  const queryAddress = userWallet.toLowerCase()

  // const url = new URL(request.url)
  // const searchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortsBy', 'vault.total_shares')
  listSearchParams.set('direction', 'desc')
  listSearchParams.set('limit', '6')
  logger('wallet', userWallet.toLowerCase())

  const queryClient = new QueryClient()

  const accountResult = await fetcher<
    GetAccountQuery,
    GetAccountQueryVariables
  >(GetAccountDocument, { address: queryAddress })()

  if (!accountResult) {
    throw new Error('No account data found for address')
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-account', { address: queryAddress }],
    queryFn: () => accountResult,
  })

  const triplesCountWhere = {
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

  const positionsCountWhere = {
    vault_id: {
      _eq: accountResult.account?.atom_id,
    },
  }

  if (accountResult.account?.atom_id) {
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
  }

  const savedListsWhere = {
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
    _or: [
      {
        predicate_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      },
    ],
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

  await queryClient.prefetchQuery({
    queryKey: ['get-saved-lists', { savedListsWhere }],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: savedListsWhere,
        limit: 10,
        offset: 0,
        orderBy: [{ block_number: 'desc' }],
        address: queryAddress,
      }),
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

  return json({
    dehydratedState: dehydrate(queryClient),
    queryAddress,
    initialParams: {
      triplesCountWhere,
      savedListsWhere,
      positionsCountWhere,
      createdTriplesWhere,
      createdAtomsWhere,
      atomPositionsWhere,
      triplePositionsWhere,
      allPositionsWhere,
    },
  })
}

export default function UserProfileOverview() {
  const { initialParams, queryAddress } = useLoaderData<typeof loader>()

  const {
    triplesCountWhere,
    savedListsWhere,
    positionsCountWhere,
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

  const { data: triplesCountResult } = useGetTriplesCountQuery(
    { where: triplesCountWhere },
    { queryKey: ['get-triples-count', { where: triplesCountWhere }] },
  )

  const { data: positionsCountResult } = useGetPositionsCountQuery(
    { where: positionsCountWhere },
    { queryKey: ['get-positions-count', { where: positionsCountWhere }] },
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

  const { data: savedListsResults } = useGetTriplesWithPositionsQuery(
    {
      where: savedListsWhere,
      limit: 10,
      offset: 0,
      orderBy: [{ block_number: 'desc' }],
      address: queryAddress,
    },
    {
      queryKey: [
        'get-saved-lists',
        {
          where: savedListsWhere,
          limit: 10,
          offset: 0,
          orderBy: [{ blockNumber: 'desc' }],
          address: queryAddress,
        },
      ],
    },
  )

  return (
    <div className="flex flex-col gap-12">
      {accountResult?.account?.atom_id && (
        <div className="flex flex-col gap-4">
          <Text
            variant="headline"
            weight="medium"
            className="text-secondary-foreground"
          >
            About
          </Text>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <OverviewAboutHeader
              variant="claims"
              atomImage={accountResult?.account?.image ?? ''}
              atomLabel={accountResult?.account?.label ?? ''}
              totalClaims={
                triplesCountResult?.triples_aggregate?.total?.count ?? 0
              }
              totalStake={0} // TODO: need to find way to get the shares -- may need to update the schema
              link={`${PATHS.PROFILE}/data-about`}
            />
            <OverviewAboutHeader
              variant="positions"
              atomImage={accountResult?.account?.image ?? ''}
              atomLabel={accountResult?.account?.label ?? ''}
              totalPositions={
                positionsCountResult?.positions_aggregate?.total?.count ?? 0
              }
              totalStake={
                +formatBalance(
                  positionsCountResult?.positions_aggregate?.total?.sum
                    ?.shares ?? 0,
                )
              } // TODO: need to find way to get the shares -- may need to update the schema
              link={`${PATHS.PROFILE}/data-about`}
            />
          </div>
        </div>
      )}

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

      <div className="flex flex-col gap-4">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Top Lists
        </Text>
        <ListClaimsList
          listClaims={(savedListsResults?.triples ?? []).map((triple) => ({
            __typename: 'predicate_objects',
            id: triple.id,
            claim_count: triple.vault?.position_count ?? 0,
            triple_count: triple.vault?.position_count ?? 0,
            object: triple.object,
          }))}
          enableSort={false}
          enableSearch={false}
        />
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/index" />
}
