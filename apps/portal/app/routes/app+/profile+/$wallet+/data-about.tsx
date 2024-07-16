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
  fetchPositionsOnIdentity,
} from '@lib/utils/fetches'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useRouteLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

import { ProfileLoaderData } from '../$wallet'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
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
    wallet,
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

  const claimsSummary = await fetchClaimsSummary(wallet)

  return json({
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
    positions,
    positionsPagination,
    claims,
    claimsSummary,
    claimsPagination,
  } = useLiveLoader<typeof loader>(['attest'])

  const { userIdentity } =
    useRouteLoaderData<ProfileLoaderData>('routes/app+/profile+/$wallet') ?? {}

  if (!userIdentity) {
    return null
  }

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
