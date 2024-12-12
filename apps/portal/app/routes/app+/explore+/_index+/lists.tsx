import { useEffect, useState } from 'react'

import { IconName } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'
import {
  fetcher,
  GetListsDocument,
  GetListsQuery,
  GetListsQueryVariables,
  useGetListsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ListClaimsListNew as ListClaimsList } from '@components/list/list-claims'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages, invariant, loadMore } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, HEADER_BANNER_LISTS, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, sortBy, direction } = getStandardPageParams({
    searchParams,
  })

  const displayName = searchParams.get('list') || ''

  const initialLimit = 200
  const effectiveLimit = Number(
    searchParams.get('effectiveLimit') || initialLimit,
  )
  const limit = Math.max(effectiveLimit, initialLimit)

  const listsWhere = {
    _and: [
      {
        predicate_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      },
      {
        object: {
          label: { _ilike: `%${displayName}%` },
        },
      },
    ],
  }

  // const listsLimit = parseInt(url.searchParams.get('effectiveLimit') || '200')
  // const listsOffset = parseInt(url.searchParams.get('listsOffset') || '0')
  // const listsOrderBy = url.searchParams.get('listsSortBy')

  await queryClient.prefetchQuery({
    queryKey: [
      'get-lists',
      {
        listsWhere,
      },
    ],
    queryFn: () =>
      fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, {
        where: listsWhere,
      })(),
  })

  const listClaims = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      page: 1,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      displayName,
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
  })

  const totalPages = calculateTotalPages(listClaims?.total ?? 0, limit)

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      listsWhere,
    },
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
  const { initialParams } = useLoaderData<typeof loader>()

  const { data: listsResult } = useGetListsQuery(
    {
      where: initialParams.listsWhere,
    },
    {
      queryKey: ['get-lists', { where: initialParams.listsWhere }],
    },
  )

  const submit = useSubmit()
  const { listClaims, pagination, sortBy, direction } = useLiveLoader<
    typeof loader
  >(['create', 'attest'])
  const [searchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')

  const [, setAccumulatedClaims] = useState<ClaimPresenter[]>([])

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
      <ExploreHeader
        title="Lists"
        content="Collaborate with the world to curate collections of information - or create your own."
        icon={IconName.bookmark}
        bgImage={HEADER_BANNER_LISTS}
      />
      <ExploreSearch variant="list" />
      <ListClaimsList
        listClaims={listsResult?.predicate_objects ?? []}
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
