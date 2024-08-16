import { useEffect, useState } from 'react'

import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ListClaimsList } from '@components/list/list-claims'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { calculateTotalPages, invariant, loadMore } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useSearchParams, useSubmit } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR, TAG_PREDICATE_VAULT_ID_TESTNET } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, sortBy, direction } = getStandardPageParams({
    searchParams,
  })

  const displayName = searchParams.get('list') || null

  const initialLimit = 200
  const effectiveLimit = Number(
    searchParams.get('effectiveLimit') || initialLimit,
  )
  const limit = Math.max(effectiveLimit, initialLimit)

  const listClaims = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      page: 1,
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
  const submit = useSubmit()
  const { listClaims, pagination, sortBy, direction } = useLiveLoader<
    typeof loader
  >(['create', 'attest'])
  const [searchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')

  const [accumulatedClaims, setAccumulatedClaims] = useState<ClaimPresenter[]>(
    [],
  )

  useEffect(() => {
    const endIndex = currentPage * pagination.limit
    setAccumulatedClaims(listClaims.slice(0, endIndex))
  }, [listClaims, currentPage, pagination.limit])

  const handleLoadMore = loadMore({
    currentPage,
    pagination,
    sortBy,
    direction,
    submit,
  })

  return (
    <>
      <ExploreSearch variant="list" />
      <ListClaimsList
        listClaims={accumulatedClaims}
        pagination={{ ...pagination, currentPage }}
        enableSearch={false}
        enableSort={true}
        onLoadMore={handleLoadMore}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/lists" />
}
