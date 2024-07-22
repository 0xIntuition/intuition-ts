import { Suspense } from 'react'

import { Skeleton } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  Identifier,
  IdentitiesService,
  IdentityPositionsService,
  PositionPresenter,
  PositionSortColumn,
} from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  fetchWrapper,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const userIdentity = await fetchWrapper({
    method: IdentitiesService.getIdentityById,
    args: {
      id: userWallet,
    },
  })

  if (!userIdentity) {
    return logger('No user identity found')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    logger('Invalid or missing creator ID')
    return
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const {
    page: positionsPage,
    limit: positionsLimit,
    sortBy: positionsSortBy,
    direction: positionsDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.ASSETS,
  })

  const positionsSearch =
    (searchParams.get('positionsSearch') as Identifier) || null

  const positionsPromise = fetchWrapper({
    method: IdentityPositionsService.getIdentityPositions,
    args: {
      id: userWallet,
      page: positionsPage,
      limit: positionsLimit,
      sortBy: positionsSortBy as PositionSortColumn,
      direction: positionsDirection,
      creator: positionsSearch,
    },
  })

  const {
    page: claimsPage,
    limit: claimsLimit,
    sortBy: claimsSortBy,
    direction: claimsDirection,
  } = getStandardPageParams({ searchParams, paramPrefix: 'claims' })

  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claimsPromise = fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      identity: userIdentity.id,
      page: claimsPage,
      limit: claimsLimit,
      sortBy: claimsSortBy as ClaimSortColumn,
      direction: claimsDirection,
      displayName: claimsSearch,
    },
  })

  const claimsSummaryPromise = fetchWrapper({
    method: ClaimsService.claimSummary,
    args: {
      identity: userIdentity.id,
    },
  })

  return defer({
    userIdentity,
    positions: positionsPromise.then((positions) => ({
      data: positions.data as PositionPresenter[],
      pagination: {
        currentPage: Number(positionsPage),
        limit: Number(positionsLimit),
        totalEntries: positions.total,
        totalPages: calculateTotalPages(
          positions.total,
          Number(positionsLimit),
        ),
      },
    })),
    positionsSortBy,
    positionsDirection,
    claims: claimsPromise.then((claims) => ({
      data: claims.data as ClaimPresenter[],
      pagination: {
        currentPage: Number(claimsPage),
        limit: Number(claimsLimit),
        totalEntries: claims.total,
        totalPages: calculateTotalPages(claims.total, Number(claimsLimit)),
      },
    })),
    claimsSummary: claimsSummaryPromise,
    claimsSortBy,
    claimsDirection,
  })
}

export default function ProfileDataAbout() {
  const { userIdentity, positions, claims, claimsSummary } = useLiveLoader<
    typeof loader
  >(['attest'])

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <DataAboutHeader
          variant="claims"
          title="Claims about this Identity"
          userIdentity={userIdentity}
          totalClaims={
            <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
              <Await resolve={claims.then((c) => c.pagination.totalEntries)}>
                {(totalClaims) => totalClaims}
              </Await>
            </Suspense>
          }
          totalStake={
            <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
              <Await resolve={claimsSummary.then((cs) => +cs?.assets_sum ?? 0)}>
                {(totalStake) => +formatBalance(totalStake ?? 0, 18, 4)}
              </Await>
            </Suspense>
          }
        />
        <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
          <Await resolve={claims}>
            {(resolvedClaims) => (
              <ClaimsAboutIdentity
                claims={resolvedClaims.data}
                pagination={resolvedClaims.pagination}
                paramPrefix="claims"
                enableSearch
              />
            )}
          </Await>
        </Suspense>
      </div>
      <div className="flex flex-col pt-4 w-full">
        <DataAboutHeader
          variant="positions"
          title="Positions on this Identity"
          userIdentity={userIdentity}
          totalPositions={userIdentity.num_positions}
          totalStake={+formatBalance(userIdentity.assets_sum, 18, 4)}
        />
        <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
          <Await resolve={positions}>
            {(resolvedPositions) => (
              <PositionsOnIdentity
                positions={resolvedPositions.data}
                pagination={resolvedPositions.pagination}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
