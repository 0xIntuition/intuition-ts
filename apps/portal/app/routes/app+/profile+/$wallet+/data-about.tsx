import {
  ClaimPresenter,
  ClaimsService,
  IdentitiesService,
  IdentityPositionsService,
  PositionPresenter,
} from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { getClaimsPageParams, getPositionPageParams } from '@lib/utils/loader'
import {
  calculateTotalPages,
  fetchWrapper,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const userIdentity = await fetchWrapper({
    method: IdentitiesService.getIdentityById,
    args: {
      id: wallet,
    },
  })

  if (!userIdentity) {
    return redirect('/create')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const {
    page: positionsPage,
    limit: positionsLimit,
    sortBy: positionsSortBy,
    direction: positionsDirection,
    creator: positionsSearch,
  } = getPositionPageParams({ searchParams })

  const positions = await fetchWrapper({
    method: IdentityPositionsService.getIdentityPositions,
    args: {
      id: wallet,
      page: positionsPage,
      limit: positionsLimit,
      sortBy: positionsSortBy,
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
    displayName: claimsSearch,
  } = getClaimsPageParams({ searchParams })

  const claims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      identity: userIdentity.id,
      page: claimsPage,
      limit: claimsLimit,
      sortBy: claimsSortBy,
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
          pagination={claimsPagination as PaginationType}
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
          pagination={positionsPagination as PaginationType}
        />
      </div>
    </div>
  )
}
