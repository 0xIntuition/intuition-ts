import { IdentitiesService, IdentityPresenter } from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesList } from '@components/list/identities'
import logger from '@lib/utils/logger'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const displayName = searchParams.get('user') || null

  const identities = await fetchWrapper(request, {
    method: IdentitiesService.searchIdentity,
    args: {
      page,
      limit,
      sortBy,
      direction,
      displayName,
      isUser: true,
    },
  })

  const totalPages = calculateTotalPages(identities?.total ?? 0, limit)
  logger('identities', identities)

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

export default function ExploreUsers() {
  const { identities, pagination } = useLoaderData<typeof loader>()

  return (
    <>
      <ExploreSearch variant="user" />
      <IdentitiesList
        identities={identities}
        pagination={pagination}
        enableSearch={false}
        enableSort={true}
      />
    </>
  )
}
