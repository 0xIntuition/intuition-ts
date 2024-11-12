import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import { CURRENT_ENV } from '@consts/general'
import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'

export async function getTags({
  request,
  subjectId,
  creator,
  userWithPosition,
  searchParams,
  userAssetsForPresent = null,
}: {
  request: Request
  subjectId: string
  creator?: string
  userWithPosition?: string
  searchParams: URLSearchParams
  userAssetsForPresent?: boolean | null
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })
  const displayName = searchParams.get('search') || null

  const tagClaims = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      subject: subjectId,
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      displayName,
      creator,
      userWithPosition,
      userAssetsForPresent,
    },
  })

  const totalPages = calculateTotalPages(tagClaims?.total ?? 0, limit)

  return {
    tagClaims: tagClaims.data as ClaimPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: tagClaims.total,
      totalPages,
    },
  }
}
