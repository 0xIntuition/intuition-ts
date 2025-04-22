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
import { json } from '@remix-run/node'
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
  total_points: number
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
    fetch(`${new URL(request.url).origin}/resources/get-epochs`),
  ])
  markTiming('Critical data parallel fetch', criticalStart)

  const userWallet = user?.wallet?.address?.toLowerCase()

  const epochsData = await epochsResponse.json()
  if (!epochsData.epochs) {
    throw new Error('No epochs data received')
  }
  await queryClient.setQueryData(['get-epochs'], epochsData.epochs)

  // Ensure we use the full ngrok URL if present and normalize the URL
  const host = request.headers.get('host') || ''
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  const baseUrl = host.includes('ngrok')
    ? `${protocol}://${host}`
    : new URL(request.url).origin

  // Normalize the path to always include trailing slash
  const url = new URL(request.url)
  const normalizedPath = url.pathname.endsWith('/')
    ? url.pathname
    : `${url.pathname}/`

  // Normalize base URL to not have trailing slash
  const normalizedBaseUrl = baseUrl.endsWith('/')
    ? baseUrl.slice(0, -1)
    : baseUrl

  const canonicalUrl = `${normalizedBaseUrl}${normalizedPath}${url.search}`

  // Construct OG image URL using URLSearchParams
  const ogImageParams = new URLSearchParams()
  ogImageParams.set('type', 'epochs')
  ogImageParams.set(
    'data',
    JSON.stringify({
      title: 'Bootstrap your Intuition',
      description:
        'Answer questions and earn IQ points across different epochs',
      type: 'epochs',
      holders: epochsData.epochs.length,
      itemCount: epochsData.epochs.reduce(
        (acc: number, epoch: Epoch) => acc + (epoch.total_points || 0),
        0,
      ),
      totalEpochs: epochsData.epochs.length,
    }),
  )

  // For OG image URL, use the non-trailing-slash version of the path
  const ogImageUrl = `${normalizedBaseUrl}/resources/create-og?${ogImageParams.toString()}`

  markTiming('Total loader execution', loaderStart)

  return json({
    dehydratedState: dehydrate(queryClient),
    userWallet,
    ogImageUrl,
    canonicalUrl,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { ogImageUrl, canonicalUrl } = data

  return [
    {
      title: 'Questions | Intuition Launchpad',
    },
    {
      name: 'description',
      content: 'Answer questions and earn IQ points across different epochs.',
    },
    // Canonical URL
    {
      tagName: 'link',
      rel: 'canonical',
      href: canonicalUrl,
    },
    // Open Graph tags
    {
      property: 'og:url',
      content: canonicalUrl,
    },
    {
      property: 'og:title',
      content: 'Questions | Intuition Launchpad',
    },
    {
      property: 'og:description',
      content: 'Answer questions and earn IQ points across different epochs.',
    },
    {
      property: 'og:image',
      content: ogImageUrl,
    },
    {
      property: 'og:image:width',
      content: '1200',
    },
    {
      property: 'og:image:height',
      content: '630',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    { property: 'og:site_name', content: 'Intuition Launchpad' },
    { property: 'og:locale', content: 'en_US' },
    // Twitter specific tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:domain',
      content: 'intuition.systems',
    },
    {
      name: 'twitter:image',
      content: ogImageUrl,
    },
    {
      name: 'twitter:image:alt',
      content: 'Questions page for Intuition Launchpad',
    },
    {
      name: 'twitter:title',
      content: 'Questions | Intuition Launchpad',
    },
    {
      name: 'twitter:description',
      content: 'Answer questions and earn IQ points across different epochs.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
    { name: 'twitter:creator', content: '@0xIntuition' },
    // Security headers
    { 'ngrok-skip-browser-warning': '1' },
    { 'x-frame-options': 'SAMEORIGIN' },
    { 'x-content-type-options': 'nosniff' },
  ]
}

export function ErrorBoundary() {
  return <ErrorPage routeName="questions" />
}

function useEpochsData() {
  const { userWallet } = useLoaderData<typeof loader>()

  // Get all epochs data (prefetched in loader)
  const { data: epochs = [] } = useQuery<Epoch[]>({
    queryKey: ['get-epochs'],
    queryFn: async () => {
      const response = await fetch('/resources/get-epochs')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch epochs')
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
  return epochs.map((epoch, index) => {
    const epochQuestions = allQuestions.filter((q) => q.epoch_id === epoch.id)
    // Calculate total points based on the sum of points for all questions
    const calculatedTotalPoints = epochQuestions.reduce(
      (sum, q) => sum + q.point_award_amount,
      0,
    )

    return {
      ...epoch,
      questions: epochQuestions,
      // Use the calculated total points if available, otherwise fall back to the epoch's total_points
      total_points:
        calculatedTotalPoints > 0 ? calculatedTotalPoints : epoch.total_points,
      progress: progressResults[index].data as Progress | undefined,
    }
  })
}

export default function Questions() {
  const goBack = useGoBack({ fallbackRoute: `/quests` })
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  const epochsWithQuestions = useEpochsData()
  const { isLoading: isLoadingEpochs } = useQuery({
    queryKey: ['get-epochs'],
  })

  // Show skeleton for initial loading
  if (isLoadingEpochs || !epochsWithQuestions.length) {
    return <LoadingState />
  }

  const handleStartOnboarding = (
    question: Question,
    predicateId: number,
    objectId: number,
  ) => {
    setOnboardingModal({ isOpen: true, question, predicateId, objectId })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({
      isOpen: false,
      question: null,
      predicateId: null,
      objectId: null,
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
          title="Bootstrap your Intuition"
          subtitle="Seed the Intuition Graph with your unique thoughts, knowledge, and insights"
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
