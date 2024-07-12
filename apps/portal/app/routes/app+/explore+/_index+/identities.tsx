import {
  IdentityPresenter,
  OpenAPI,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { IdentitiesList } from '@components/list/identities'
import { fetchIdentities } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('search')
  const sortBy: SortColumn =
    (searchParams.get('sortBy') as SortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const identities = await fetchIdentities(
    page,
    Number(limit),
    sortBy as SortColumn,
    direction as SortDirection,
    search,
  )

  const totalPages = calculateTotalPages(identities?.total ?? 0, Number(limit))

  return json({
    identities: identities?.data as IdentityPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: identities?.total ?? 0,
      totalPages,
    },
    user,
  })
}

export default function ExploreIdentities() {
  const { identities, pagination } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <IdentitiesList identities={identities} pagination={pagination} />
    </div>
  )
}
