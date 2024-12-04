import { Suspense } from 'react'

import { ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  fetcher,
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
import { PositionsOnIdentityNew } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useRouteLoaderData } from '@remix-run/react'
import { QueryClient } from '@tanstack/react-query'
import { NO_IDENTITY_ERROR, NO_PARAM_ID_ERROR } from 'app/consts'

import { ReadOnlyIdentityLoaderData } from '../$id'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const queryClient = new QueryClient()

  const triplesLimit = parseInt(url.searchParams.get('claimsLimit') || '10')
  const triplesOffset = parseInt(url.searchParams.get('claimsOffset') || '0')
  const triplesOrderBy = url.searchParams.get('claimsSortBy')

  const triplesWhere = {
    _or: [
      {
        subjectId: {
          _eq: id,
        },
      },
      {
        objectId: {
          _eq: id,
        },
      },
      {
        predicateId: {
          _eq: id,
        },
      },
    ],
  }

  const positionsLimit = parseInt(
    url.searchParams.get('positionsLimit') || '10',
  )
  const positionsOffset = parseInt(
    url.searchParams.get('positionsOffset') || '0',
  )
  const positionsOrderBy = url.searchParams.get('positionsSortBy')

  const positionsWhere = {
    vaultId: { _eq: id },
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-atom', { id: params.id }],
    queryFn: () =>
      fetcher<GetAtomQuery, GetAtomQueryVariables>(GetAtomDocument, {
        id: params.id,
      })(),
  })

  await queryClient.prefetchQuery({
    queryKey: [
      'get-triples-with-positions',
      { triplesWhere, triplesLimit, triplesOffset, triplesOrderBy },
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
      })(),
  })

  await queryClient.prefetchQuery({
    queryKey: [
      'get-atom-positions',
      { positionsWhere, positionsLimit, positionsOffset, positionsOrderBy },
    ],
    queryFn: () =>
      fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
        GetPositionsDocument,
        {
          where: positionsWhere,
          limit: positionsLimit,
          offset: positionsOffset,
          orderBy: positionsOrderBy
            ? [{ [positionsOrderBy]: 'desc' }]
            : undefined,
        },
      )(),
  })

  return json({
    initialParams: {
      triplesLimit,
      triplesOffset,
      triplesOrderBy,
      triplesWhere,
      positionsLimit,
      positionsOffset,
      positionsOrderBy,
      positionsWhere,
      atomId: params.id,
    },
  })
}

export default function ReadOnlyProfileDataAbout() {
  const { initialParams } = useLoaderData<typeof loader>()

  const { identity } =
    useRouteLoaderData<ReadOnlyIdentityLoaderData>(
      'routes/readonly+/identity+/$id',
    ) ?? {}
  invariant(identity, NO_IDENTITY_ERROR)

  const { data: atomResult, isLoading: isLoadingAtom } = useGetAtomQuery(
    {
      id: initialParams.atomId,
    },
    {
      queryKey: ['get-atom', { id: initialParams.atomId }],
    },
  )

  const {
    data: triplesResult,
    isLoading: isLoadingTriples,
    isError: isErrorTriples,
    error: errorTriples,
  } = useGetTriplesWithPositionsQuery(
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
        'get-triples-with-positions',
        {
          where: initialParams.triplesWhere,
          limit: initialParams.triplesLimit,
          offset: initialParams.triplesOffset,
          orderBy: initialParams.triplesOrderBy,
        },
      ],
    },
  )

  const {
    data: positionsResult,
    isLoading: isLoadingPositions,
    isError: isErrorPositions,
    error: errorPositions,
  } = useGetPositionsQuery(
    {
      where: initialParams.positionsWhere,
      limit: initialParams.positionsLimit,
      offset: initialParams.positionsOffset,
      orderBy: initialParams.positionsOrderBy
        ? [{ [initialParams.positionsOrderBy]: 'desc' }]
        : undefined,
    },
    {
      queryKey: [
        'get-atom-positions',
        {
          where: initialParams.positionsWhere,
          limit: initialParams.positionsLimit,
          offset: initialParams.positionsOffset,
          orderBy: initialParams.positionsOrderBy,
        },
      ],
    },
  )

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
            {isLoadingTriples && isLoadingAtom ? (
              <DataHeaderSkeleton />
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
                enableSearch={false}
                enableSort={false}
                readOnly
              />
            )}
          </Suspense>
        </div>
        <div className="flex flex-col w-full gap-6">
          <div className="self-stretch justify-between items-center inline-flex">
            <Text
              variant="headline"
              weight="medium"
              className="text-secondary-foreground w-full"
              id="positions"
            >
              Positions on this Identity
            </Text>
          </div>
          <Suspense fallback={<DataHeaderSkeleton />}>
            {isLoadingPositions && isLoadingAtom ? (
              <DataHeaderSkeleton />
            ) : (
              <DataAboutHeader
                variant="positions"
                atomImage={atomResult?.atom?.image ?? ''}
                atomLabel={atomResult?.atom?.label ?? ''}
                atomVariant="user" // TODO: Determine based on atom type
                totalPositions={positionsResult?.total?.aggregate?.count ?? 0}
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
              <PositionsOnIdentityNew
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
  return <ErrorPage routeName="identity/$id/index" />
}
