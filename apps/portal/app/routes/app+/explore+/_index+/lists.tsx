import { useEffect, useState } from 'react'

import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ListClaimsList } from '@components/list/list-claims'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
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

  const listClaims = await fetchWrapper(request, {
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
  const submit = useSubmit()
  const { listClaims, pagination, sortBy, direction } =
    useLoaderData<typeof loader>()
  // const [currentPage, setCurrentPage] = useState(pagination.currentPage)
  const [searchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')

  const [accumulatedClaims, setAccumulatedClaims] = useState<ClaimPresenter[]>(
    [],
  )

  useEffect(() => {
    if (currentPage === 1) {
      setAccumulatedClaims(listClaims)
    } else {
      setAccumulatedClaims((prev) => [...prev, ...listClaims])
    }
  }, [listClaims, currentPage])

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    submit(
      {
        page: nextPage.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        direction,
      },
      { method: 'get', replace: true },
    )
  }

  return (
    <>
      <ExploreSearch variant="list" />
      <ListClaimsList
        listClaims={accumulatedClaims}
        pagination={{ ...pagination, currentPage }}
        enableSort={true}
        onLoadMore={handleLoadMore}
      />
    </>
  )
}
