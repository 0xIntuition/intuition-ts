import { IconName } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsCountDocument,
  GetAtomsCountQuery,
  GetAtomsCountQueryVariables,
  GetAtomsWithPositionsDocument,
  GetAtomsWithPositionsQuery,
  GetAtomsWithPositionsQueryVariables,
  useGetAtomsWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesListNew } from '@components/list/identities'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { usePrivy } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_IDENTITIES } from 'app/consts'
import { PaginationType } from 'app/types'
import { AtomArray } from 'app/types/atom'
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
  const userWallet = await getUserWallet(request)
  const queryAddress = userWallet?.toLowerCase() ?? zeroAddress
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const {
    page,
    limit,
    direction = 'desc',
  } = getStandardPageParams({
    searchParams,
  })
  const sortBy = searchParams.get('identitySortBy') || 'block_timestamp'
  const displayName = searchParams.get('identity') || ''
  // TODO: Figure out how to filter by tags
  const tags = searchParams.get('tagIds') || ''
  const isUser = searchParams.get('isUser') || ''

  const orderBy = mapSortToOrderBy(sortBy, direction)
  const queryClient = new QueryClient()

  const where = {
    ...(displayName ? { label: { _ilike: `%${displayName}%` } } : {}),
    ...(isUser === 'true'
      ? { type: { _eq: 'Account' } }
      : isUser === 'false'
        ? { type: { _neq: 'Account' } }
        : {}),
  }

  // Get the count for pagination
  const countData = await queryClient.fetchQuery({
    queryKey: ['get-atoms-count', { where }],
    queryFn: () =>
      fetcher<GetAtomsCountQuery, GetAtomsCountQueryVariables>(
        GetAtomsCountDocument,
        {
          where,
        },
      )(),
  })

  // Prefetch the atoms query for client-side hydration
  const queryKey = [
    'get-atoms-with-positions',
    {
      limit,
      offset: (page - 1) * limit,
      orderBy: [orderBy],
      where,
      address: queryAddress,
    },
  ]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(
        GetAtomsWithPositionsDocument,
        {
          limit,
          offset: (page - 1) * limit,
          orderBy: [orderBy],
          where,
          address: queryAddress,
        },
      )(),
  })

  const totalCount = countData?.atoms_aggregate?.aggregate?.count ?? 0
  const totalPages = calculateTotalPages(totalCount, limit)

  return json({
    pagination: {
      currentPage: page,
      limit,
      totalEntries: totalCount,
      totalPages,
    } as PaginationType,
    initialParams: {
      userWallet,
      queryAddress,
      displayName,
      tags,
      isUser,
      direction,
      sortBy,
    },
    dehydratedState: dehydrate(queryClient),
  })
}

export default function ExploreIdentities() {
  const { pagination, initialParams } = useLoaderData<typeof loader>()
  const { user: privyUser } = usePrivy()
  const submit = useSubmit()

  const { displayName, isUser, direction, sortBy, queryAddress } = initialParams
  const orderBy = mapSortToOrderBy(
    sortBy || 'block_timestamp',
    direction || 'desc',
  )

  const where = {
    ...(displayName ? { label: { _ilike: `%${displayName}%` } } : {}),
    ...(isUser === 'true'
      ? { type: { _eq: 'Account' } }
      : isUser === 'false'
        ? { type: { _neq: 'Account' } }
        : {}),
  }

  const { data: atomsData } = useGetAtomsWithPositionsQuery(
    {
      limit: pagination.limit,
      offset: (pagination.currentPage - 1) * pagination.limit,
      orderBy: [orderBy],
      where,
      address: queryAddress,
    },
    {
      queryKey: [
        'get-atoms-with-positions',
        {
          limit: pagination.limit,
          offset: (pagination.currentPage - 1) * pagination.limit,
          orderBy: [orderBy],
          where,
          address: queryAddress,
        },
      ],
    },
  )

  // Create handlers for pagination
  const handlePageChange = (page: number) => {
    const formData = new FormData()
    // Preserve all existing search params
    const searchParams = new URLSearchParams(window.location.search)
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'page') {
        // Don't copy the old page parameter
        formData.append(key, value)
      }
    }
    formData.append('page', page.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleLimitChange = (limit: number) => {
    const formData = new FormData()
    // Preserve all existing search params
    const searchParams = new URLSearchParams(window.location.search)
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'limit') {
        // Don't copy the old limit parameter
        formData.append(key, value)
      }
    }
    formData.append('limit', limit.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleSortChange = (sortBy: string, direction: string) => {
    const formData = new FormData()
    // Preserve all existing search params
    const searchParams = new URLSearchParams(window.location.search)
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'identitySortBy' && key !== 'direction') {
        formData.append(key, value)
      }
    }
    formData.append('identitySortBy', sortBy)
    formData.append('direction', direction)
    submit(formData, { method: 'get', replace: true })
  }

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
        onSortChange={handleSortChange}
        isConnected={!!privyUser}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/identities" />
}
