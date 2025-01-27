import {
  AggregatedMetrics,
  Banner,
  Button,
  Card,
  Icon,
  PageHeader,
  Text,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetListDetailsDocument,
  GetListDetailsQuery,
  GetListDetailsQueryVariables,
  GetTripleQuery,
  useGetListDetailsQuery,
} from '@0xintuition/graphql'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { AuthCover } from '@components/auth-cover'
import LoadingLogo from '@components/loading-logo'
import ShareModal from '@components/share-modal'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { columns } from '@components/ui/table/columns'
import { DataTable } from '@components/ui/table/data-table'
import { CURRENT_ENV } from '@consts/general'
import { useGoBack } from '@lib/hooks/useGoBack'
import { usePoints } from '@lib/hooks/usePoints'
import { useQuestionData } from '@lib/hooks/useQuestionData'
import {
  atomDetailsModalAtom,
  onboardingModalAtom,
  shareModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import { getUser } from '@server/auth'
// import { requireUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()

  const user = await getUser(request)

  const variables = {
    tagPredicateId: 3,
    address: user?.wallet?.address.toLowerCase(),
    globalWhere: {
      predicate_id: {
        _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      },
      object_id: {
        _eq: getSpecialPredicate(CURRENT_ENV).web3Wallet.id,
      },
    },
  }

  const listData = await fetcher<
    GetListDetailsQuery,
    GetListDetailsQueryVariables
  >(GetListDetailsDocument, variables)()

  await queryClient.setQueryData(['get-list-details', variables], listData)

  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?id=${getSpecialPredicate(CURRENT_ENV).web3Wallet.id}&type=list`

  return {
    dehydratedState: dehydrate(queryClient),
    ogImageUrl,
    objectResult: listData?.globalTriples[0]?.object,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { objectResult, ogImageUrl } = data

  return [
    {
      title: objectResult ? objectResult.label : 'Error | Intuition Launchpad',
    },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og-title',
      name: objectResult ? objectResult.label : 'Error | Intuition Launchpad',
    },
    {
      property: 'og:image',
      content: ogImageUrl,
    },
    { property: 'og:site_name', content: 'Intuition Launchpad' },
    { property: 'og:locale', content: 'en_US' },
    {
      name: 'twitter:image',
      content: ogImageUrl,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: `Intuition Launchpad | ${objectResult ? objectResult.label : ''}`,
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
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
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  const { user: privyUser, authenticated } = usePrivy()
  const userWallet = privyUser?.wallet?.address?.toLowerCase()
  const { data: points, isLoading: isPointsLoading } = usePoints(userWallet)

  const hasUserParam = location.search.includes('user=')
  const fullPath = hasUserParam
    ? `${location.pathname}${location.search}`
    : `${location.pathname}${location.search}${location.search ? '&' : '?'}`

  const predicateId =
    getSpecialPredicate(CURRENT_ENV).tagPredicate.id.toString()
  const objectId =
    getSpecialPredicate(CURRENT_ENV).web3Wallet.vaultId.toString()

  const { data: listData } = useGetListDetailsQuery(
    {
      tagPredicateId: predicateId,
      globalWhere: {
        predicate_id: {
          _eq: predicateId,
        },
        object_id: {
          _eq: objectId,
        },
      },
    },
    {
      queryKey: ['get-list-details', { predicateId: 3, objectId: 620 }],
    },
  )

  logger(listData?.globalTriples)

  const { id } = useParams()
  const {
    title,
    description,
    enabled,
    pointAwardAmount,
    isLoading: isQuestionLoading,
  } = useQuestionData({
    questionId: parseInt(id || '1', 10),
  })

  interface TableRowData {
    id: string
    triple: GetTripleQuery['triple']
    image: string
    name: string
    list: string
    vaultId: string
    counterVaultId: string
    users: number
    tvl: number
    position?: number
  }

  console.log('listData?.globalTriples', listData?.globalTriples)
  // Transform the data for the table
  const tableData: TableRowData[] =
    listData?.globalTriples?.map((triple) => {
      const tableRow: TableRowData = {
        id: String(triple.id),
        triple: triple as unknown as GetTripleQuery['triple'],
        image: triple.subject.image || '',
        name: triple.subject.label || 'Untitled Entry',
        list: triple.object.label || 'Untitled List',
        vaultId: triple.vault_id,
        counterVaultId: triple.counter_vault_id,
        users: Number(triple.vault?.allPositions?.aggregate?.count ?? 0),
        tvl: +formatUnits(
          triple.vault?.allPositions?.aggregate?.sum?.shares ?? 0,
          18,
        ),
        position: +formatUnits(
          triple.vault?.allPositions?.aggregate?.sum?.shares ?? 0,
          18,
        ),
      }

      return tableRow
    }) || []

  // Log each triple's shares for debugging
  listData?.globalTriples?.forEach((triple, index) => {
    logger(
      `Triple ${index} shares:`,
      triple.vault?.allPositions?.aggregate?.sum?.shares,
    )
  })

  // Calculate total users and TVL
  const totalUsers = tableData.reduce((sum, item) => sum + item.users, 0)
  const totalTVL = tableData.reduce((sum, item) => sum + item.tvl, 0)

  const handleStartOnboarding = () => {
    setOnboardingModal({ isOpen: true, gameId: 'minigame1' })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({ isOpen: false, gameId: null })
  }

  const handleRowClick = (id: number) => {
    const rowData = tableData.find((row) => row.id === String(id))

    if (rowData) {
      setAtomDetailsModal({
        isOpen: true,
        atomId: id,
        data: rowData,
      })
    }
  }

  const gamePoints = points?.minigame1 || 0
  const isLoading = isPointsLoading || !listData || isQuestionLoading

  if (isLoading) {
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
            <PageHeader title={`Intuition Questions Module: Question ${id}`} />
          </div>
        </div>
        <div className="flex items-center justify-center h-[400px]">
          <LoadingLogo size={100} />
        </div>
      </>
    )
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
          <PageHeader title={`Intuition Questions Module: Question ${id}`} />
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="border border-border/10"
              onClick={() =>
                setShareModalActive({
                  isOpen: true,
                  currentPath: fullPath,
                  title: listData?.globalTriples[0].object.label ?? '', // TODO: Change this to use the quest name from the metadata once it's added to the points API
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
        <div className="relative">
          <Card className="border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] min-h-80">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="space-y-2 items-center pb-8">
                <Text variant="heading3" className="text-foreground">
                  {title}
                </Text>
                <Text variant="body" className="text-foreground/70">
                  {description}
                </Text>
              </div>
              <AuthCover buttonContainerClassName="h-full flex items-center justify-center w-full">
                {gamePoints > 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                      {gamePoints}
                    </span>
                    <span className="text-md font-semibold text-muted-foreground">
                      IQ Earned
                    </span>
                  </div>
                ) : (
                  authenticated && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleStartOnboarding}
                      disabled={!enabled}
                    >
                      Earn {pointAwardAmount} IQ Points
                    </Button>
                  )
                )}
              </AuthCover>
            </div>
          </Card>
        </div>

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
        <DataTable
          columns={columns}
          data={tableData}
          onRowClick={handleRowClick}
        />
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
      <AtomDetailsModal
        isOpen={atomDetailsModal.isOpen}
        onClose={() =>
          setAtomDetailsModal({ isOpen: false, atomId: 0, data: undefined })
        }
        atomId={atomDetailsModal.atomId}
        data={atomDetailsModal.data}
      />
    </>
  )
}
