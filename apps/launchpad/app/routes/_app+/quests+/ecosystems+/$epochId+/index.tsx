import { Suspense } from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { EcosystemModal } from '@components/ecosystem-modal/survey-modal'
import { EpochAccordion } from '@components/epoch-accordion'
import { ErrorPage } from '@components/error-page'
import { LoadingState } from '@components/loading-state'
import { PageHeader } from '@components/page-header'
import { ShimmerButton } from '@components/ui/shimmer-button'
import { useGoBack } from '@lib/hooks/useGoBack'
import type { Question } from '@lib/services/questions'
import { atomDetailsModalAtom, onboardingModalAtom } from '@lib/state/store'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import {
  dehydrate,
  QueryClient,
  useQueries,
  useQuery,
} from '@tanstack/react-query'
import { useAtom } from 'jotai'

interface Epoch {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  total_points_available: number
  total_points: number
}

interface Progress {
  completed_count: number
  total_points: number
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const timings: Record<string, number> = {}
  const markTiming = (label: string, startTime: number) => {
    timings[label] = Date.now() - startTime
  }

  const loaderStart = Date.now()
  const queryClient = new QueryClient()

  // Start parallel fetches for critical data
  const criticalStart = Date.now()
  const [user, epochsResponse] = await Promise.all([
    getUser(request),
    fetch(`${new URL(request.url).origin}/resources/get-epochs?type=ecosystem`),
  ])
  markTiming('Critical data parallel fetch', criticalStart)

  const userWallet = user?.wallet?.address?.toLowerCase()
  const epochId = Number(params.epochId)

  const epochsData = await epochsResponse.json()
  if (!epochsData.epochs) {
    throw new Error('No epochs data received')
  }
  await queryClient.setQueryData(['get-ecosystem-epochs'], epochsData.epochs)

  const currentEpoch = epochsData.epochs.find(
    (epoch: Epoch) => epoch.id === epochId,
  )

  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?type=ecosystems`

  markTiming('Total loader execution', loaderStart)

  return {
    dehydratedState: dehydrate(queryClient),
    userWallet,
    ogImageUrl,
    epochId,
    currentEpoch,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { ogImageUrl } = data

  return [
    {
      title: 'Ecosystems | Intuition Launchpad',
    },
    {
      name: 'description',
      content: 'Answer questions and earn IQ points across different epochs.',
    },
    {
      property: 'og:title',
      content: 'Ecosystems | Intuition Launchpad',
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
      content: 'Ecosystems | Intuition Launchpad',
    },
    {
      name: 'twitter:description',
      content: 'Answer questions and earn IQ points across different epochs.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function ErrorBoundary() {
  return <ErrorPage routeName="questions" />
}

function useEpochsData() {
  const { userWallet, epochId } = useLoaderData<typeof loader>()

  // Get all ecosystem epochs data (prefetched in loader)
  const { data: epochs = [] } = useQuery<Epoch[]>({
    queryKey: ['get-ecosystem-epochs'],
    queryFn: async () => {
      const response = await fetch('/resources/get-epochs?type=ecosystem')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch ecosystem epochs')
      }
      return data.epochs
    },
  })

  // Get questions for each epoch as they're expanded
  const { data: allQuestions = [] } = useQuery<Question[]>({
    queryKey: ['get-questions'],
    queryFn: async () => {
      const response = await fetch('/resources/get-questions')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch questions')
      }
      return data.epoch_questions
    },
    // Only fetch questions when we have epochs
    enabled: epochs.length > 0,
  })

  // Fetch progress for all epochs
  const progressResults = useQueries({
    queries: epochs.map((epoch) => ({
      queryKey: ['epoch-progress', userWallet?.toLowerCase(), epoch.id],
      queryFn: async () => {
        const response = await fetch(
          `/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epoch.id}`,
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch epoch progress')
        }
        return data.progress
      },
      enabled: Boolean(userWallet) && Boolean(epoch.id),
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 2,
    })),
  })

  // Filter epochs to only show the selected one
  const filteredEpochs = epochs.filter((epoch) => epoch.id === epochId)

  // Create a map of epoch IDs to their progress data
  const progressMap = epochs.reduce(
    (map, epoch, index) => {
      if (progressResults[index]?.data) {
        map[epoch.id] = progressResults[index].data as Progress
      }
      return map
    },
    {} as Record<number, Progress>,
  )

  // Combine the data
  return filteredEpochs.map((epoch) => ({
    ...epoch,
    questions: allQuestions.filter((q) => q.epoch_id === epoch.id),
    progress: progressMap[epoch.id],
  }))
}

export default function EcosystemEpoch() {
  const { currentEpoch } = useLoaderData<typeof loader>()
  const goBack = useGoBack({ fallbackRoute: `/quests/ecosystems` })
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  const epochsWithQuestions = useEpochsData()
  const { isLoading: isLoadingEpochs } = useQuery({
    queryKey: ['get-ecosystem-epochs'],
  })

  // Show skeleton for initial loading
  if (isLoadingEpochs || !epochsWithQuestions.length) {
    return <LoadingState />
  }

  // Determine if this is an Arbitrum epoch
  const isArbitrumEpoch = currentEpoch.name === 'Arbitrum'

  // Set background color based on epoch type
  const buttonBgColor = isArbitrumEpoch ? '#213147' : 'rgba(0, 82, 255, 1)'

  const handleStartOnboarding = (
    question: Question,
    predicateId: number,
    objectId: number,
  ) => {
    setOnboardingModal({
      isOpen: true,
      question,
      predicateId,
      objectId,
      tagObjectId: question.tag_object_id,
    })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({
      isOpen: false,
      question: null,
      predicateId: null,
      objectId: null,
      tagObjectId: null,
    })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="border-none bg-background-muted"
            onClick={goBack}
          >
            <Icon name="chevron-left" className="h-4 w-4" />
          </Button>
          <PageHeader
            title={`${epochsWithQuestions[0].name} Ecosystem`}
            subtitle="Seed the Intuition Graph with your unique perspective."
          />
        </div>
        <ShimmerButton
          className={`flex items-center gap-2`}
          background={buttonBgColor}
          onClick={() =>
            window.open('https://ecosystems.intuition.systems', '_blank')
          }
        >
          <Icon name="layout-grid" className="h-4 w-4" />
          <span>View Ecosystem Map</span>
        </ShimmerButton>
      </div>
      <Suspense fallback={<LoadingState />}>
        <EpochAccordion
          epochs={epochsWithQuestions}
          onStartQuestion={handleStartOnboarding}
        />
      </Suspense>
      <EcosystemModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
        predicateId={onboardingModal.predicateId || 0}
        objectId={onboardingModal.objectId || 0}
        question={onboardingModal.question!}
        tagObjectId={onboardingModal.tagObjectId || 0}
      />
      <AtomDetailsModal
        isOpen={atomDetailsModal.isOpen}
        onClose={() =>
          setAtomDetailsModal({ isOpen: false, atomId: 0, data: undefined })
        }
        atomId={atomDetailsModal.atomId || 0}
        data={atomDetailsModal.data}
        listClaim={false}
      />
    </>
  )
}
