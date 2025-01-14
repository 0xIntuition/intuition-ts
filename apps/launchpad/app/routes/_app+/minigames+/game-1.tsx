import {
  AggregatedMetrics,
  Banner,
  Button,
  Card,
  Icon,
  PageHeader,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetListDetailsDocument,
  GetListDetailsQuery,
  GetListDetailsQueryVariables,
  useGetListDetailsQuery,
} from '@0xintuition/graphql'

import { useGoBack } from '@lib/hooks/useGoBack'
import logger from '@lib/utils/logger'
import { useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function loader() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-list-details', { predicateId: 3, objectId: 620 }],
    queryFn: () =>
      fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(
        GetListDetailsDocument,
        {
          tagPredicateId: 3,
          globalWhere: {
            predicate_id: {
              _eq: 3,
            },
            object_id: {
              _eq: 620,
            },
          },
        },
      ),
  })

  return {
    dehydratedState: dehydrate(queryClient),
  }
}

export function ErrorBoundary() {
  return (
    <Banner
      variant="error"
      title="Error Loading Game"
      message="There was an error loading the game data. Please try again."
    >
      <Button variant="secondary" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Banner>
  )
}

export default function MiniGameOne() {
  const goBack = useGoBack({ fallbackRoute: '/minigames' })
  useLoaderData<typeof loader>()

  const { data: listData } = useGetListDetailsQuery(
    {
      tagPredicateId: 3,
      globalWhere: {
        predicate_id: {
          _eq: 3,
        },
        object_id: {
          _eq: 620,
        },
      },
    },
    {
      queryKey: ['get-list-details', { predicateId: 3, objectId: 620 }],
    },
  )

  // Log each triple's shares for debugging
  listData?.globalTriples?.forEach((triple, index) => {
    logger(
      `Triple ${index} shares:`,
      triple.vault?.positions_aggregate?.aggregate?.sum?.shares,
    )
  })

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="border-none text-foreground-muted"
          onClick={goBack}
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </Button>
        <div className="flex flex-1 justify-between items-center">
          <PageHeader title="Best Web3 Wallets" />
          <Button variant="secondary" className="border border-border/10">
            <Icon name="square-arrow-top-right" className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010] rounded-xl">
        <Card className="h-[400px] border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px]" />
        <AggregatedMetrics
          metrics={[
            {
              label: 'TVL',
              value: 0,
              suffix: 'ETH',
            },
            {
              label: 'Atoms',
              value: listData?.globalTriplesAggregate?.aggregate?.count ?? 0,
            },
            {
              label: 'Users',
              value: 0,
            },
          ]}
          className="[&>div]:after:hidden sm:[&>div]:after:block"
        />
      </div>

      {/* Space for table */}
      <div className="mt-6">{/* Table will go here */}</div>
    </>
  )
}
