import { IconName } from '@0xintuition/1ui'
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
import { useSearchParams, useSubmit } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, HEADER_BANNER_LISTS, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
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

  // Prefetch lists data
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

  // Get the total count
  const listsData = await queryClient.fetchQuery({
    queryKey: [
      'get-lists-count',
      {
        listsWhere,
      },
    ],
    queryFn: () =>
      fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, {
        where: listsWhere,
      })(),
  })

  const totalCount =
    listsData?.predicate_objects_aggregate?.aggregate?.count ?? 0
  const totalPages = calculateTotalPages(totalCount, limit)

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      listsWhere,
      displayName,
    },
    sortBy,
    direction,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: totalCount,
      totalPages,
    },
  })
}

export default function ExploreLists() {
  const { pagination, initialParams, sortBy, direction } = useLiveLoader<
    typeof loader
  >(['create', 'attest'])

  const { data: listsResult } = useGetListsQuery(
    {
      where: initialParams.listsWhere,
    },
    {
      queryKey: [
        'get-lists',
        {
          listsWhere: initialParams.listsWhere,
        },
      ],
    },
  )

  const submit = useSubmit()
  const [searchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')

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
        pagination={pagination}
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
