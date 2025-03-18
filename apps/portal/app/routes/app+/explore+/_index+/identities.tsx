import { IconName } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  Order_By,
  useGetAtomsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesListNew } from '@components/list/identities'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_IDENTITIES, NO_WALLET_ERROR } from 'app/consts'
import { PaginationType } from 'app/types'
import { AtomArray } from 'app/types/atom'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, direction } = getStandardPageParams({
    searchParams,
  })
  const displayName = searchParams.get('identity') || null
  const hasTag = searchParams.get('tagIds') || null
  const isUser = searchParams.get('isUser')

  // Create a new QueryClient instance
  const queryClient = new QueryClient()

  // Prefetch atoms data (replacing IdentitiesService.searchIdentity)
  await queryClient.prefetchQuery({
    queryKey: [
      'GetAtoms',
      {
        limit,
        offset: (page - 1) * limit,
        orderBy: [{ block_timestamp: direction.toLowerCase() as Order_By }],
      },
    ],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        limit,
        offset: (page - 1) * limit,
        orderBy: [{ block_timestamp: direction.toLowerCase() as Order_By }],
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
    },
    // Add dehydrated state for client-side hydration
    dehydratedState: dehydrate(queryClient),
  })
}

export default function ExploreIdentities() {
  const { pagination, initialParams } = useLiveLoader<typeof loader>([
    'create',
    'attest',
  ])

  const { displayName, hasTag, isUser, direction } = initialParams

  const { data: atomsData } = useGetAtomsQuery(
    {
      limit: pagination.limit,
      offset: (pagination.currentPage - 1) * pagination.limit,
      orderBy: [{ block_timestamp: direction.toLowerCase() as Order_By }],
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
        },
      ],
    },
  )

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
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/identities" />
}
