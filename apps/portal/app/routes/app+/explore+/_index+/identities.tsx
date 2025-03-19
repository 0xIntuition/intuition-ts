import { IconName } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  useGetAtomsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesListNew } from '@components/list/identities'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_IDENTITIES, NO_WALLET_ERROR } from 'app/consts'
import { PaginationType } from 'app/types'
import { AtomArray } from 'app/types/atom'

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
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, direction } = getStandardPageParams({
    searchParams,
  })
  // Get identitySortBy instead of just sortBy to handle paramPrefix
  const sortBy = searchParams.get('identitySortBy') || 'block_timestamp'
  const displayName = searchParams.get('identity') || null
  const hasTag = searchParams.get('tagIds') || null
  const isUser = searchParams.get('isUser')

  console.log('Loader params:', { sortBy, direction, page, limit })

  // Create order by object based on the sort parameter
  const orderBy = mapSortToOrderBy(sortBy, direction)

  // Create a new QueryClient instance
  const queryClient = new QueryClient()

  // Prefetch atoms data (replacing IdentitiesService.searchIdentity)
  await queryClient.prefetchQuery({
    queryKey: [
      'GetAtoms',
      {
        limit,
        offset: (page - 1) * limit,
        orderBy: [orderBy],
        displayName,
        hasTag,
        isUser,
        sortBy,
        direction,
      },
    ],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        limit,
        offset: (page - 1) * limit,
        orderBy: [orderBy],
        where: {
          label: displayName ? { _ilike: `%${displayName}%` } : undefined,
          // Add tag filtering if needed
          type: isUser === 'true' ? { _eq: 'person' } : undefined,
        },
      })(),
  })

  // Get the total count
  const atomsData = await queryClient.fetchQuery({
    queryKey: [
      'get-atoms-count',
      {
        displayName,
        hasTag,
        isUser,
      },
    ],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        where: {
          label: displayName ? { _ilike: `%${displayName}%` } : undefined,
          // Add tag filtering if needed
          type: isUser === 'true' ? { _eq: 'person' } : undefined,
        },
      })(),
  })

  const totalCount = atomsData?.total?.aggregate?.count ?? 0
  const totalPages = calculateTotalPages(totalCount, limit)

  return json({
    pagination: {
      currentPage: page,
      limit,
      totalEntries: totalCount,
      totalPages,
    } as PaginationType,
    initialParams: {
      displayName,
      hasTag,
      isUser,
      direction,
      sortBy,
    },
    // Add dehydrated state for client-side hydration
    dehydratedState: dehydrate(queryClient),
  })
}

export default function ExploreIdentities() {
  const { pagination, initialParams } = useLoaderData<typeof loader>()
  const submit = useSubmit()

  const { displayName, hasTag, isUser, direction, sortBy } = initialParams

  console.log('Component params:', { sortBy, direction })

  // Create order by object based on the sort parameter
  const orderBy = mapSortToOrderBy(sortBy || 'block_timestamp', direction)

  const { data: atomsData } = useGetAtomsQuery(
    {
      limit: pagination.limit,
      offset: (pagination.currentPage - 1) * pagination.limit,
      orderBy: [orderBy],
      where: {
        label: displayName ? { _ilike: `%${displayName}%` } : undefined,
        // Add tag filtering if needed
        type: isUser === 'true' ? { _eq: 'person' } : undefined,
      },
    },
    {
      queryKey: [
        'GetAtoms',
        {
          limit: pagination.limit,
          offset: (pagination.currentPage - 1) * pagination.limit,
          displayName,
          hasTag,
          isUser,
          sortBy,
          direction,
        },
      ],
    },
  )

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

  // Since the Atom type is derived from the GraphQL schema,
  // we can treat the atoms as our expected type
  // TypeScript may show errors, but the structure is compatible at runtime
  const identities = (atomsData?.atoms || []) as unknown as AtomArray

  return (
    <>
      <ExploreHeader
        title="Identities"
        content="Decentralized identities for anything and everything - not just people."
        icon={IconName.fingerprint}
        bgImage={HEADER_BANNER_IDENTITIES}
      />
      <ExploreSearch variant="identity" />
      <IdentitiesListNew
        variant="explore"
        identities={identities}
        pagination={pagination}
        enableSearch={false}
        enableSort={true}
        paramPrefix="identity"
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/identities" />
}
