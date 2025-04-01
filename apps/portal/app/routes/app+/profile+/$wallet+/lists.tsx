import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

import { Text } from '@0xintuition/1ui'
import { Atoms_Order_By, fetcher, Order_By } from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { SavedLists } from '@components/list/saved-lists'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import {
  GetSavedListsDocument,
  GetSavedListsQuery,
  GetSavedListsQueryVariables,
  useGetSavedListsQuery,
} from '@lib/queries/saved-lists'
import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_PARAM_ID_ERROR } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { zeroAddress } from 'viem'

// Default pagination values
const DEFAULT_PAGE_SIZE = 16
const DEFAULT_PAGE = 1

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = params.wallet?.toLowerCase()
  invariant(wallet, NO_PARAM_ID_ERROR)

  const queryAddress = wallet.toLowerCase() ?? zeroAddress

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
    _and: [
      {
        as_object_triples: {
          vault: {
            triple: {
              vault: {
                positions: {
                  account_id: {
                    _eq: queryAddress,
                  },
                },
              },
            },
          },
          predicate_id: {
            _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
          },
        },
      },
    ],
  }

  const triplesWhere = {
    predicate_id: {
      _eq: 3,
    },
  }

  // Convert sortBy and direction to GraphQL order_by format
  const orderBy: Atoms_Order_By[] = []
  if (sortBy === 'label') {
    orderBy.push({ label: direction.toLowerCase() as Order_By })
  } else if (sortBy === 'entries_count') {
    orderBy.push({
      as_object_triples_aggregate: {
        count: direction.toLowerCase() as Order_By,
      },
    })
  } else if (sortBy === 'id') {
    orderBy.push({ id: direction.toLowerCase() as Order_By })
  }

  // Prefetch the data with pagination
  const listsData = await queryClient.fetchQuery({
    queryKey: ['get-lists'],
    queryFn: () =>
      fetcher<GetSavedListsQuery, GetSavedListsQueryVariables>(
        GetSavedListsDocument,
        {
          where: savedListsWhere,
          triplesWhere,
          limit,
          offset: (page - 1) * limit,
          orderBy,
        },
      )(),
  })

  const totalCount = listsData?.atoms_aggregate?.aggregate?.count ?? 0
  const totalPages = calculateTotalPages(totalCount, limit)

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      savedListsWhere,
      triplesWhere,
      queryAddress,
    },
    sortBy: sortBy || 'label',
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
  const {
    initialParams,
    pagination,
    sortBy: initialSortBy,
    direction: initialDirection,
  } = useLoaderData<typeof loader>()
  const [visibleLimit, setVisibleLimit] = useState(DEFAULT_PAGE_SIZE)
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState([] as GetSavedListsQuery['atoms'])
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [direction, setDirection] = useState(initialDirection)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingElementRef = useRef<HTMLDivElement>(null)

  const queryParams = {
    where: initialParams.savedListsWhere,
    triplesWhere: initialParams.triplesWhere,
    limit: visibleLimit,
    offset: 0,
    orderBy:
      sortBy === 'label'
        ? [{ label: direction.toLowerCase() as Order_By }]
        : sortBy === 'entries_count'
          ? [
              {
                as_object_triples_aggregate: {
                  count: direction.toLowerCase() as Order_By,
                },
              },
            ]
          : sortBy === 'id'
            ? [{ id: direction.toLowerCase() as Order_By }]
            : [{ label: 'asc' as Order_By }], // Default sort
  }

  const { data: savedListsResults } = useGetSavedListsQuery(queryParams, {
    queryKey: ['get-lists', JSON.stringify(queryParams)],
  })

  useEffect(() => {
    if (savedListsResults?.atoms) {
      setItems(savedListsResults.atoms)
    }
  }, [savedListsResults])

  const totalLists = savedListsResults?.atoms_aggregate?.aggregate?.count ?? 0
  const hasMoreResults = visibleLimit < totalLists

  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMoreResults) {
      return
    }

    setIsLoading(true)
    setVisibleLimit((prev) => Math.min(prev + DEFAULT_PAGE_SIZE, totalLists))
    setIsLoading(false)
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
    { value: 'Name (A-Z)', sortBy: 'label', direction: 'asc' as const },
    { value: 'Name (Z-A)', sortBy: 'label', direction: 'desc' as const },
    {
      value: 'Most Entries',
      sortBy: 'entries_count',
      direction: 'desc' as const,
    },
    {
      value: 'Fewest Entries',
      sortBy: 'entries_count',
      direction: 'asc' as const,
    },
    { value: 'Newest', sortBy: 'id', direction: 'desc' as const },
    { value: 'Oldest', sortBy: 'id', direction: 'asc' as const },
  ]

  const handleSortChange = useCallback(
    (newSortBy: string, newDirection: 'asc' | 'desc') => {
      // Update local state
      setSortBy(newSortBy)
      setDirection(newDirection)
      setVisibleLimit(DEFAULT_PAGE_SIZE) // Reset visible limit when sort changes
      setItems([]) // Clear items when sort changes

      // Update URL without navigation
      const currentParams = new URLSearchParams(window.location.search)
      currentParams.set('listSortBy', newSortBy)
      currentParams.set('listDirection', newDirection)
      currentParams.set('listPage', '1')
      window.history.replaceState(null, '', `?${currentParams.toString()}`)
    },
    [],
  )

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
          <SavedLists
            savedLists={items}
            pagination={pagination}
            enableSearch={false}
            enableSort={true}
            paramPrefix="list"
            onLoadMore={loadMoreItems}
            sortOptions={sortOptions}
            onSortChange={handleSortChange}
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
