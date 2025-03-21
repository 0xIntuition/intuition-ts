import { useCallback, useEffect, useRef, useState } from 'react'

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
import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, HEADER_BANNER_LISTS } from 'app/consts'
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

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'list',
    defaultPageValue: DEFAULT_PAGE,
    defaultLimitValue: DEFAULT_PAGE_SIZE,
  })

  const displayName = searchParams.get('list') || ''

  console.log('Lists loader: sortBy:', sortBy, 'direction:', direction)

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

  // Prefetch lists data - we can't specify the orderBy in the API
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

export default function ExploreLists() {
  const { pagination, initialParams, sortBy, direction } =
    useLoaderData<typeof loader>()

  // Use state to track the number of items to display
  // Start with the initial page worth of items
  const [visibleLimit, setVisibleLimit] = useState(pagination.limit)
  const [isLoading, setIsLoading] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingElementRef = useRef<HTMLDivElement>(null)

  // Fetch the lists data without specifying order_by
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

  // Apply client-side sorting based on sortBy and direction
  const sortedLists = sortLists(
    listsResult?.predicate_objects || [],
    sortBy,
    direction,
  )

  const totalLists = sortedLists.length

  // Check if we have more results to load
  const hasMoreResults = visibleLimit < totalLists

  // Slice the result to just show the current number of visible items
  const displayedLists = sortedLists.slice(0, visibleLimit)

  // Function to load more lists (client-side only)
  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMoreResults) {
      return
    }

    setIsLoading(true)

    // Increase visible limit by the page size
    setTimeout(() => {
      setVisibleLimit((prev) => Math.min(prev + pagination.limit, totalLists))
      setIsLoading(false)
    }, 300)
  }, [hasMoreResults, isLoading, pagination.limit, totalLists])

  // Set up the intersection observer to detect when the user scrolls to the bottom
  useEffect(() => {
    if (!loadingElementRef.current) {
      return
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px 0px 300px 0px', // Start loading when element is 300px from viewport
      threshold: 0.1, // Trigger when 10% of the element is visible
    }

    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMoreResults && !isLoading) {
        loadMoreItems()
      }
    }, options)

    // Start observing the loading element
    observerRef.current.observe(loadingElementRef.current)

    // Clean up the observer on component unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMoreResults, isLoading, loadMoreItems])

  // Calculate the current page based on the visible limit
  const currentPage = Math.ceil(visibleLimit / pagination.limit)

  console.log('Lists result:', {
    total: totalLists,
    showing: displayedLists.length,
    hasMore: hasMoreResults,
    visibleLimit,
    currentPage,
    sortBy,
    direction,
  })

  // Add detailed logging to debug list data
  console.log(
    '[LIST_DEBUG] Sorted lists (first 5):',
    sortedLists.slice(0, 5).map((list) => ({
      id: list.id,
      object: {
        id: list.object?.id,
        label: list.object?.label,
        image: list.object?.image,
      },
      claim_count: list.claim_count,
      triple_count: list.triple_count,
    })),
  )

  // Check for any null values that might cause errors
  if (sortedLists.length > 0) {
    console.log(
      '[LIST_DEBUG] Checking for null string values in first list item:',
      {
        label:
          sortedLists[0].object?.label === null
            ? 'NULL LABEL FOUND!'
            : 'label ok',
        image:
          sortedLists[0].object?.image === null
            ? 'NULL IMAGE FOUND!'
            : 'image ok',
      },
    )
  }

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
        sortOptions={[
          { value: 'Name', sortBy: 'object.label' },
          { value: 'Claim Count', sortBy: 'claim_count' },
          { value: 'Triple Count', sortBy: 'triple_count' },
        ]}
      />

      {/* Invisible element to trigger infinite scrolling */}
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
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/lists" />
}
