import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ListClaimsList } from '@components/list/list-claims'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR, TAG_PREDICATE_VAULT_ID_TESTNET } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const displayName = searchParams.get('list') || null

  const listClaims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      displayName,
      predicate: TAG_PREDICATE_VAULT_ID_TESTNET,
    },
  })

  const totalPages = calculateTotalPages(listClaims?.total ?? 0, limit)

  return json({
    listClaims: listClaims?.data as ClaimPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: listClaims?.total ?? 0,
      totalPages,
    },
  })
}

export default function ExploreLists() {
  const { listClaims, pagination } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col items-center gap-6 w-full">
      <ExploreSearch variant="list" />
      <ListClaimsList
        listClaims={listClaims}
        pagination={pagination}
        enableSort={true}
      />
    </div>
  )
}
