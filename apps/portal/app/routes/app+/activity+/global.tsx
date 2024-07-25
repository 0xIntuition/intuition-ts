import { NO_WALLET_ERROR } from 'constants'

import {
  ActivitiesService,
  ActivityPresenter,
  SortColumn,
} from '@0xintuition/api'

import { ActivityList } from '@components/list/activity'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import logger from '@lib/utils/logger'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: SortColumn.CREATED_AT,
  })

  const globalActivity = await fetchWrapper({
    method: ActivitiesService.getActivities,
    args: {
      page,
      limit,
      sortBy,
      direction,
    },
  })

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
        pagination={pagination as PaginationType}
      />
    </div>
  )
}
