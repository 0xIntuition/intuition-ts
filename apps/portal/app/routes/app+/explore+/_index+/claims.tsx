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
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_CLAIMS, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, direction } = getStandardPageParams({
    searchParams,
  })
  const subjectId = searchParams.get('subject') || null
  const predicateId = searchParams.get('predicate') || null
  const objectId = searchParams.get('object') || null

  // Create a new QueryClient instance
  const queryClient = new QueryClient()

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
      },
    ],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: {
          subject: {
            id: {
              _eq: subjectId ? `%${subjectId}%` : undefined,
            },
          },
          predicate_id: {
            _eq: predicateId,
          },
          object_id: {
            _eq: objectId,
          },
        },
        limit,
        offset: (page - 1) * limit,
        orderBy: [{ block_timestamp: direction.toLowerCase() as Order_By }],
        address: wallet,
      })(),
  })

  // Prefetch atoms data (replacing IdentitiesService.searchIdentity)
  await queryClient.prefetchQuery({
    queryKey: [
      'GetAtoms',
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

  // Get the total count from the triples query
  const triplesData = await queryClient.fetchQuery({
    queryKey: [
      'get-triples-with-positions-count',
      {
        subjectId,
        predicateId,
        objectId,
      },
    ],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: {
          subject: {
            id: {
              _eq: subjectId ? `%${subjectId}%` : undefined,
            },
          },
          predicate_id: {
            _eq: predicateId,
          },
          object_id: {
            _eq: objectId,
          },
        },
        address: wallet,
      })(),
  })

  // Get the total count
  const totalCount = triplesData?.total?.aggregate?.count ?? 0
  const claimsTotalPages = calculateTotalPages(totalCount, limit)

  return json({
    wallet,
    claimsPagination: {
      currentPage: page,
      limit,
      totalEntries: totalCount,
      totalPages: claimsTotalPages,
    },
    initialParams: {
      subjectId,
      predicateId,
      objectId,
    },
    // Add dehydrated state for client-side hydration
    dehydratedState: dehydrate(queryClient),
  })
}

export default function ExploreClaims() {
  const { wallet, claimsPagination, initialParams } = useLiveLoader<
    typeof loader
  >(['create', 'attest'])

  const { subjectId, predicateId, objectId } = initialParams

  const { data: triplesData, isLoading: isLoadingTriples } =
    useGetTriplesWithPositionsQuery(
      {
        where: {
          subject: {
            id: {
              _eq: subjectId ? `%${subjectId}%` : undefined,
            },
          },
          predicate_id: {
            _eq: predicateId,
          },
          object_id: {
            _eq: objectId,
          },
        },
        limit: claimsPagination.limit,
        offset: (claimsPagination.currentPage - 1) * claimsPagination.limit,
        orderBy: [{ block_timestamp: 'desc' as Order_By }],
        address: wallet,
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
          },
        ],
      },
    )

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
        claims={triplesData?.triples ?? []}
        pagination={claimsPagination.totalEntries}
        enableSearch={false}
        enableSort={true}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/claims" />
}
