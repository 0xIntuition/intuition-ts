import { Avatar, Text, TextVariant, TextWeight } from '@0xintuition/1ui'
import {
  fetcher,
  GetAccountMetadataDocument,
  useGetAccountMetadataQuery,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { AggregateIQ } from '@components/aggregate-iq'
import { AuthCover } from '@components/auth-cover'
import ChapterProgress from '@components/chapter-progress'
import { DashboardBanner } from '@components/dashboard-banner'
import { EarnSection } from '@components/earn-section'
import { ErrorPage } from '@components/error-page'
import { LegionBanner } from '@components/legion/legion-banner'
import { LoadingState } from '@components/loading-state'
import { CHAPTERS } from '@consts/chapters'
import { ZERO_ADDRESS } from '@consts/general'
import { usePoints } from '@lib/hooks/usePoints'
import { useTotalCompletedQuestions } from '@lib/hooks/useTotalCompletedQuestions'
import { useUserRank } from '@lib/hooks/useUserRank'
import { useFeatureFlags } from '@lib/providers/feature-flags-provider'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
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
  const queryClient = new QueryClient()

  const user = await getUser(request)
  const address = user?.wallet?.address?.toLowerCase()

  if (address) {
    await queryClient.prefetchQuery({
      queryKey: ['get-user-atom', { address }],
      queryFn: async () => {
        const response = await fetcher(GetAccountMetadataDocument, {
          address,
        })()
        return response
      },
    })
  }

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      address,
    },
  })
}

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Dashboard() {
  const { initialParams } = useLoaderData<typeof loader>()
  const address = initialParams?.address?.toLowerCase()
  const { featureFlags } = useFeatureFlags()

  const { data: user } = useGetAccountMetadataQuery({
    address: address ?? ZERO_ADDRESS,
  })

  // Client-side queries with loading states
  const { data: points } = usePoints(address)
  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: address ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })
  const { data: rankData } = useUserRank(address)
  const { data: totalCompletedQuestions } = useTotalCompletedQuestions()

  // Show loading state only for the critical data
  const isLoadingCriticalData = !user
  if (isLoadingCriticalData) {
    return <LoadingState />
  }

  // Calculate protocol points even if some data is still loading
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
      <div className="pb-5">
        <LegionBanner ctaHref="#" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-none rounded-lg px-4 sm:px-6 pb-4 sm:pb-6 text-palette-neutral-900 shadow-pop-lg text-center sm:text-left"
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
            <Text
              variant={TextVariant.heading3}
              weight={TextWeight.semibold}
              className="text-3xl sm:text-4xl break-words max-w-[300px] sm:max-w-none"
            >
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
          earnedIQ={points?.launchpad_quests_points ?? 0}
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
