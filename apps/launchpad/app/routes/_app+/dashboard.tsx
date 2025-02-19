import { Avatar, Text, TextVariant, TextWeight } from '@0xintuition/1ui'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  useGetAccountQuery,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { AggregateIQ } from '@components/aggregate-iq'
import { AuthCover } from '@components/auth-cover'
import ChapterProgress from '@components/chapter-progress'
import { EarnSection } from '@components/earn-section'
import { ErrorPage } from '@components/error-page'
import { LoadingState } from '@components/loading-state'
import { CHAPTERS } from '@consts/chapters'
import { ZERO_ADDRESS } from '@consts/general'
import { useEpochProgress } from '@lib/hooks/useEpochProgress'
import { usePoints } from '@lib/hooks/usePoints'
import { useTotalCompletedQuestions } from '@lib/hooks/useTotalCompletedQuestions'
import { useUserRank } from '@lib/hooks/useUserRank'
import { fetchPoints, fetchUserRank } from '@lib/services/points'
import { fetchTotalCompletedQuestions } from '@lib/services/questions'
import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Code, Compass, Scroll } from 'lucide-react'
import { formatUnits } from 'viem'

const earnCards = [
  {
    id: '1',
    earnIQ: 100000,
    title: 'Earn IQ with Quests',
    icon: <Scroll className="w-4 h-4" />,
    description: 'Complete quests to obtain IQ reward points',
    buttonText: 'View Quests',
    link: '/quests',
  },
  {
    id: '2',
    title: 'Earn IQ in the Ecosystem',
    icon: <Compass className="w-4 h-4" />,
    description: 'Explore and use apps from our product hub',
    buttonText: 'Explore',
    link: '/discover',
  },
  {
    id: '3',
    title: 'Start Building on Intuition',
    icon: <Code className="w-4 h-4" />,
    description: 'Build your own apps and tools on Intuition',
    buttonText: 'Start Building',
    link: 'https://tech.docs.intuition.systems/',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  const address = user?.wallet?.address?.toLowerCase()

  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  const epochResponse = await fetch(
    `${new URL(request.url).origin}/resources/get-current-epoch`,
  )
  const epochData = await epochResponse.json()
  await queryClient.setQueryData(['current-epoch'], epochData.epoch)

  if (address) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['get-points', { address }],
        queryFn: async () => {
          const response = await fetchPoints(address.toLowerCase())
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-user-rank', address.toLowerCase()],
        queryFn: async () => {
          const response = await fetchUserRank(address.toLowerCase())
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-protocol-fees', { address }],
        queryFn: async () => {
          const response = await fetcher<
            GetFeeTransfersQuery,
            GetFeeTransfersQueryVariables
          >(GetFeeTransfersDocument, {
            address,
            cutoff_timestamp: 1733356800,
          })()
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-user-atom', { address }],
        queryFn: async () => {
          const response = await fetcher<
            GetAccountQuery,
            GetAccountQueryVariables
          >(GetAccountDocument, {
            address,
          })()
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['total-completed-questions', address.toLowerCase()],
        queryFn: async () => fetchTotalCompletedQuestions(address),
      }),
    ])
  }

  // Prefetch epoch progress if we have both wallet and epoch
  if (address && epochData.epoch?.id) {
    logger('Fetching epoch progress')
    const progressResponse = await fetch(
      `${new URL(request.url).origin}/resources/get-epoch-progress?accountId=${address}&epochId=${epochData.epoch.id}`,
    )
    const progressData = await progressResponse.json()
    logger('Progress data:', progressData)
    await queryClient.setQueryData(
      ['epoch-progress', address.toLowerCase(), epochData.epoch.id],
      progressData.progress,
    )
  }

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      address,
      activityLimit,
      activityOffset,
    },
  })
}

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Dashboard() {
  const { initialParams } = useLoaderData<typeof loader>()
  const address = initialParams?.address?.toLowerCase()

  const { data: user } = useGetAccountQuery({
    address: address ?? ZERO_ADDRESS,
  })

  const { data: points, isLoading: isLoadingPoints } = usePoints(address)
  const { data: protocolFees, isLoading: isLoadingFees } =
    useGetFeeTransfersQuery({
      address: address ?? ZERO_ADDRESS,
      cutoff_timestamp: 1733356800,
    })
  const { data: currentEpoch, isLoading: isLoadingEpoch } = useQuery({
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
  const { data: epochProgress, isLoading: isLoadingProgress } =
    useEpochProgress(currentEpoch?.id)
  const { data: rankData, isLoading: isLoadingRank } = useUserRank(address)

  const { data: totalCompletedQuestions, isLoading: isLoadingTotalCompleted } =
    useTotalCompletedQuestions()

  // Only show loading state on initial mount when we have no data
  const isInitialLoading =
    isLoadingPoints &&
    isLoadingFees &&
    isLoadingEpoch &&
    isLoadingProgress &&
    isLoadingRank &&
    isLoadingTotalCompleted &&
    !points &&
    !protocolFees &&
    !currentEpoch &&
    !epochProgress &&
    !rankData &&
    !totalCompletedQuestions

  if (isInitialLoading) {
    return <LoadingState />
  }

  const feesPaidBeforeCutoff = formatUnits(
    protocolFees?.before_cutoff?.aggregate?.sum?.amount ?? 0n,
    18,
  )
  const feesPaidAfterCutoff = formatUnits(
    protocolFees?.after_cutoff?.aggregate?.sum?.amount ?? 0n,
    18,
  )

  const protocolPointsBeforeCutoff =
    Number(feesPaidBeforeCutoff || '0') * 10000000
  const protocolPoitnsAfterCutoff = Number(feesPaidAfterCutoff || '0') * 2000000
  const protocolPointsTotal = Math.round(
    protocolPointsBeforeCutoff + protocolPoitnsAfterCutoff,
  )

  const combinedTotal = (points?.total_points ?? 0) + protocolPointsTotal

  const stages = CHAPTERS.CHAPTERS

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 border-none rounded-lg px-6 pb-6 text-palette-neutral-900 shadow-pop-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Avatar
            className="w-20 h-20"
            src={user?.account?.image ?? ''}
            name={user?.account?.label ?? ''}
          />
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Text variant={TextVariant.heading3} weight={TextWeight.semibold}>
              {user?.account?.label
                ? `Welcome back, ${user.account.label}!`
                : `Welcome!`}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Text
              variant={TextVariant.body}
              weight={TextWeight.medium}
              className="text-primary/70"
            >
              Are you ready to boost your Intuition?
            </Text>
          </motion.div>
        </div>
      </motion.div>
      <AuthCover
        buttonContainerClassName="h-full flex items-center justify-center"
        blurAmount="blur-none"
      >
        <AggregateIQ
          totalIQ={combinedTotal}
          rank={rankData?.rank}
          totalUsers={rankData?.totalUsers}
          address={address}
          earnedIQ={points?.launchpad_quests ?? 0}
          totalCompletedQuestions={totalCompletedQuestions?.count ?? 0}
        />
      </AuthCover>
      <ChapterProgress
        title="Chapters"
        stages={stages}
        currentStageIndex={CHAPTERS.CURRENT_CHAPTER - 1}
      />
      <EarnSection quests={earnCards} />
    </div>
  )
}
