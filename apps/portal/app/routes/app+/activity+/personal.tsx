import {
  ActivityPresenter,
  OpenAPI,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { ActivityList } from '@components/list/activity'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { fetchUserActivity } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
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
  const sortBy: SortColumn =
    (searchParams.get('sortBy') as SortColumn) ?? 'CreatedAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const userActivity = await fetchUserActivity(
    page,
    Number(limit),
    sortBy as SortColumn,
    direction as SortDirection,
    user?.details?.wallet?.address,
  )

  const totalPages = calculateTotalPages(
    userActivity?.total ?? 0,
    Number(limit),
  )
  logger('userActivity', userActivity)

  return json({
    userActivity: userActivity?.data as ActivityPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: userActivity?.total ?? 0,
      totalPages,
    },
  })
}

export default function PersonalActivityFeed() {
  const { userActivity, pagination } = useLiveLoader<typeof loader>([
    'attest',
    'create',
  ])

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ActivityList activities={userActivity} pagination={pagination} />
    </div>
  )
}
