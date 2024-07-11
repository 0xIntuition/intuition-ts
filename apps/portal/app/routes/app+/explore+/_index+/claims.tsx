import {
  ClaimPresenter,
  ClaimSortColumn,
  OpenAPI,
  SortDirection,
} from '@0xintuition/api'

import { ClaimsList } from '@components/list/claims'
import { fetchClaims } from '@lib/utils/fetches'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') ?? 'AssetsSum'
  const direction = searchParams.get('direction') ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const claims = await fetchClaims(
    page,
    Number(limit),
    sortBy as ClaimSortColumn,
    direction as SortDirection,
    search,
  )

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(limit),
  )

  console.log('claims', claims)

  return json({
    claims: claims?.data as ClaimPresenter[],
    claimsPagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: claims?.total ?? 0,
      totalPages: claimsTotalPages,
    },
  })
}

export default function ExploreClaims() {
  const { claims, claimsPagination } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ClaimsList claims={claims} pagination={claimsPagination} />
    </div>
  )
}
