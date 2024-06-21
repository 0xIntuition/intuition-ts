import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  OpenAPI,
  SortDirection,
} from '@0xintuition/api'

import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = process.env.API_URL
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const sortBy: ClaimSortColumn =
    (searchParams.get('sortBy') as ClaimSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let claims
  try {
    claims = await ClaimsService.searchClaims({
      identity: wallet,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy,
      direction: direction,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claims = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(claims?.total ?? 0, Number(limit))

  return json({
    claims,
    sortBy,
    direction,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: claims?.total,
      totalPages,
    },
  })
}

export default function ProfileClaims() {
  const { claims } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Profile Claims Route</div>
      <div>{JSON.stringify(claims)}</div>
    </div>
  )
}
