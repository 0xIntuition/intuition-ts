import { ActivityPresenter, SortColumn, SortDirection } from '@0xintuition/api'

import { ActivityList } from '@components/list/activity'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { fetchGlobalActivity } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

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

  const globalActivity = await fetchGlobalActivity(
    page,
    Number(limit),
    sortBy as SortColumn,
    direction as SortDirection,
  )

  const totalPages = calculateTotalPages(
    globalActivity?.total ?? 0,
    Number(limit),
  )
  logger('globalActivity', globalActivity)

  return json({
    globalActivity: globalActivity?.data as ActivityPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: globalActivity?.total ?? 0,
      totalPages,
    },
  })
}

export default function GlobalActivityFeed() {
  const { globalActivity, pagination } = useLiveLoader<typeof loader>([
    'attest',
    'create',
  ])

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ActivityList
        activities={globalActivity as ActivityPresenter[]}
        pagination={pagination}
      />
    </div>
  )
}
