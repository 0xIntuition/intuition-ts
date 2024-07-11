import {
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { PositionsOnClaim } from '@components/list/positions-on-claim'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { fetchClaim, fetchPositionsOnClaim } from '@lib/utils/fetches'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const id = params.id

  if (!id) {
    throw new Error('Claim ID is undefined.')
  }

  const claim = await fetchClaim(id)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('search')
  const sortBy: PositionSortColumn =
    (searchParams.get('sortBy') as PositionSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const positionDirection: string =
    searchParams.get('positionDirection') ?? 'all'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const positions = await fetchPositionsOnClaim(
    positionDirection === 'for'
      ? claim?.vault_id ?? id
      : positionDirection === 'against'
        ? claim?.counter_vault_id ?? id
        : id,
    page,
    Number(limit),
    sortBy as PositionSortColumn,
    direction as SortDirection,
    search,
  )

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    claim,
    positions: positions?.data as PositionPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: positions?.total ?? 0,
      totalPages,
    },
  })
}

export default function ClaimOverview() {
  const { positions, pagination } = useLiveLoader<typeof loader>([
    'attest',
    'create',
  ])
  return (
    <div className="flex-col justify-start items-start flex w-full">
      <PositionsOnClaim positions={positions} pagination={pagination} />
    </div>
  )
}
