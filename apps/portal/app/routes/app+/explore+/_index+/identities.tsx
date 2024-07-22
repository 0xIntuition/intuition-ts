import { IdentitiesService, IdentityPresenter } from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesList } from '@components/list/identities'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const displayName = searchParams.get('identity') || null
  const hasTag = searchParams.get('tagIds') || null

  const identities = await fetchWrapper({
    method: IdentitiesService.searchIdentity,
    args: {
      page,
      limit,
      sortBy,
      direction,
      displayName,
      hasTag,
    },
  })

  const totalPages = calculateTotalPages(identities?.total ?? 0, limit)

  return json({
    identities: identities?.data as IdentityPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: identities?.total ?? 0,
      totalPages,
    },
  })
}

export default function ExploreIdentities() {
  const { identities, pagination } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ExploreSearch variant="identity" className="mb-12" />
      <IdentitiesList
        identities={identities}
        pagination={pagination as PaginationType}
      />
    </div>
  )
}
