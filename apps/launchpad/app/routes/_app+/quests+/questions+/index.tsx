import { Button, Icon } from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { EpochAccordion } from '@components/epoch-accordion'
import { ErrorPage } from '@components/error-page'
import { PageHeader } from '@components/page-header'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { useGoBack } from '@lib/hooks/useGoBack'
import type { Question } from '@lib/services/questions'
import { atomDetailsModalAtom, onboardingModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
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
  total_points_available: number
}

interface Progress {
  completed_count: number
  total_points: number
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    logger('Starting questions loader')
    const queryClient = new QueryClient()

    const user = await getUser(request)
    const userWallet = user?.wallet?.address?.toLowerCase()
    logger('User wallet:', userWallet)

    // Fetch all epochs
    logger('Fetching epochs')
    const epochsResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-epochs`,
    )
    const epochsData = await epochsResponse.json()
    logger('Epochs data:', epochsData)
    if (!epochsData.epochs) {
      throw new Error('No epochs data received')
    }
    await queryClient.setQueryData(['get-epochs'], epochsData.epochs)

    // Fetch all questions at once
    logger('Fetching all questions')
    const questionsResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-questions`,
    )
    const questionsData = await questionsResponse.json()
    logger('Questions data:', questionsData)
    if (!questionsData.epoch_questions) {
      throw new Error('No questions data received')
    }
    await queryClient.setQueryData(
      ['get-questions'],
      questionsData.epoch_questions,
    )

    // For each epoch, fetch its progress if user is logged in
    if (userWallet && Array.isArray(epochsData.epochs)) {
      for (const epoch of epochsData.epochs) {
        logger('Fetching progress for epoch', epoch.id)
        const progressResponse = await fetch(
          `${new URL(request.url).origin}/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epoch.id}`,
        )
        const progressData = await progressResponse.json()
        logger('Progress data:', progressData)
        await queryClient.setQueryData(
          ['epoch-progress', userWallet.toLowerCase(), epoch.id],
          progressData.progress,
        )
      }
    }

    const { origin } = new URL(request.url)
    const ogImageUrl = `${origin}/resources/create-og?type=questions`

    return {
      dehydratedState: dehydrate(queryClient),
      userWallet,
      ogImageUrl,
    }
  } catch (error) {
    logger('Error in questions loader:', error)
    throw error
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { ogImageUrl } = data

  return [
    {
      title: 'Questions | Intuition Launchpad',
    },
    {
      name: 'description',
      content: 'Answer questions and earn IQ points across different epochs.',
    },
    {
      property: 'og:title',
      content: 'Questions | Intuition Launchpad',
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
      content: 'Questions | Intuition Launchpad',
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
  const { userWallet } = useLoaderData<typeof loader>()

  // Get all epochs data
  const { data: epochs = [] } = useQuery<Epoch[]>({
    queryKey: ['get-epochs'],
    queryFn: async () => {
      const response = await fetch('/resources/get-epochs')
      const data = await response.json()
      logger('Epochs response:', data)
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch epochs')
      }
      return data.epochs
    },
  })

  // Get all questions at once
  const { data: allQuestions = [] } = useQuery<Question[]>({
    queryKey: ['get-questions'],
    queryFn: async () => {
      const response = await fetch('/resources/get-questions')
      const data = await response.json()
      logger('Questions response:', data)
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch questions')
      }
      return data.epoch_questions
    },
  })

  // Fetch progress for all epochs
  const progressResults = useQueries({
    queries: epochs.map((epoch) => ({
      queryKey: ['epoch-progress', userWallet?.toLowerCase(), epoch.id],
      queryFn: async () => {
        logger(
          `Fetching progress for epoch ${epoch.id} with wallet ${userWallet}`,
        )
        const response = await fetch(
          `/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epoch.id}`,
        )
        const data = await response.json()
        logger(`Progress response for epoch ${epoch.id}:`, data)
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch epoch progress')
        }
        return data.progress
      },
      enabled: Boolean(userWallet),
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 2,
    })),
  })

  logger('Epochs:', epochs)
  logger('Questions:', allQuestions)
  logger(
    'Progress Results:',
    progressResults.map((result) => ({
      epochId: epochs[progressResults.indexOf(result)]?.id,
      enabled: Boolean(userWallet),
      data: result.data,
      error: result.error,
      status: result.status,
    })),
  )

  // Combine the data
  return epochs.map((epoch, index) => ({
    ...epoch,
    questions: allQuestions.filter((q) => q.epoch_id === epoch.id),
    progress: progressResults[index].data as Progress | undefined,
  }))
}

export default function Questions() {
  const goBack = useGoBack({ fallbackRoute: `/quests` })
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  const epochsWithQuestions = useEpochsData()

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
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="border-none bg-background-muted"
          onClick={goBack}
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </Button>
        <PageHeader title="Questions" subtitle="Answer questions to earn IQ" />
      </div>
      <EpochAccordion
        epochs={epochsWithQuestions}
        onStartQuestion={handleStartOnboarding}
      />
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
