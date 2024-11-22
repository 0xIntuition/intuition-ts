import { URLSearchParams } from 'url'
import { Suspense } from 'react'

import { Button, ErrorStateCard, Icon, IconName, Text } from '@0xintuition/1ui'
import { ClaimsService } from '@0xintuition/api'
import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetPositionsDocument,
  GetPositionsQuery,
  GetPositionsQueryVariables,
  useGetAtomQuery,
  useGetAtomQuery,
  useGetPositionsQuery,
} from '@0xintuition/graphql'

import CreateClaimModal from '@components/create-claim/create-claim-modal'
import { ErrorPage } from '@components/error-page'
import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getPositionsOnIdentity } from '@lib/services/positions'
import { detailCreateClaimModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import {
  NO_IDENTITY_ERROR,
  NO_PARAM_ID_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'
import { useAtom } from 'jotai'

import { IdentityLoaderData } from '../$id'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const id = params.id

  invariant(id, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const positionsLimit = parseInt(
    url.searchParams.get('positionsLimit') || '10',
  )
  const positionsOffset = parseInt(
    url.searchParams.get('positionsOffset') || '0',
  )
  const positionsOrderBy = url.searchParams.get('positionsOrderBy')

  const queryClient = new QueryClient()

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

  return defer({
    positions: getPositionsOnIdentity({
      request,
      identityId: id,
      searchParams,
    }),
    claims: getClaimsAboutIdentity({
      request,
      identityId: id,
      searchParams,
    }),
    claimsSummary: fetchWrapper(request, {
      method: ClaimsService.claimSummary,
      args: {
        identity: id,
      },
    }),
    wallet,
    initialParams: {
      positionsLimit,
      positionsOffset,
      positionsOrderBy,
      positionsWhere,
      atomId: params.id,
    },
  })
}

export default function ProfileDataAbout() {
  const { initialParams, positions, claims, claimsSummary, wallet } =
    useLiveLoader<typeof loader>(['attest'])

  const { identity } =
    useRouteLoaderData<IdentityLoaderData>('routes/app+/identity+/$id') ?? {}
  invariant(identity, NO_IDENTITY_ERROR)

  const [createClaimModalActive, setCreateClaimModalActive] = useAtom(
    detailCreateClaimModalAtom,
  )

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
    data: positionsResult, 
    isLoading: isLoadingPositions, 
    isError: isErrorPositions, 
    error: errorPositions 
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
            <Button
              variant="primary"
              className="max-lg:w-full max-lg:mt-2"
              onClick={() => setCreateClaimModalActive(true)}
            >
              <Icon name={IconName.claim} className="h-4 w-4" /> Make a Claim
            </Button>
          </div>
          <Suspense fallback={<DataHeaderSkeleton />}>
            <Await resolve={claims} errorElement={<></>}>
              {(resolvedClaims) => (
                <Await resolve={claimsSummary} errorElement={<></>}>
                  {(resolvedClaimsSummary) => (
                    <DataAboutHeader
                      variant="claims"
                      userIdentity={identity}
                      totalClaims={resolvedClaims.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          resolvedClaimsSummary?.assets_sum ?? 0,
                          18,
                        )
                      }
                    />
                  )}
                </Await>
              )}
            </Await>
          </Suspense>
          <Suspense fallback={<PaginatedListSkeleton />}>
            <Await
              resolve={claims}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedClaims) => (
                <ClaimsAboutIdentity
                  claims={resolvedClaims.data}
                  pagination={resolvedClaims.pagination}
                  paramPrefix="claims"
                  enableSearch
                  enableSort
                />
              )}
            </Await>
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
                atomVariant='user' // TODO: Determine based on atom type
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
                message={(errorPositions as Error)?.message ?? 'An unexpected error occurred'}
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
      {wallet && (
        <CreateClaimModal
          open={createClaimModalActive}
          wallet={wallet}
          onClose={() => setCreateClaimModalActive(false)}
        />
      )}
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="identity/$id/index" />
}
