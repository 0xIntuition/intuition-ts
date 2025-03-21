import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

import { Text } from '@0xintuition/1ui'
import {
  fetcher,
  GetListsDocument,
  GetListsQuery,
  GetListsQueryVariables,
  useGetListsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ListClaimsListNew as ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_PARAM_ID_ERROR } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

// Default pagination values
const DEFAULT_PAGE_SIZE = 16
const DEFAULT_PAGE = 1

// Client-side sorting function
const sortLists = (
  lists: GetListsQuery['predicate_objects'],
  sortBy: string,
  direction: string,
) => {
  if (!lists) {
    return []
  }

  // Create a copy to avoid mutating the original data
  const sortedLists = [...lists]

  // Define sort functions
  const directionMultiplier = direction.toLowerCase() === 'desc' ? -1 : 1

  // Sort based on the field
  if (sortBy === 'object.label') {
    sortedLists.sort((a, b) => {
      const labelA = a.object?.label?.toLowerCase() || ''
      const labelB = b.object?.label?.toLowerCase() || ''
      return directionMultiplier * labelA.localeCompare(labelB)
    })
  } else if (sortBy === 'claim_count') {
    sortedLists.sort((a, b) => {
      const countA = a.claim_count || 0
      const countB = b.claim_count || 0
      return directionMultiplier * (countA - countB)
    })
  } else if (sortBy === 'triple_count') {
    sortedLists.sort((a, b) => {
      const countA = a.triple_count || 0
      const countB = b.triple_count || 0
      return directionMultiplier * (countA - countB)
    })
  }

  return sortedLists
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = params.wallet?.toLowerCase()
  invariant(wallet, NO_PARAM_ID_ERROR)

  const queryAddress = wallet.toLowerCase()

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'list',
    defaultPageValue: DEFAULT_PAGE,
    defaultLimitValue: DEFAULT_PAGE_SIZE,
  })

  const savedListsWhere = {
    account_id: {
      _eq: queryAddress,
    },
    vault: {
      atom_id: {
        _is_null: true,
      },
    },
    _or: [
      {
        predicate_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      },
    ],
  }

  // Prefetch lists data - we can't specify the orderBy in the API
  await queryClient.prefetchQuery({
    queryKey: [
      'get-lists',
      {
        savedListsWhere,
      },
    ],
    queryFn: () =>
      fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, {
        where: savedListsWhere,
      })(),
  })

  // Get the total count
  const listsData = await queryClient.fetchQuery({
    queryKey: [
      'get-lists',
      {
        savedListsWhere,
      },
    ],
    queryFn: () =>
      fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, {
        where: savedListsWhere,
      })(),
  })

  const totalCount =
    listsData?.predicate_objects_aggregate?.aggregate?.count ?? 0
  const totalPages = calculateTotalPages(totalCount, limit)

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      savedListsWhere,
      queryAddress,
    },
    sortBy: sortBy || 'object.label',
    direction: direction || 'asc',
    pagination: {
      currentPage: page,
      limit,
      totalEntries: totalCount,
      totalPages,
    } as PaginationType,
  })
}

export default function ProfileLists() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()
  const [visibleLimit, setVisibleLimit] = useState(DEFAULT_PAGE_SIZE)
  const [isLoading, setIsLoading] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingElementRef = useRef<HTMLDivElement>(null)

  const sortBy = searchParams.get('sortBy') || 'object.label'
  const direction = searchParams.get('direction') || 'asc'

  // Fetch the lists data without specifying order_by
  const { data: savedListsResults } = useGetListsQuery(
    {
      where: initialParams.savedListsWhere,
    },
    {
      queryKey: [
        'get-lists',
        {
          savedListsWhere: initialParams.savedListsWhere,
        },
      ],
    },
  )

  const sortedLists = sortLists(
    savedListsResults?.predicate_objects || [],
    sortBy,
    direction,
  )

  const totalLists = sortedLists.length
  const hasMoreResults = visibleLimit < totalLists
  const displayedLists = sortedLists.slice(0, visibleLimit)

  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMoreResults) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setVisibleLimit((prev) => Math.min(prev + DEFAULT_PAGE_SIZE, totalLists))
      setIsLoading(false)
    }, 300)
  }, [hasMoreResults, isLoading, totalLists])

  useEffect(() => {
    if (!loadingElementRef.current) {
      return
    }

    const options = {
      root: null,
      rootMargin: '0px 0px 300px 0px',
      threshold: 0.1,
    }

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMoreResults && !isLoading) {
        loadMoreItems()
      }
    }, options)

    observerRef.current.observe(loadingElementRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMoreResults, isLoading, loadMoreItems])

  const sortOptions = [
    { value: 'Name', sortBy: 'object.label' },
    { value: 'Claim Count', sortBy: 'claim_count' },
    { value: 'Triple Count', sortBy: 'triple_count' },
  ]

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          My Lists
        </Text>
      </div>
      <Suspense fallback={<ListClaimsSkeletonLayout totalItems={6} />}>
        <Await resolve={savedListsResults}>
          <ListClaimsList
            listClaims={displayedLists}
            // pagination={{
            //   ...pagination,
            //   currentPage,
            //   totalEntries: totalLists,
            // }}
            enableSearch={false}
            enableSort={true}
            paramPrefix="list"
            onLoadMore={loadMoreItems}
            sortOptions={sortOptions}
          />
          {hasMoreResults && (
            <div
              ref={loadingElementRef}
              className={`w-full h-20 flex items-center justify-center ${
                isLoading ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isLoading && (
                <div className="animate-pulse">Loading more lists...</div>
              )}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/lists" />
}
