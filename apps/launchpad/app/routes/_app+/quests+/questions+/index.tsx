import { Suspense } from 'react'

import { Card, PageHeader, Text } from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import ChapterProgress from '@components/chapter-progress'
import { ErrorPage } from '@components/error-page'
import { MinigameCardWrapper } from '@components/minigame-card-wrapper'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { useEpochProgress } from '@lib/hooks/useEpochProgress'
import { useGetQuestions } from '@lib/hooks/useGetQuestions'
import type { Question } from '@lib/services/questions'
import { atomDetailsModalAtom, onboardingModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

interface QuestionStage {
  status: 'completed' | 'in_progress'
  progress: number
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    logger('Starting questions loader')
    const queryClient = new QueryClient()

    const user = await getUser(request)
    const userWallet = user?.wallet?.address?.toLowerCase()
    logger('User wallet:', userWallet)

    // Prefetch current epoch
    logger('Fetching current epoch')
    const epochResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-current-epoch`,
    )
    const epochData = await epochResponse.json()
    logger('Current epoch data:', epochData)
    await queryClient.setQueryData(['current-epoch'], epochData.epoch)

    // Prefetch questions
    logger('Fetching questions')
    const questionsResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-questions`,
    )
    const questionsData = await questionsResponse.json()
    logger('Questions data:', questionsData)
    await queryClient.setQueryData(['get-questions'], questionsData.questions)

    // Prefetch epoch progress if we have both wallet and epoch
    if (userWallet && epochData.epoch?.id) {
      logger('Fetching epoch progress')
      const progressResponse = await fetch(
        `${new URL(request.url).origin}/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epochData.epoch.id}`,
      )
      const progressData = await progressResponse.json()
      logger('Progress data:', progressData)
      await queryClient.setQueryData(
        ['epoch-progress', userWallet.toLowerCase(), epochData.epoch.id],
        progressData.progress,
      )
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
      content: 'Answer questions and earn IQ points in the current epoch.',
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
      content: 'Answer questions and earn IQ points in the current epoch.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

function QuestionsSkeleton() {
  return (
    <div className="relative">
      <Card className="h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] blur-sm brightness-50">
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="space-y-2">
            <Text
              variant="headline"
              weight="medium"
              className="text-foreground"
            >
              Loading...
            </Text>
          </div>
        </div>
      </Card>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-background/80 px-6 py-3 rounded-lg backdrop-blur-sm">
          <span className="text-xl font-semibold text-foreground">
            Loading...
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Questions() {
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)
  const { data: questions, isLoading: isLoadingQuestions } = useGetQuestions()
  const { data: currentEpoch } = useQuery({
    queryKey: ['current-epoch'],
    queryFn: async () => {
      const response = await fetch('/resources/get-current-epoch')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch current epoch')
      }
      return data.epoch
    },
  })
  const { data: epochProgress } = useEpochProgress(currentEpoch?.id)

  // Convert questions into stages
  const stages: QuestionStage[] =
    questions?.map((question: Question, index: number) => {
      // Use completion count to determine if this question is completed
      const questionsCompleted = epochProgress?.completed_count || 0
      const isCompleted = index < questionsCompleted

      return {
        status: isCompleted ? 'completed' : 'in_progress',
        progress: isCompleted ? 100 : 0,
      }
    }) || Array(4).fill({ status: 'in_progress', progress: 0 } as QuestionStage)

  // Calculate current question index (first incomplete question)
  const currentStageIndex = stages.findIndex(
    (stage: QuestionStage) => stage.status !== 'completed',
  )

  const handleStartOnboarding = (
    questionId: number,
    predicateId: number,
    objectId: number,
  ) => {
    setOnboardingModal({ isOpen: true, questionId, predicateId, objectId })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({
      isOpen: false,
      questionId: null,
      predicateId: null,
      objectId: null,
    })
  }

  if (isLoadingQuestions) {
    return <QuestionsSkeleton />
  }

  return (
    <>
      <PageHeader title="Questions" />
      <div className="mb-8">
        <ChapterProgress
          stages={stages}
          currentStageIndex={
            currentStageIndex === -1 ? stages.length - 1 : currentStageIndex
          }
        />
        <div className="mt-4 flex justify-between text-sm text-primary/70">
          <span>
            Completed {epochProgress?.completed_count || 0} of{' '}
            {questions?.length || 4} questions
          </span>
          <span>Total Points: {epochProgress?.total_points || 0}</span>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {questions?.map((question: Question) => (
          <Suspense key={question.id} fallback={<QuestionsSkeleton />}>
            <MinigameCardWrapper
              question={question}
              onStart={() =>
                handleStartOnboarding(
                  question.id,
                  question.predicate_id,
                  question.object_id,
                )
              }
            />
          </Suspense>
        ))}
      </div>
      <OnboardingModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
        questionId={onboardingModal.questionId || 0}
        predicateId={onboardingModal.predicateId || 0}
        objectId={onboardingModal.objectId || 0}
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
