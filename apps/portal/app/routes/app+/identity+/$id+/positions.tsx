import {
  ApiError,
  OpenAPI,
  PositionSortColumn,
  PositionsService,
  SortDirection,
} from '@0xintuition/api'

import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const id = params.id

  if (!id) {
    throw new Error('identity_id is undefined.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const sortBy: PositionSortColumn =
    (searchParams.get('sortBy') as PositionSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let positions
  try {
    positions = await PositionsService.searchPositions({
      vault: id,
      paging: {
        page: page,
        limit: Number(limit),
        offset: 0,
      },
      sort: {
        sortBy: sortBy,
        direction: direction,
      },
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

  console.log('positions', positions)

  return json({
    positions,
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

export default function IdentityPositions() {
  const { positions } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Identity Positions Route</div>
      <div>{JSON.stringify(positions)}</div>
    </div>
  )
}
