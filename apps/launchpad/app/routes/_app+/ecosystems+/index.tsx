import { Suspense } from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { EpochAccordion } from '@components/epoch-accordion'
import { ErrorPage } from '@components/error-page'
import { LoadingState } from '@components/loading-state'
import { PageHeader } from '@components/page-header'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
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
}

interface Progress {
  completed_count: number
  total_points: number
}

export async function loader({ request }: LoaderFunctionArgs) {
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

  const epochsData = await epochsResponse.json()
  if (!epochsData.epochs) {
    throw new Error('No epochs data received')
  }
  await queryClient.setQueryData(['get-ecosystem-epochs'], epochsData.epochs)

  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?type=ecosystems`

  markTiming('Total loader execution', loaderStart)

  return {
    dehydratedState: dehydrate(queryClient),
    userWallet,
    ogImageUrl,
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
      content: 'Contribute to Intuition ecosystems and earn IQ points.',
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
      content: 'Contribute to Intuition ecosystems and earn IQ points.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function ErrorBoundary() {
  return <ErrorPage routeName="ecosystems" />
}

function useEcosystemsData() {
  const { userWallet } = useLoaderData<typeof loader>()

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

  // Combine the data
  return epochs.map((epoch, index) => ({
    ...epoch,
    questions: allQuestions.filter((q) => q.epoch_id === epoch.id),
    progress: progressResults[index].data as Progress | undefined,
  }))
}

export default function Ecosystems() {
  const goBack = useGoBack({ fallbackRoute: `/quests` })
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  const epochsWithQuestions = useEcosystemsData()
  const { isLoading: isLoadingEpochs } = useQuery({
    queryKey: ['get-ecosystem-epochs'],
  })

  // Show skeleton for initial loading
  if (isLoadingEpochs || !epochsWithQuestions.length) {
    return <LoadingState />
  }

  const handleStartOnboarding = (
    question: Question,
    predicateId: number,
    objectId: number,
    tagObjectId?: number,
  ) => {
    setOnboardingModal({
      isOpen: true,
      question,
      predicateId,
      objectId,
      tagObjectId,
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
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="border-none bg-background-muted"
          onClick={goBack}
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </Button>
        <PageHeader
          title="Ecosystem Contributions"
          subtitle="Contribute to Intuition ecosystems and earn IQ points"
        />
      </div>
      <Suspense fallback={<LoadingState />}>
        <EpochAccordion
          epochs={epochsWithQuestions}
          onStartQuestion={handleStartOnboarding}
        />
      </Suspense>
      <OnboardingModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
        predicateId={onboardingModal.predicateId || 0}
        objectId={onboardingModal.objectId || 0}
        question={onboardingModal.question!}
      />
      <AtomDetailsModal
        isOpen={atomDetailsModal.isOpen}
        onClose={() =>
          setAtomDetailsModal({ isOpen: false, atomId: 0, data: undefined })
        }
        atomId={atomDetailsModal.atomId || 0}
        data={atomDetailsModal.data}
      />
    </>
  )
}
