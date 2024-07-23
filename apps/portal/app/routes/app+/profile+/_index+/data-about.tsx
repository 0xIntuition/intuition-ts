import { Suspense } from 'react'

import { Skeleton } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  ClaimSummaryResponse,
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
import { fetchWrapper, formatBalance, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

async function getPositions(userWallet: string, searchParams: URLSearchParams) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.ASSETS,
  })
  const positionsSearch =
    (searchParams.get('positionsSearch') as Identifier) || null

  const positions = await fetchWrapper({
    method: IdentityPositionsService.getIdentityPositions,
    args: {
      id: userWallet,
      page,
      limit,
      sortBy: sortBy as PositionSortColumn,
      direction,
      creator: positionsSearch,
    },
  })

  return {
    data: positions.data as PositionPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: positions.total,
      totalPages: Math.ceil(positions.total / Number(limit)),
    },
  }
}

async function getClaims(
  userIdentityId: string,
  searchParams: URLSearchParams,
) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
  })
  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      identity: userIdentityId,
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      displayName: claimsSearch,
    },
  })

  return {
    data: claims.data as ClaimPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: claims.total,
      totalPages: Math.ceil(claims.total / Number(limit)),
    },
  }
}

async function getClaimSummary(userIdentityId: string) {
  const claimSummary = await fetchWrapper({
    method: ClaimsService.claimSummary,
    args: {
      identity: userIdentityId,
    },
  })

  return claimSummary as ClaimSummaryResponse
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const userIdentity = await fetchWrapper({
    method: IdentitiesService.getIdentityById,
    args: { id: userWallet },
  })

  if (!userIdentity) {
    throw new Error('No user identity found')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    throw new Error('Invalid or missing creator ID')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    userIdentity,
    positions: getPositions(userWallet, searchParams),
    claims: getClaims(userIdentity.id, searchParams),
    claimsSummary: getClaimSummary(userIdentity.id),
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
              <Await resolve={claims}>
                {(resolvedClaims) => resolvedClaims.pagination.totalEntries}
              </Await>
            </Suspense>
          }
          totalStake={
            <Suspense fallback={<Skeleton className="h-6 w-14 inline-flex" />}>
              <Await resolve={claimsSummary}>
                {(cs) => `${formatBalance(cs?.assets_sum ?? 0, 18, 4)} ETH`}
              </Await>
            </Suspense>
          }
        />
        <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
          <Await resolve={claims} errorElement={<ErrorDisplay />}>
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
          <Await resolve={positions} errorElement={<ErrorDisplay />}>
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

function ErrorDisplay() {
  return (
    <div>An error occurred while loading data. Please try again later.</div>
  )
}
