import {
  ClaimPresenter,
  ClaimSortColumn,
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  fetchClaimsAboutIdentity,
  fetchClaimsSummary,
  fetchIdentity,
  fetchPositionsOnIdentity,
} from '@lib/utils/fetches'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const userIdentity = await fetchIdentity(wallet)

  if (!userIdentity) {
    return redirect('/create')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const positionsSearch = searchParams.get('positionsSearch')
  const positionsSortBy = searchParams.get('positionsSortBy') ?? 'Assets'
  const positionsDirection = searchParams.get('positionsDirection') ?? 'desc'
  const positionsPage = searchParams.get('positionsPage')
    ? parseInt(searchParams.get('positionsPage') as string)
    : 1
  const positionsLimit = searchParams.get('positionsLimit') ?? '10'

  const positions = await fetchPositionsOnIdentity(
    wallet,
    positionsPage,
    Number(positionsLimit),
    positionsSortBy as PositionSortColumn,
    positionsDirection as SortDirection,
    positionsSearch,
  )

  const positionsTotalPages = calculateTotalPages(
    positions?.total ?? 0,
    Number(positionsLimit),
  )

  const claimsSearch = searchParams.get('claimsSearch')
  const claimsSortBy = searchParams.get('claimsSortBy') ?? 'AssetsSum'
  const claimsDirection = searchParams.get('claimsDirection') ?? 'desc'
  const claimsPage = searchParams.get('claimsPage')
    ? parseInt(searchParams.get('claimsPage') as string)
    : 1
  const claimsLimit = searchParams.get('claimsLimit') ?? '10'

  const claims = await fetchClaimsAboutIdentity(
    userIdentity.id,
    claimsPage,
    Number(claimsLimit),
    claimsSortBy as ClaimSortColumn,
    claimsDirection as SortDirection,
    claimsSearch,
  )

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(claimsLimit),
  )

  const claimsSummary = await fetchClaimsSummary(userIdentity.id)

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
    <div className="flex-col justify-start items-start flex w-full">
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
      />
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
  )
}
