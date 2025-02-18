/**
 * Epoch-specific questions page
 * Route: /quests/questions/:epochId
 */

import { Suspense } from 'react'

import {
  Button,
  Card,
  cn,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { EpochStatus } from '@components/epoch-status'
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    logger('Starting epoch questions loader')
    const queryClient = new QueryClient()
    const { epochId } = params

    const user = await getUser(request)
    const userWallet = user?.wallet?.address?.toLowerCase()
    logger('User wallet:', userWallet)

    // Prefetch epoch
    logger('Fetching epoch')
    const epochResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-epoch?epochId=${epochId}`,
    )
    const epochData = await epochResponse.json()
    logger('Epoch data:', epochData)
    await queryClient.setQueryData(['get-epoch', epochId], epochData.epoch)

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

  // Get epoch data
  const { data: epoch, isLoading: isLoadingEpoch } = useQuery({
    queryKey: ['get-epoch', epochId],
    queryFn: async () => {
      const response = await fetch(`/resources/get-epoch?epochId=${epochId}`)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch epoch')
      }
      return data.epoch
    },
  })

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

  if (isLoadingQuestions || isLoadingEpoch) {
    return <QuestionsSkeleton />
  }

  if (!epoch) {
    return <ErrorPage routeName="epoch questions" />
  }

  const totalPoints = questions?.reduce(
    (acc: number, q: Question) => acc + (q.point_award_amount || 0),
    0,
  )

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
          title={`${epoch.name} Questions`}
          subtitle="Answer questions to earn IQ"
        />
      </div>
      <div
        className={cn(
          'relative overflow-hidden rounded-lg transition-all duration-200',
          'bg-white/5 backdrop-blur-md backdrop-saturate-150 group border border-border/10',
          !epoch.is_active && 'opacity-90',
        )}
      >
        <div className="hover:no-underline w-full px-6 py-4">
          <div className="flex flex-col w-full gap-4">
            {/* Header Section */}
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-3">
                <Text
                  variant={TextVariant.heading4}
                  weight={TextWeight.semibold}
                  className="text-left"
                >
                  {epoch.name}
                </Text>
              </div>
              <EpochStatus
                startDate={epoch.start_date}
                endDate={epoch.end_date}
                isActive={epoch.is_active}
              />
            </div>

            {/* Progress Section */}
            {epochProgress && (
              <div className="w-full">
                <div className="flex justify-between text-sm mb-2">
                  <Text
                    variant={TextVariant.footnote}
                    weight={TextWeight.medium}
                    className="flex items-center gap-2 text-primary/70"
                  >
                    <Icon name="circle-question-mark" className="w-4 h-4" />
                    {epochProgress.completed_count} of {questions?.length || 0}{' '}
                    Questions Completed
                  </Text>
                  <Text
                    variant={TextVariant.footnote}
                    weight={TextWeight.medium}
                    className="text-primary/70 flex flex-row gap-1 items-center"
                  >
                    <Text
                      variant={TextVariant.body}
                      weight={TextWeight.semibold}
                      className="text-success"
                    >
                      {epochProgress.total_points}
                    </Text>{' '}
                    / {totalPoints} IQ Earned
                  </Text>
                </div>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success transition-all duration-300"
                    style={{
                      width: `${(epochProgress.completed_count / (questions?.length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
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
