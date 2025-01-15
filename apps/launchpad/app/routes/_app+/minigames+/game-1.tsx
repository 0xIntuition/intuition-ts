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

import ShareModal from '@components/share-modal'
import { useGoBack } from '@lib/hooks/useGoBack'
import { shareModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { useLoaderData } from '@remix-run/react'
// import { requireUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'

export async function loader() {
  const queryClient = new QueryClient()
  // const user = await requireUser(request)
  // const wallet = user?.wallet?.address

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
    // wallet,
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
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  const hasUserParam = location.search.includes('user=')
  const fullPath = hasUserParam
    ? `${location.pathname}${location.search}`
    : `${location.pathname}${location.search}${location.search ? '&' : '?'}`

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
          className="border-none bg-background-muted"
          onClick={goBack}
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </Button>
        <div className="flex flex-1 justify-between items-center">
          <PageHeader title={listData?.globalTriples[0].object.label ?? ''} />
          <Button
            variant="secondary"
            className="border border-border/10"
            onClick={() =>
              setShareModalActive({
                isOpen: true,
                currentPath: fullPath,
                title: listData?.globalTriples[0].object.label ?? '',
                tvl: 0,
              })
            }
          >
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
      <ShareModal
        open={shareModalActive.isOpen}
        onClose={() =>
          setShareModalActive({
            ...shareModalActive,
            isOpen: false,
          })
        }
        title={shareModalActive.title}
        tvl={shareModalActive.tvl}
      />
    </>
  )
}
