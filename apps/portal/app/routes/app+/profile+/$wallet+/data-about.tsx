import {
  ClaimSortColumn,
  OpenAPI,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { ClaimsOnIdentity } from '@components/claims-on-identity'
import { PositionsOnIdentity } from '@components/positions-on-identity'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  fetchClaimsByIdentity,
  fetchPositionsByIdentity,
  fetchUserIdentity,
} from '@lib/utils/fetches'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'
import { InitialIdentityData } from 'types/identity'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const identity = await fetchUserIdentity(wallet)

  if (!identity) {
    return redirect('/create')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  // const search = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') ?? 'UpdatedAt'
  const direction = searchParams.get('direction') ?? 'asc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const positions = await fetchPositionsByIdentity(
    wallet,
    page,
    Number(limit),
    sortBy as PositionSortColumn,
    direction as SortDirection,
  )

  const claims = await fetchClaimsByIdentity(
    wallet,
    page,
    Number(limit),
    sortBy as ClaimSortColumn,
    direction as SortDirection,
  )

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    identity,
    positions,
    claims,
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

export default function ProfileDataAbout() {
  const initialData = useLiveLoader<typeof loader>(['attest'])

  return (
    <div className="flex-col justify-start items-start flex w-full">
      <ClaimsOnIdentity initialData={initialData as InitialIdentityData} />
      <PositionsOnIdentity initialData={initialData as InitialIdentityData} />
    </div>
  )
}
