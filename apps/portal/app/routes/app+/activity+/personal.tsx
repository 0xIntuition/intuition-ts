import {
  ActivitiesService,
  ActivityPresenter,
  SortColumn,
} from '@0xintuition/api'

import { ActivityList } from '@components/list/activity'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUser, requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: SortColumn.CREATED_AT,
  })

  const userActivity = await fetchWrapper({
    method: ActivitiesService.getActivities,
    args: {
      page,
      limit,
      sortBy: sortBy as SortColumn,
      direction,
      fromAddress: userWallet,
    },
  })

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
      <ActivityList
        activities={userActivity as ActivityPresenter[]}
        pagination={pagination}
      />
    </div>
  )
}
