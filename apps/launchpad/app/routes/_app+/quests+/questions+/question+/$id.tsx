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
  GetListDetailsWithPositionDocument,
  GetListDetailsWithPositionQuery,
  GetListDetailsWithPositionQueryVariables,
  GetListDetailsWithUserDocument,
  GetListDetailsWithUserQuery,
  GetListDetailsWithUserQueryVariables,
  useGetListDetailsWithPositionQuery,
  useGetListDetailsWithUserQuery,
} from '@0xintuition/graphql'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { AuthCover } from '@components/auth-cover'
import LoadingLogo from '@components/loading-logo'
import ShareModal from '@components/share-modal'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { columns } from '@components/ui/table/columns'
import { DataTable } from '@components/ui/table/data-table'
import { CURRENT_ENV, MIN_DEPOSIT } from '@consts/general'
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
import { TripleType } from 'app/types'
import { useAtom } from 'jotai'
import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()

  const user = await getUser(request)

  const predicateId =
    getSpecialPredicate(CURRENT_ENV).tagPredicate.id.toString()
  const objectId =
    getSpecialPredicate(CURRENT_ENV).web3Wallet.vaultId.toString()

  const userWallet = user?.wallet?.address.toLowerCase()

  const variables: GetListDetailsWithPositionQueryVariables = {
    tagPredicateId: predicateId,
    globalWhere: {
      predicate_id: {
        _eq: predicateId,
      },
      object_id: {
        _eq: objectId,
      },
    },
    ...(userWallet && {
      address: userWallet,
    }),
  }

  let listData
  if (userWallet) {
    listData = await fetcher<
      GetListDetailsWithUserQuery,
      GetListDetailsWithUserQueryVariables
    >(GetListDetailsWithUserDocument, variables)()
  } else {
    listData = await fetcher<
      GetListDetailsWithPositionQuery,
      GetListDetailsWithPositionQueryVariables
    >(GetListDetailsWithPositionDocument, variables)()
  }

  await queryClient.setQueryData(['get-list-details', variables], listData)

  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?id=${objectId}&type=list`

  return {
    dehydratedState: dehydrate(queryClient),
    userWallet,
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
  const { userWallet } = useLoaderData<typeof loader>()
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  const { authenticated } = usePrivy()
  const { data: points, isLoading: isPointsLoading } = usePoints(userWallet)

  const hasUserParam = location.search.includes('user=')
  const fullPath = hasUserParam
    ? `${location.pathname}${location.search}`
    : `${location.pathname}${location.search}${location.search ? '&' : '?'}`

  const predicateId =
    getSpecialPredicate(CURRENT_ENV).tagPredicate.id.toString()
  const objectId =
    getSpecialPredicate(CURRENT_ENV).web3Wallet.vaultId.toString()

  const variables = {
    tagPredicateId: predicateId,
    globalWhere: {
      predicate_id: {
        _eq: predicateId,
      },
      object_id: {
        _eq: objectId,
      },
    },
    ...(userWallet && {
      address: userWallet,
    }),
  }

  const { data: withUserData } = useGetListDetailsWithUserQuery(variables, {
    enabled: !!userWallet,
  })
  const { data: withoutUserData } = useGetListDetailsWithPositionQuery(
    variables,
    {
      enabled: !userWallet,
    },
  )

  const listData = userWallet ? withUserData : withoutUserData

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
    triple: TripleType
    image: string
    name: string
    list: string
    vaultId: string
    counterVaultId: string
    users: number
    upvotes: number
    downvotes: number
    forTvl: number
    againstTvl: number
    userPosition?: number
    positionDirection?: 'for' | 'against'
    userWallet?: string
    currentSharePrice: number
  }

  // Transform the data for the table
  const tableData: TableRowData[] =
    listData?.globalTriples?.map((triple) => {
      const tableRow: TableRowData = {
        id: String(triple.id),
        triple: triple as TripleType,
        image: triple.subject.image || '',
        name: triple.subject.label || 'Untitled Entry',
        list: triple.object.label || 'Untitled List',
        vaultId: triple.vault_id,
        counterVaultId: triple.counter_vault_id,
        users: Number(triple.vault?.positions_aggregate?.aggregate?.count ?? 0),
        upvotes: Math.ceil(
          (+formatUnits(
            triple.vault?.positions_aggregate?.aggregate?.sum?.shares ?? 0,
            18,
          ) *
            +formatUnits(triple.vault?.current_share_price ?? 0, 18)) /
            +MIN_DEPOSIT,
        ),
        downvotes: Math.ceil(
          (+formatUnits(
            triple.counter_vault?.positions_aggregate?.aggregate?.sum?.shares ??
              0,
            18,
          ) *
            +formatUnits(triple.counter_vault?.current_share_price ?? 0, 18)) /
            +MIN_DEPOSIT,
        ),
        forTvl:
          +formatUnits(
            triple.vault?.positions_aggregate?.aggregate?.sum?.shares ?? 0,
            18,
          ) * +formatUnits(triple.vault?.current_share_price ?? 0, 18),
        againstTvl:
          +formatUnits(
            triple.counter_vault?.positions_aggregate?.aggregate?.sum?.shares ??
              0,
            18,
          ) * +formatUnits(triple.counter_vault?.current_share_price ?? 0, 18),
        userPosition:
          +formatUnits(triple.vault?.positions?.[0]?.shares ?? 0, 18) *
          +formatUnits(triple.vault?.current_share_price ?? 0, 18),
        positionDirection:
          triple.vault?.positions?.[0]?.shares > 0
            ? 'for'
            : triple.counter_vault_id === objectId
              ? 'against'
              : undefined,
        currentSharePrice: triple.vault?.current_share_price ?? 0,
      }

      return tableRow
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
  const forTvl = tableData.reduce((sum, item) => sum + item.forTvl, 0)
  const againstTvl = tableData.reduce((sum, item) => sum + item.againstTvl, 0)
  const totalTvl = forTvl + againstTvl
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
                  tvl: totalTvl,
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
              value: totalTvl,
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
