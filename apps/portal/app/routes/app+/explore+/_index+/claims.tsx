import { IconName } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  Order_By,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ClaimsListNew } from '@components/list/claims'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { usePrivy } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_CLAIMS } from 'app/consts'
import { PaginationType } from 'app/types'
import { Triple } from 'app/types/triple'
import { zeroAddress } from 'viem'

// Function to map sort parameters from URL to GraphQL order_by object
function mapSortToOrderBy(sortBy: string, direction: string) {
  // Default to block_timestamp if not provided
  if (!sortBy) {
    return {
      block_timestamp: direction.toLowerCase() as 'asc' | 'desc',
    }
  }

  // Handle nested fields like 'vault.total_shares'
  if (sortBy.includes('.')) {
    const [parent, field] = sortBy.split('.')
    return {
      [parent]: {
        [field]: direction.toLowerCase() as 'asc' | 'desc',
      },
    }
  }

  // Handle simple fields
  return {
    [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  const queryAddress = wallet?.toLowerCase() ?? zeroAddress

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, direction } = getStandardPageParams({
    searchParams,
  })
  // Get claimSortBy instead of just sortBy to handle paramPrefix
  const sortBy = searchParams.get('claimSortBy') || 'block_timestamp'
  const subjectId = searchParams.get('subject') || null
  const predicateId = searchParams.get('predicate') || null
  const objectId = searchParams.get('object') || null

  console.log('Loader params:', { sortBy, direction, page, limit })

  // Create order by object based on the sort parameter
  const orderBy = mapSortToOrderBy(sortBy, direction)

  // Create a new QueryClient instance
  const queryClient = new QueryClient()

  // Build the where condition properly
  const whereCondition = {
    ...(subjectId ? { subject_id: { _eq: subjectId } } : {}),
    ...(predicateId ? { predicate_id: { _eq: predicateId } } : {}),
    ...(objectId ? { object_id: { _eq: objectId } } : {}),
  }

  console.log('WHERE CONDITION:', whereCondition)

  // Define the query variables for triples
  const triplesQueryVars = {
    where: whereCondition,
    limit,
    offset: (page - 1) * limit,
    orderBy: [orderBy],
    address: queryAddress,
  }

  // Prefetch triples data (replacing ClaimsService.searchClaims)
  await queryClient.prefetchQuery({
    queryKey: [
      'get-triples-with-positions',
      {
        subjectId,
        predicateId,
        objectId,
        limit,
        offset: (page - 1) * limit,
        sortBy,
        direction,
      },
    ],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, triplesQueryVars)(),
  })

  // Prefetch atoms data (replacing IdentitiesService.searchIdentity)
  await queryClient.prefetchQuery({
    queryKey: [
      'get-atoms',
      {
        limit: 20,
        offset: 0,
        orderBy: [{ block_timestamp: 'desc' as Order_By }],
      },
    ],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        limit: 20,
        offset: 0,
        orderBy: [{ block_timestamp: 'desc' as Order_By }],
      })(),
  })

  // Get data directly for the total count
  const triplesData = await fetcher<
    GetTriplesWithPositionsQuery,
    GetTriplesWithPositionsQueryVariables
  >(GetTriplesWithPositionsDocument, {
    where: whereCondition,
    address: queryAddress,
  })()

  // Get the total count
  const totalCount = triplesData?.total?.aggregate?.count ?? 0
  const claimsTotalPages = calculateTotalPages(totalCount, limit)

  return json({
    claimsPagination: {
      currentPage: page,
      limit,
      totalEntries: totalCount,
      totalPages: claimsTotalPages,
    } as PaginationType,
    initialParams: {
      queryAddress,
      subjectId,
      predicateId,
      objectId,
      direction,
      sortBy,
      whereCondition,
    },
    // Add dehydrated state for client-side hydration
    dehydratedState: dehydrate(queryClient),
  })
}

export default function ExploreClaims() {
  const { claimsPagination, initialParams } = useLoaderData<typeof loader>()
  const { user: privyUser } = usePrivy()
  const submit = useSubmit()

  const {
    queryAddress,
    subjectId,
    predicateId,
    objectId,
    direction,
    sortBy,
    whereCondition,
  } = initialParams

  // Create order by object based on the sort parameter
  const orderBy = mapSortToOrderBy(sortBy || 'block_timestamp', direction)

  console.log('Component params:', { sortBy, direction })
  console.log('Component whereCondition:', whereCondition)

  const { data: triplesData, isLoading } = useGetTriplesWithPositionsQuery(
    {
      where: whereCondition,
      limit: claimsPagination.limit,
      offset: (claimsPagination.currentPage - 1) * claimsPagination.limit,
      orderBy: [orderBy],
      address: queryAddress,
    },
    {
      queryKey: [
        'get-triples-with-positions',
        {
          subjectId,
          predicateId,
          objectId,
          limit: claimsPagination.limit,
          offset: (claimsPagination.currentPage - 1) * claimsPagination.limit,
          sortBy,
          direction,
        },
      ],
    },
  )

  console.log('triplesData in component:', triplesData)
  console.log('triplesData?.triples in component:', triplesData?.triples)
  console.log('isLoading in component:', isLoading)

  // Create handlers for pagination
  const handlePageChange = (page: number) => {
    const formData = new FormData()
    formData.append('page', page.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleLimitChange = (limit: number) => {
    const formData = new FormData()
    formData.append('limit', limit.toString())
    submit(formData, { method: 'get', replace: true })
  }

  // Convert to Triple[] type like identities.tsx does
  const claims = (triplesData?.triples || []) as unknown as Triple[]

  return (
    <>
      <ExploreHeader
        title="Claims"
        content="Semantic statements, allowing anyone to claim anything about anything."
        icon={IconName.claim}
        bgImage={HEADER_BANNER_CLAIMS}
      />
      <ExploreSearch variant="claim" />
      <ClaimsListNew
        claims={claims}
        pagination={claimsPagination}
        enableSearch={false}
        enableSort={true}
        paramPrefix="claim"
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        isConnected={!!privyUser}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/claims" />
}
