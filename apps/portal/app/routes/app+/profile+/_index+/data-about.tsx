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
import { json, LoaderFunctionArgs } from '@remix-run/node'
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

  const positions = await fetchWrapper({
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

  const positionsTotalPages = calculateTotalPages(
    positions?.total ?? 0,
    Number(positionsLimit),
  )

  const {
    page: claimsPage,
    limit: claimsLimit,
    sortBy: claimsSortBy,
    direction: claimsDirection,
  } = getStandardPageParams({ searchParams, paramPrefix: 'claims' })

  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claims = await fetchWrapper({
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

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(claimsLimit),
  )

  const claimsSummary = await fetchWrapper({
    method: ClaimsService.claimSummary,
    args: {
      identity: userIdentity.id,
    },
  })

  return json({
    userIdentity,
    positions: positions?.data as PositionPresenter[],
    positionsSortBy,
    positionsDirection,
    positionsPagination: {
      currentPage: Number(positionsPage),
      limit: Number(positionsLimit),
      totalEntries: positions?.total ?? 0,
      totalPages: positionsTotalPages,
    },
    claims: claims?.data as ClaimPresenter[],
    claimsSummary,
    claimsSortBy,
    claimsDirection,
    claimsPagination: {
      currentPage: Number(claimsPage),
      limit: Number(claimsLimit),
      totalEntries: claims?.total ?? 0,
      totalPages: claimsTotalPages,
    },
  })
}

export default function ProfileDataAbout() {
  const {
    userIdentity,
    positions,
    positionsPagination,
    claims,
    claimsSummary,
    claimsPagination,
  } = useLiveLoader<typeof loader>(['attest'])
  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <DataAboutHeader
          variant="claims"
          title="Claims about this Identity"
          userIdentity={userIdentity}
          totalClaims={claimsPagination.totalEntries}
          totalStake={+formatBalance(claimsSummary?.assets_sum ?? 0, 18, 4)}
        />
        <ClaimsAboutIdentity
          claims={claims}
          pagination={claimsPagination}
          paramPrefix="claims"
          enableSearch
        />
      </div>
      <div className="flex flex-col pt-4 w-full">
        <DataAboutHeader
          variant="positions"
          title="Positions on this Identity"
          userIdentity={userIdentity}
          totalPositions={userIdentity.num_positions}
          totalStake={+formatBalance(userIdentity.assets_sum, 18, 4)}
        />
        <PositionsOnIdentity
          positions={positions}
          pagination={positionsPagination}
        />
      </div>
    </div>
  )
}
