import {
  ActivitiesService,
  ActivityPresenter,
  SortColumn,
} from '@0xintuition/api'

import { fetchWrapper } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'

export async function getActivity({
  searchParams,
  fromAddress,
}: {
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

  const activity = await fetchWrapper({
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
