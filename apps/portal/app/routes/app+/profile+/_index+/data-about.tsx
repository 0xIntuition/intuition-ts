import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  OpenAPI,
  PositionSortColumn,
  PositionsService,
  SortDirection,
} from '@0xintuition/api'

import { ClaimsOnIdentity } from '@components/claims-on-identity'
import { PositionsOnIdentity } from '@components/positions-on-identity'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import logger from '@lib/utils/logger'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'
import { InitialIdentityData } from 'types/identity'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')
  console.log('accessToken', accessToken)

  if (!user?.details?.wallet?.address) {
    return console.log('No user found in session')
  }

  let identity
  try {
    identity = await IdentitiesService.getIdentityById({
      id: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      identity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
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

  let positions
  try {
    positions = await PositionsService.searchPositions({
      identity: user.details.wallet.address,
      paging: {
        page: page,
        limit: Number(limit),
        offset: 0,
      },
      sort: {
        sortBy: sortBy as PositionSortColumn,
        direction: direction as SortDirection,
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

  let claims
  try {
    claims = await ClaimsService.searchClaims({
      identity: identity?.id,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy as ClaimSortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claims = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

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
