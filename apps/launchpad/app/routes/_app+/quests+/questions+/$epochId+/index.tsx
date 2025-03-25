import { Suspense } from 'react'

import {
  Button,
  cn,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { AtomDetailsModal } from '@components/atom-details-modal'
import { EpochStatus } from '@components/epoch-status'
import { ErrorPage } from '@components/error-page'
import { LoadingState } from '@components/loading-state'
import { PageHeader } from '@components/page-header'
import { QuestionCardWrapper } from '@components/question-card-wrapper'
import { OnboardingModal } from '@components/survey-modal/survey-modal'
import { useGoBack } from '@lib/hooks/useGoBack'
import type { Question } from '@lib/services/questions'
import { atomDetailsModalAtom, onboardingModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { MessageCircleQuestion } from 'lucide-react'

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const queryClient = new QueryClient()
    const { epochId } = params

    // Start parallel fetches for critical data
    const [user, epochResponse, questionsResponse] = await Promise.all([
      getUser(request),
      fetch(
        `${new URL(request.url).origin}/resources/get-epoch?epochId=${epochId}`,
      ),
      fetch(
        `${new URL(request.url).origin}/resources/get-questions?epochId=${epochId}`,
      ),
    ])

    const userWallet = user?.wallet?.address?.toLowerCase()

    // Process epoch data
    const epochData = await epochResponse.json()
    if (!epochData.epoch) {
      throw new Error('No epoch data received')
    }
    await queryClient.setQueryData(['get-epoch', epochId], epochData.epoch)

    // Process questions data
    const questionsData = await questionsResponse.json()
    if (!questionsData.epoch_questions) {
      throw new Error('No questions data received')
    }
    await queryClient.setQueryData(
      ['get-questions', epochId],
      questionsData.epoch_questions,
    )

    // Prefetch progress in parallel if we have a user
    if (userWallet && epochId) {
      const progressResponse = await fetch(
        `${new URL(request.url).origin}/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epochId}`,
      )
      const progressData = await progressResponse.json()
      await queryClient.setQueryData(
        ['epoch-progress', userWallet.toLowerCase(), epochId],
        progressData.progress,
      )
    }

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
    ogImageParams.set('type', 'epoch')
    ogImageParams.set(
      'data',
      JSON.stringify({
        title: `${epochData.epoch.name} Questions`,
        description: `Answer questions and earn IQ points in ${epochData.epoch.name}`,
        type: 'epoch',
        holders: questionsData.epoch_questions.length,
        itemCount: epochData.epoch.total_points,
        epoch: epochData.epoch.order,
      }),
    )
    // Ensure OG image URL uses normalized base URL and has no trailing slash before the query params
    const ogImagePath = '/resources/create-og'
    const ogImageUrl = `${normalizedBaseUrl}${ogImagePath}?${ogImageParams.toString()}`

    return json({
      dehydratedState: dehydrate(queryClient),
      userWallet,
      ogImageUrl,
      canonicalUrl,
      epochId,
      epochName: epochData.epoch.name,
    })
  } catch (error) {
    logger('Error in epoch questions loader:', error)
    throw error
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { ogImageUrl, canonicalUrl, epochName } = data

  return [
    {
      title: `${epochName} Questions | Intuition Launchpad`,
    },
    {
      name: 'description',
      content: `Answer questions and earn IQ points in ${epochName}.`,
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
      content: `${epochName} Questions | Intuition Launchpad`,
    },
    {
      property: 'og:description',
      content: `Answer questions and earn IQ points in ${epochName}.`,
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
      content: `${epochName} Questions page for Intuition Launchpad`,
    },
    {
      name: 'twitter:title',
      content: `${epochName} Questions | Intuition Launchpad`,
    },
    {
      name: 'twitter:description',
      content: `Answer questions and earn IQ points in ${epochName}.`,
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
  return <ErrorPage routeName="epoch questions" />
}

// function QuestionsSkeleton() {
//   return (
//     <div className="relative">
//       <Card className="h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] blur-sm brightness-50">
//         <div className="absolute inset-0 flex flex-col justify-between p-8">
//           <div className="space-y-2">
//             <Text
//               variant="headline"
//               weight="medium"
//               className="text-foreground"
//             >
//               Loading...
//             </Text>
//           </div>
//         </div>
//       </Card>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="bg-background/80 px-6 py-3 rounded-lg backdrop-blur-sm">
//           <span className="text-xl font-semibold text-foreground">
//             Loading...
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function EpochQuestions() {
  const { epochId, userWallet } = useLoaderData<typeof loader>()
  const goBack = useGoBack({ fallbackRoute: `/quests/questions` })
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)
  const [atomDetailsModal, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)

  // Get epoch data (prefetched in loader)
  const { data: epoch } = useQuery({
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

  // Get questions (prefetched in loader)
  const { data: questions } = useQuery({
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

  // Get progress (prefetched in loader if user exists)
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

  // Show skeleton while critical data loads
  if (!epoch || !questions) {
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

  if (!epoch) {
    return <ErrorPage routeName="epoch questions" />
  }

  if (!epoch) {
    return <ErrorPage routeName="epoch questions" />
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
                  weight={TextWeight.semibold}
                  className="text-left text-2xl md:text-3xl"
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
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm mb-2 gap-1 sm:gap-0">
                  <Text
                    variant={TextVariant.footnote}
                    weight={TextWeight.medium}
                    className="flex items-center gap-1 sm:gap-2 text-primary/70 text-sm sm:text-base"
                  >
                    <MessageCircleQuestion className="w-3 h-3 sm:w-4 sm:h-4" />
                    {epochProgress.completed_count} of {questions.length}{' '}
                    Questions Completed
                  </Text>
                  <Text
                    variant={TextVariant.footnote}
                    weight={TextWeight.medium}
                    className="text-primary/70 flex flex-row gap-1 items-center text-sm sm:text-base"
                  >
                    <Text
                      variant={TextVariant.body}
                      weight={TextWeight.semibold}
                      className="text-success"
                    >
                      {epochProgress.total_points}
                    </Text>{' '}
                    / {epoch.total_points_available} IQ Earned
                  </Text>
                </div>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success transition-all duration-300"
                    style={{
                      width: `${(epochProgress.completed_count / questions.length) * 100}%`,
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
          <Suspense key={question.id} fallback={<LoadingState />}>
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
