import { Suspense } from 'react'

import { ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetPositionsDocument,
  GetPositionsQuery,
  GetPositionsQueryVariables,
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  useGetAtomQuery,
  useGetPositionsQuery,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ClaimsListNew as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentityNew as PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { QueryClient } from '@tanstack/react-query'
import { NO_PARAM_ID_ERROR } from 'app/consts'

export async function loader({ params }: LoaderFunctionArgs) {
  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  const queryAddress = wallet.toLowerCase()

  const queryClient = new QueryClient()

  logger('Fetching Account Data...')
  const accountResult = await fetcher<
    GetAccountQuery,
    GetAccountQueryVariables
  >(GetAccountDocument, { address: queryAddress })()

  if (!accountResult) {
    throw new Error('No account data found for address')
  }

  if (!accountResult.account?.atom_id) {
    throw new Error('No atom ID found for account')
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-account', { address: queryAddress }],
    queryFn: () => accountResult,
  })

  const atomId = accountResult.account.atom_id
  logger('atomId', atomId)

  const triplesWhere = {
    _or: [
      {
        subject_id: {
          _eq: atomId,
        },
      },
      {
        predicate_id: {
          _eq: atomId,
        },
      },
      {
        object_id: {
          _eq: atomId,
        },
      },
    ],
  }

  const positionsWhere = {
    vault_id: { _eq: atomId },
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-atom', { id: atomId }],
    queryFn: () =>
      fetcher<GetAtomQuery, GetAtomQueryVariables>(GetAtomDocument, {
        id: atomId,
      })(),
  })

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
    queryKey: ['get-atom-positions', { positionsWhere }],
    queryFn: () =>
      fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
        GetPositionsDocument,
        {
          where: positionsWhere,
          limit: 10,
          offset: 0,
          orderBy: [{ shares: 'desc' }],
        },
      )(),
  })

  return json({
    queryAddress,
    initialParams: {
      triplesWhere,
      positionsWhere,
      atomId,
    },
  })
}

export default function ReadOnlyProfileDataAbout() {
  const { queryAddress, initialParams } = useLoaderData<typeof loader>()

  logger('initialParams', initialParams)

  const { data: atomResult, isLoading: isLoadingAtom } = useGetAtomQuery(
    {
      id: initialParams.atomId,
    },
    {
      queryKey: ['get-atom', { id: initialParams.atomId }],
    },
  )

  logger('Atom Result (Client):', atomResult)

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
          orderBy: [{ block_number: 'desc' }],
          address: queryAddress,
        },
      ],
    },
  )

  logger('Triples Result (Client):', triplesResult)

  const {
    data: positionsResult,
    isLoading: isLoadingPositions,
    isError: isErrorPositions,
    error: errorPositions,
  } = useGetPositionsQuery(
    {
      where: initialParams.positionsWhere,
      limit: 10,
      offset: 0,
      orderBy: [{ shares: 'desc' }],
    },
    {
      queryKey: [
        'get-atom-positions',
        {
          where: initialParams.positionsWhere,
          limit: 10,
          offset: 0,
          orderBy: [{ shares: 'desc' }],
        },
      ],
    },
  )

  logger('Positions Result (Client):', positionsResult)

  return (
    <>
      <div className="flex-col justify-start items-start flex w-full gap-10">
        <div className="flex flex-col w-full gap-6">
          <div className="flex max-lg:flex-col justify-between items-center max-lg:w-full">
            <div className="self-stretch justify-between items-center inline-flex">
              <Text
                variant="headline"
                weight="medium"
                className="text-secondary-foreground w-full"
              >
                Claims about this Identity
              </Text>
            </div>
          </div>
          <Suspense fallback={<DataHeaderSkeleton />}>
            {isLoadingTriples || isLoadingAtom ? (
              <DataHeaderSkeleton />
            ) : isErrorTriples ? (
              <ErrorStateCard
                title="Failed to load claims"
                message={
                  (errorTriples as Error)?.message ??
                  'An unexpected error occurred'
                }
              />
            ) : (
              <DataAboutHeader
                variant="claims"
                atomImage={atomResult?.atom?.image ?? ''}
                atomLabel={atomResult?.atom?.label ?? ''}
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
            )}
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
        <div className="flex flex-col pt-4 w-full gap-6">
          <div className="self-stretch justify-between items-center inline-flex">
            <Text
              variant="headline"
              weight="medium"
              className="text-secondary-foreground w-full"
            >
              Positions on this Identity
            </Text>
          </div>
          <Suspense fallback={<DataHeaderSkeleton />}>
            {isLoadingTriples || isLoadingAtom ? (
              <DataHeaderSkeleton />
            ) : isErrorTriples ? (
              <ErrorStateCard
                title="Failed to load claims"
                message={
                  (errorTriples as Error)?.message ??
                  'An unexpected error occurred'
                }
              />
            ) : (
              <DataAboutHeader
                variant="positions"
                atomImage={atomResult?.atom?.image ?? ''}
                atomLabel={atomResult?.atom?.label ?? ''}
                atomVariant="user" // TODO: Determine based on atom type
                totalPositions={positionsResult?.total?.aggregate?.count ?? 0}
                // totalStake={0} // TODO: need to find way to get the shares -- may need to update the schema
                totalStake={
                  +formatBalance(
                    positionsResult?.total?.aggregate?.sum?.shares ?? 0,
                    18,
                  )
                }
              />
            )}
          </Suspense>
          <Suspense fallback={<PaginatedListSkeleton />}>
            {isLoadingPositions ? (
              <PaginatedListSkeleton />
            ) : isErrorPositions ? (
              <ErrorStateCard
                title="Failed to load positions"
                message={
                  (errorPositions as Error)?.message ??
                  'An unexpected error occurred'
                }
              >
                <RevalidateButton />
              </ErrorStateCard>
            ) : (
              <PositionsOnIdentity
                positions={positionsResult?.positions ?? []}
                pagination={positionsResult?.total?.aggregate?.count ?? {}}
              />
            )}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/data-about" />
}
