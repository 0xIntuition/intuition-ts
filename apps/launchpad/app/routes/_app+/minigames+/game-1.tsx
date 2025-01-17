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

import { OnboardingModal } from '@components/onboarding-modal/onboarding-modal'
import ShareModal from '@components/share-modal'
import { columns } from '@components/ui/table/columns'
import { DataTable } from '@components/ui/table/data-table'
import { mockMinigames } from '@lib/data/mock-minigames'
import { useGoBack } from '@lib/hooks/useGoBack'
import { onboardingModalAtom, shareModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { useLoaderData } from '@remix-run/react'
// import { requireUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { formatUnits } from 'viem'

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
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)

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

  logger(listData?.globalTriples)
  // Transform the data for the table
  const tableData =
    listData?.globalTriples?.map((triple) => {
      // Debug log to see the image data
      logger('Triple data:', {
        id: triple.id,
        subject: triple.subject,
        image: triple.subject.image,
      })

      return {
        id: triple.id,
        image: triple.subject.image || '',
        name: triple.subject.label || 'Untitled Entry',
        users: Number(triple.vault?.positions_aggregate?.aggregate?.count ?? 0),
        assets: +formatUnits(
          triple.vault?.positions_aggregate?.aggregate?.sum?.shares ?? 0,
          18,
        ),
      }
    }) || []

  // Log each triple's shares for debugging
  listData?.globalTriples?.forEach((triple, index) => {
    logger(
      `Triple ${index} shares:`,
      triple.vault?.positions_aggregate?.aggregate?.sum?.shares,
    )
  })

  // Calculate total users and TVL
  const totalUsers = tableData.reduce((sum, item) => sum + item.users, 0)
  const totalTVL = tableData.reduce((sum, item) => sum + item.assets, 0)

  const handleStartOnboarding = (gameId: string) => {
    setOnboardingModal({ isOpen: true, gameId })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({ isOpen: false, gameId: null })
  }

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
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              onClick={() => handleStartOnboarding(mockMinigames[0].id)}
            >
              Play Again
            </Button>
            <Button
              variant="secondary"
              className="border border-border/10"
              onClick={() =>
                setShareModalActive({
                  isOpen: true,
                  currentPath: fullPath,
                  title: listData?.globalTriples[0].object.label ?? '',
                  tvl: totalTVL,
                })
              }
            >
              <Icon name="square-arrow-top-right" className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010] rounded-xl">
        <Card className="h-[400px] border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px]" />
        <AggregatedMetrics
          metrics={[
            {
              label: 'TVL',
              value: totalTVL,
              suffix: 'ETH',
              precision: 2,
            },
            {
              label: 'Atoms',
              value: listData?.globalTriplesAggregate?.aggregate?.count ?? 0,
            },
            {
              label: 'Users',
              value: totalUsers,
            },
          ]}
          className="[&>div]:after:hidden sm:[&>div]:after:block"
        />
      </div>

      {/* Space for table */}
      <div className="mt-6">
        <DataTable columns={columns} data={tableData} />
      </div>
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
      <OnboardingModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
      />
    </>
  )
}
