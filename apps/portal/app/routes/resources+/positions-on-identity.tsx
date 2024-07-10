import {
  ApiError,
  IdentityPositionsService,
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export type PositionsOnIdentityLoaderData = {
  positions: PositionPresenter[]
  sortBy: PositionSortColumn
  direction: SortDirection
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const id = searchParams.get('id')
  const search = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') ?? 'Assets'
  const direction = searchParams.get('direction') ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  console.log('searchParams', searchParams.toString())
  let positions
  try {
    positions = await IdentityPositionsService.getIdentityPositions({
      id: id ?? '',
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy as PositionSortColumn,
      direction: direction as SortDirection,
      creator: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      positions = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    positions: positions?.data,
    sortBy,
    direction,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: positions?.total,
      totalPages,
    },
  })
}
