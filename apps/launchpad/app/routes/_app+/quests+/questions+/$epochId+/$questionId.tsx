import React from 'react'

import {
  Avatar,
  Banner,
  Button,
  Card,
  Icon,
  IconName,
  Text,
} from '@0xintuition/1ui'
import type { GetListDetailsSimplifiedQuery } from '@0xintuition/graphql'
import {
  Triples_Order_By,
  useGetAtomQuery,
  useGetListDetailsSimplifiedQuery,
} from '@0xintuition/graphql'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { AuthCover } from '@components/auth-cover'
import LoadingLogo from '@components/loading-logo'
import { Navigation } from '@components/lore/chapter-navigation'
import { PageHeader } from '@components/page-header'
import ShareModal from '@components/share-modal'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { columns } from '@components/ui/table/columns'
import { DataTable } from '@components/ui/table/data-table'
import { MIN_DEPOSIT, ZERO_ADDRESS } from '@consts/general'
import { Question } from '@lib/graphql/types'
import { useGoBack } from '@lib/hooks/useGoBack'
import type { EpochQuestion } from '@lib/services/epochs'
import { fetchEpochQuestion, fetchEpochQuestions } from '@lib/services/epochs'
import {
  atomDetailsModalAtom,
  onboardingModalAtom,
  shareModalAtom,
} from '@lib/state/store'
import { usePrivy } from '@privy-io/react-auth'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import {
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from '@remix-run/react'
import { getUser } from '@server/auth'
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { TripleType } from 'app/types'
import { ListDetailsType } from 'app/types/list-details'
import { useAtom } from 'jotai'
import { CheckCircle } from 'lucide-react'
import { formatUnits } from 'viem'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()

  // Start parallel fetches for independent data
  const [user, questionData, allQuestions] = await Promise.all([
    getUser(request),
    fetchEpochQuestion(Number(params.questionId)),
    fetchEpochQuestions(Number(params.epochId)),
  ])

  const userWallet = user?.wallet?.address?.toLowerCase()

  // Cache the results
  await Promise.all([
    queryClient.setQueryData(['get-questions', params.epochId], allQuestions),
  ])

  // Get adjacent questions
  const currentIndex = allQuestions.findIndex(
    (q: EpochQuestion) => q.id === Number(params.questionId),
  )
  const prevQuestion =
    currentIndex > 0 ? allQuestions[currentIndex - 1] : undefined
  const nextQuestion =
    currentIndex < allQuestions.length - 1
      ? allQuestions[currentIndex + 1]
      : undefined

  // Add null check for questionData
  if (!questionData) {
    throw new Error('Failed to fetch question data')
  }

  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?id=${questionData.object_id}&type=list`

  return {
    dehydratedState: dehydrate(queryClient),
    userWallet,
    ogImageUrl,
    questionTitle: questionData?.title,
    questionData,
    prevQuestion,
    nextQuestion,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { ogImageUrl, questionTitle } = data
  const title = questionTitle ?? 'Error | Intuition Launchpad'

  return [
    {
      title: `${title} | Intuition Launchpad`,
    },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og-title',
      name: title,
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
      content: `Intuition Launchpad | ${title}`,
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
      title="Error Loading Question"
      message="There was an error loading the question data. Please try again."
    >
      <Button variant="secondary" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Banner>
  )
}

type Triple = GetListDetailsSimplifiedQuery['globalTriples'][0]

export default function MiniGameOne() {
  const location = useLocation()
  const { epochId, questionId } = useParams()
  const goBack = useGoBack({ fallbackRoute: `/quests/questions/${epochId}` })
  const { userWallet, questionData, prevQuestion, nextQuestion } =
    useLoaderData<typeof loader>()
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()

  const { authenticated } = usePrivy()

  const {
    title,
    description,
    enabled,
    point_award_amount: pointAwardAmount,
    epoch_id: currentEpoch,
    predicate_id: predicateId,
    object_id: objectId,
  } = questionData

  // Fetch completion data using resource route
  const { data: completion, isLoading: isLoadingCompletion } = useQuery({
    queryKey: ['question-completion', userWallet?.toLowerCase(), questionId],
    queryFn: async () => {
      const response = await fetch(
        `/resources/get-question-completion?accountId=${userWallet}&questionId=${questionId}`,
      )
      const data = await response.json()
      return data.completion
    },
    enabled: !!userWallet && !!questionId,
  })

  // Get the user's selected atom if they've completed the question
  const { data: atomData, isLoading: isLoadingAtom } = useGetAtomQuery(
    { id: completion?.subject_id ?? 0 },
    { enabled: !!completion?.subject_id },
  )

  // Add defensive check for location
  const hasUserParam = location?.search
    ? location.search.includes('user=')
    : false
  const fullPath = hasUserParam
    ? `${location?.pathname}${location?.search}`
    : `${location?.pathname}${location?.search}${location?.search ? '&' : '?'}`

  const [sorting, setSorting] = React.useState<SortingState>(() => {
    const sortParam = searchParams.get('sort')
    const orderParam = searchParams.get('order')
    return sortParam
      ? [
          {
            id: sortParam,
            desc: orderParam === 'desc',
          },
        ]
      : [
          {
            id: 'upvotes',
            desc: true,
          },
        ]
  })

  // Update URL when sorting changes
  const updateSortingParams = React.useCallback(
    (newSorting: SortingState) => {
      // Preserve all existing params
      const existingParams = Object.fromEntries(searchParams.entries())
      const updatedParams: Record<string, string> = {
        ...existingParams,
        page: '1', // Reset to first page
      }

      if (newSorting.length > 0) {
        updatedParams.sort = newSorting[0].id
        updatedParams.order = newSorting[0].desc ? 'desc' : 'asc'
      } else {
        delete updatedParams.sort
        delete updatedParams.order
      }

      setSearchParams(updatedParams)
    },
    [searchParams, setSearchParams],
  )

  // Effect to sync sorting state with URL params
  React.useEffect(() => {
    const sortParam = searchParams.get('sort')
    const orderParam = searchParams.get('order')
    if (sortParam) {
      setSorting([
        {
          id: sortParam,
          desc: orderParam === 'desc',
        },
      ])
    }
  }, [searchParams])

  // Get pagination values from URL or use defaults
  const [pageSize, setPageSize] = React.useState(() => {
    const limit = searchParams.get('limit')
    return limit ? parseInt(limit, 10) : 20
  })

  const [pageIndex, setPageIndex] = React.useState(() => {
    const page = searchParams.get('page')
    // Convert 1-based page number from URL to 0-based index
    return page ? Math.max(0, parseInt(page, 10) - 1) : 0
  })

  // Update URL when pagination changes
  const updatePaginationParams = React.useCallback(
    (newPage: number, newSize: number) => {
      // Update URL params
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', (newPage + 1).toString()) // Convert to 1-based for URL
      newParams.set('limit', newSize.toString())
      setSearchParams(newParams, { replace: true })

      // Update local state
      setPageIndex(newPage)
      setPageSize(newSize)
    },
    [searchParams, setSearchParams],
  )

  const queryVariables = React.useMemo(() => {
    // Convert table sorting to GraphQL ordering
    const sortField = sorting[0]?.id
    const sortDirection = sorting[0]?.desc ? 'desc' : 'asc'

    let orderBy: Triples_Order_By = {
      vault: {
        total_shares: 'desc',
      },
    }

    // Map sorting fields to their corresponding GraphQL paths
    switch (sortField) {
      case 'upvotes':
        orderBy = {
          vault: {
            total_shares: sortDirection,
          },
        }
        break
      case 'downvotes':
        orderBy = {
          counter_vault: {
            total_shares: sortDirection,
          },
        }
        break
      case 'name':
        orderBy = {
          subject: {
            label: sortDirection,
          },
        }
        break
      case 'users':
        orderBy = {
          vault: {
            position_count: sortDirection,
          },
        }
        break
      case 'tvl':
        orderBy = {
          vault: {
            total_shares: sortDirection,
          },
        }
        break
    }

    const variables = {
      globalWhere: {
        predicate_id: {
          _eq: predicateId,
        },
        object_id: {
          _eq: objectId,
        },
      },
      address: userWallet ?? ZERO_ADDRESS,
      limit: pageSize,
      offset: pageIndex * pageSize,
      orderBy,
    } as const

    return variables
  }, [predicateId, objectId, userWallet, pageSize, pageIndex, sorting])

  const { data: listData, isLoading: isLoadingListData } =
    useGetListDetailsSimplifiedQuery(
      {
        ...queryVariables,
      },
      {
        queryKey: ['get-list-details', predicateId, objectId, queryVariables],
      },
    )
  const totalCount = listData?.globalTriplesAggregate?.aggregate?.count ?? 0

  type TableRowData = {
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
    currentSharePrice?: number
    stakingDisabled?: boolean
  }

  const tableData = React.useMemo(() => {
    const data =
      (listData?.globalTriples?.map((triple: Triple) => ({
        id: String(triple.vault_id),
        triple: triple as TripleType,
        image: triple.subject.image || '',
        name: triple.subject.label || 'Untitled Entry',
        list: triple.object.label || 'Untitled List',
        vaultId: triple.vault_id,
        counterVaultId: triple.counter_vault_id,
        users: Number(triple.vault?.positions_aggregate?.aggregate?.count ?? 0),
        upvotes: (() => {
          const amount =
            (+formatUnits(
              triple.vault?.positions_aggregate?.aggregate?.sum?.shares ?? 0,
              18,
            ) *
              +formatUnits(triple.vault?.current_share_price ?? 0, 18)) /
            (+MIN_DEPOSIT * 0.95)
          return amount < 0.1 ? 0 : Math.ceil(amount)
        })(),
        downvotes: (() => {
          const amount =
            (+formatUnits(
              triple.counter_vault?.positions_aggregate?.aggregate?.sum
                ?.shares ?? 0,
              18,
            ) *
              +formatUnits(
                triple.counter_vault?.current_share_price ?? 0,
                18,
              )) /
            (+MIN_DEPOSIT * 0.95)
          return amount < 0.1 ? 0 : Math.ceil(amount)
        })(),
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
        userPosition: triple.counter_vault?.positions?.[0]
          ? +formatUnits(
              triple.counter_vault?.positions?.[0]?.shares ?? 0,
              18,
            ) * +formatUnits(triple.counter_vault?.current_share_price ?? 0, 18)
          : +formatUnits(triple.vault?.positions?.[0]?.shares ?? 0, 18) *
            +formatUnits(triple.vault?.current_share_price ?? 0, 18),
        positionDirection: triple.counter_vault?.positions?.[0]
          ? 'against'
          : triple.vault?.positions?.[0]
            ? 'for'
            : undefined,
        currentSharePrice:
          triple.vault?.positions?.[0]?.shares > 0
            ? +formatUnits(triple.vault?.current_share_price, 18)
            : triple.counter_vault?.positions?.[0]?.shares > 0
              ? +formatUnits(triple.counter_vault?.current_share_price, 18)
              : undefined,
      })) as TableRowData[]) ?? []
    return data
  }, [listData, completion])

  const table = useReactTable<TableRowData>({
    data: tableData,
    columns: columns as ColumnDef<TableRowData>[],
    columnResizeMode: 'onChange',
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableHiding: false,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      updateSortingParams(newSorting)
    },
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex,
          pageSize,
        })
        // Only update UI state after data is fetched
        updatePaginationParams(newState.pageIndex, newState.pageSize)
      }
    },
    pageCount: Math.ceil(totalCount / pageSize),
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      columnPinning: {
        left: ['index'],
        right: ['actions'],
      },
    },
  })

  const handleStartOnboarding = () => {
    // Ensure we have the complete question object with required fields
    const questionObj: Question = {
      id: parseInt(questionId || '0', 10),
      title: title || '',
      predicate_id: predicateId,
      object_id: objectId,
      point_award_amount: pointAwardAmount,
      enabled: enabled || false,
      epoch_id: currentEpoch,
      description: description || '', // These fields are optional in the Question type
      link: '', // Empty string instead of null
    }

    setOnboardingModal({
      isOpen: true,
      question: questionObj,
      predicateId,
      objectId,
    })
  }

  const handleCloseOnboarding = () => {
    // Only invalidate queries if we have all required values and the modal was actually open
    if (userWallet && questionId && currentEpoch && onboardingModal.isOpen) {
      // Invalidate queries first
      queryClient.invalidateQueries({
        queryKey: ['question-completion', userWallet.toLowerCase(), questionId],
      })
      queryClient.invalidateQueries({
        queryKey: ['epoch-progress', userWallet.toLowerCase(), currentEpoch],
      })
      queryClient.invalidateQueries({
        queryKey: ['get-questions', currentEpoch],
      })
    }

    // Then close the modal
    setOnboardingModal({
      isOpen: false,
      question: null,
      predicateId: null,
      objectId: null,
    })
  }

  const handleRowClick = (id: number) => {
    const rowData = tableData.find((row) => row.id === String(id))

    if (rowData) {
      setAtomDetailsModal({
        isOpen: true,
        atomId: Number(rowData.triple.vault_id),
        data: rowData,
      })
    }
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
          <PageHeader
            title={`Epoch ${currentEpoch ?? ''} | Question ${questionData?.order}`}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="border border-border/10"
              onClick={() =>
                setShareModalActive({
                  isOpen: true,
                  currentPath: fullPath,
                  title,
                })
              }
            >
              <Icon name="square-arrow-top-right" className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#060504] to-[#101010] rounded-xl">
        <div className="relative">
          <Card
            className="border-none min-w-[480px] min-h-80 relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(6, 5, 4, 0.9), rgba(16, 16, 16, 0.9)), url(${listData?.globalTriples?.[0]?.object?.image || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="space-y-2 items-center pb-8">
                <Text variant="heading3" className="text-foreground">
                  {title}
                </Text>
              </div>
              <AuthCover
                buttonContainerClassName="h-full flex items-center justify-center w-full"
                actionText="Answer"
              >
                {isLoadingCompletion ? (
                  <LoadingLogo size={40} />
                ) : completion ? (
                  <div className="flex flex-col items-center gap-2">
                    {isLoadingAtom ? (
                      <LoadingLogo size={40} />
                    ) : (
                      atomData && (
                        <>
                          <Text variant="body" className="text-primary/70">
                            You selected
                          </Text>
                          <button
                            onClick={() => {
                              const rowData = tableData.find(
                                (row) =>
                                  row.triple.subject.vault_id ===
                                  String(atomData.atom?.vault_id),
                              )

                              if (rowData) {
                                setAtomDetailsModal({
                                  isOpen: true,
                                  atomId: Number(rowData.triple.vault_id),
                                  data: rowData,
                                })
                              }
                            }}
                            className={`flex items-center gap-4 rounded-lg transition-colors w-full md:w-[280px] h-[72px] bg-background/50 backdrop-blur-md backdrop-saturate-150 border border-border/10`}
                          >
                            <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                              <Avatar
                                src={atomData?.atom?.image ?? ''}
                                name={atomData?.atom?.label ?? ''}
                                icon={IconName.fingerprint}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div className="text-left w-full">
                              <div className="text-white text-base leading-5">
                                {atomData?.atom?.label ?? ''}
                              </div>
                            </div>
                            <div className="flex justify-end px-6">
                              <CheckCircle className="text-success h-6 w-6" />
                            </div>
                          </button>
                        </>
                      )
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                        {pointAwardAmount}
                      </span>
                      <span className="text-md font-semibold text-muted-foreground">
                        IQ Earned
                      </span>
                    </div>
                  </div>
                ) : (
                  authenticated &&
                  enabled && (
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
      </div>

      <div className="mt-6 !mb-24">
        {isLoadingListData ? (
          <div className="flex items-center justify-center h-[400px]">
            <LoadingLogo size={100} />
          </div>
        ) : (
          <DataTable
            columns={columns as ColumnDef<TableRowData>[]}
            data={tableData}
            onRowClick={handleRowClick}
            table={table}
            onPaginationChange={updatePaginationParams}
          />
        )}
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
        listData={listData as unknown as ListDetailsType}
      />
      <OnboardingModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
        question={
          onboardingModal.question ?? (questionData as unknown as Question)
        }
        predicateId={predicateId}
        objectId={objectId}
      />
      <AtomDetailsModal
        isOpen={atomDetailsModal.isOpen}
        onClose={() =>
          setAtomDetailsModal({ isOpen: false, atomId: 0, data: undefined })
        }
        atomId={atomDetailsModal.atomId}
        data={atomDetailsModal.data}
      />
      <Navigation
        prevItem={
          prevQuestion
            ? {
                id: String(prevQuestion.id),
                title: prevQuestion.title,
                order: prevQuestion.order,
              }
            : undefined
        }
        nextItem={
          nextQuestion
            ? {
                id: String(nextQuestion.id),
                title: nextQuestion.title,
                order: nextQuestion.order,
              }
            : undefined
        }
        type="question"
        baseUrl={`/quests/questions/${epochId}`}
      />
    </>
  )
}
