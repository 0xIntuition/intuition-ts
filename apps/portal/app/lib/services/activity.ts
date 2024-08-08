import {
  ActivitiesService,
  ActivityPresenter,
  SortColumn,
} from '@0xintuition/api'

import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'

export async function getActivity({
  request,
  searchParams,
  fromAddress,
}: {
  request: Request
  searchParams: URLSearchParams
  fromAddress?: string
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: SortColumn.CREATED_AT,
  })

  const activityArgs = {
    page,
    limit,
    sortBy: sortBy as SortColumn,
    direction,
    ...(fromAddress && { fromAddress }),
  }

  const activity = await fetchWrapper(request, {
    method: ActivitiesService.getActivities,
    args: activityArgs,
  })

  return {
    activity: activity.data as ActivityPresenter[],
    pagination: {
      currentPage: page,
      limit,
      totalEntries: activity.total,
      totalPages: Math.ceil(activity.total / limit),
    },
  }
}
