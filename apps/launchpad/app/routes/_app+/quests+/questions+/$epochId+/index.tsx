/**
 * Epoch-specific questions page
 * Route: /quests/questions/:epochId
 */

import { Suspense } from 'react'

import { Button, Card, Icon, Text } from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import ChapterProgress from '@components/chapter-progress'
import { ErrorPage } from '@components/error-page'
import { PageHeader } from '@components/page-header'
import { QuestionCardWrapper } from '@components/question-card-wrapper'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { useGoBack } from '@lib/hooks/useGoBack'
import type { Question } from '@lib/services/questions'
import { atomDetailsModalAtom, onboardingModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

interface QuestionStage {
  status: 'completed' | 'in_progress'
  progress: number
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    logger('Starting epoch questions loader')
    const queryClient = new QueryClient()
    const { epochId } = params

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

    // Prefetch questions for this epoch
    logger('Fetching questions for epoch', epochId)
    const questionsResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-questions?epochId=${epochId}`,
    )
    const questionsData = await questionsResponse.json()
    logger('Questions data:', questionsData)
    await queryClient.setQueryData(
      ['get-questions', epochId],
      questionsData.epoch_questions,
    )

    // Prefetch epoch progress if we have both wallet and epoch
    if (userWallet && epochId) {
      logger('Fetching epoch progress')
      const progressResponse = await fetch(
        `${new URL(request.url).origin}/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epochId}`,
      )
      const progressData = await progressResponse.json()
      logger('Progress data:', progressData)
      await queryClient.setQueryData(
        ['epoch-progress', userWallet.toLowerCase(), epochId],
        progressData.progress,
      )
    }

    const { origin } = new URL(request.url)
    const ogImageUrl = `${origin}/resources/create-og?type=questions&epochId=${epochId}`

    return {
      dehydratedState: dehydrate(queryClient),
      userWallet,
      ogImageUrl,
      epochId,
    }
  } catch (error) {
    logger('Error in epoch questions loader:', error)
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
      title: `Epoch Questions | Intuition Launchpad`,
    },
    {
      name: 'description',
      content: 'Answer questions and earn IQ points in this epoch.',
    },
    {
      property: 'og:title',
      content: 'Epoch Questions | Intuition Launchpad',
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
      content: 'Epoch Questions | Intuition Launchpad',
    },
    {
      name: 'twitter:description',
      content: 'Answer questions and earn IQ points in this epoch.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function ErrorBoundary() {
  return <ErrorPage routeName="epoch questions" />
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

export default function EpochQuestions() {
  const { epochId } = useParams()
  const goBack = useGoBack({ fallbackRoute: `/quests/questions` })

  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)
  const { userWallet } = useLoaderData<typeof loader>()

  // Get questions for this specific epoch
  const { data: questions, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ['get-questions', epochId],
    queryFn: async () => {
      const response = await fetch(
        `/resources/get-questions?epochId=${epochId}`,
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch questions')
      }
      return data.epoch_questions
    },
  })

  const { data: epochProgress } = useQuery({
    queryKey: ['epoch-progress', userWallet?.toLowerCase(), epochId],
    queryFn: async () => {
      const response = await fetch(
        `/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epochId}`,
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch epoch progress')
      }
      return data.progress
    },
    enabled: !!userWallet && !!epochId,
  })

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

  if (isLoadingQuestions) {
    return <QuestionsSkeleton />
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
        <PageHeader
          title={`Epoch ${epochId} Questions`}
          subtitle="Answer questions to earn IQ"
        />
      </div>
      <div className="mb-8">
        <ChapterProgress
          title="Epoch"
          currentChapter={Number(epochId)}
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
            <QuestionCardWrapper
              question={question}
              onStart={() =>
                handleStartOnboarding(
                  question,
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
        question={onboardingModal.question!}
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
