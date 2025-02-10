import { Avatar } from '@0xintuition/1ui'
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
import { ZERO_ADDRESS } from '@consts/general'
import { useEpochProgress } from '@lib/hooks/useEpochProgress'
import { usePoints } from '@lib/hooks/usePoints'
import { useUserRank } from '@lib/hooks/useUserRank'
import { fetchPoints, fetchUserRank } from '@lib/services/points'
import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Code, Compass, Scroll } from 'lucide-react'
import { formatUnits } from 'viem'

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
          const response = fetcher<
            GetFeeTransfersQuery,
            GetFeeTransfersQueryVariables
          >(GetFeeTransfersDocument, {
            address,
            cutoff_timestamp: 1733356800,
          })
          return response
        },
      }),
      await queryClient.prefetchQuery({
        queryKey: ['get-user-atom', { address }],
        queryFn: async () => {
          const response = fetcher<GetAccountQuery, GetAccountQueryVariables>(
            GetAccountDocument,
            {
              address,
            },
          )
          return response
        },
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

  return {
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      address,
      activityLimit,
      activityOffset,
    },
  }
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

  const { data: points } = usePoints(address)
  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: address ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })
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
  const { data: rankData } = useUserRank(address)

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

  const earnCards = [
    {
      id: '1',
      earnIQ: 500,
      title: 'Earn IQ with Quests',
      icon: <Scroll className="w-4 h-4" />,
      description: 'Complete quests to obtain IQ reward points',
      buttonText: 'View Quests',
    },
    {
      id: '2',
      earnIQ: 750,
      title: 'Earn IQ in the Ecosystem',
      icon: <Compass className="w-4 h-4" />,
      description: 'Explore and use apps from our product hub',
      buttonText: 'Explore',
    },
    {
      id: '3',
      earnIQ: 1250,
      title: 'Start Building on Intuition',
      icon: <Code className="w-4 h-4" />,
      description: 'Build your own apps and tools on Intuition',
      buttonText: 'Start Building',
    },
  ]

  // Mock data for now - replace with real data later
  const epochs = [
    {
      completion_percentage: epochProgress?.completion_percentage ?? 0,
      completed_count: epochProgress?.completed_count ?? 0,
      total_count: epochProgress?.total_count ?? 0,
      total_points: epochProgress?.total_points ?? 0,
    },
    // Add more epochs as they become available
  ]

  // Convert epoch data into chapter stages
  const stages = Array.from({ length: 5 }).map((_, index) => {
    if (!currentEpoch) {
      return {
        status: 'locked' as const,
        progress: 0,
      }
    }

    if (index < (currentEpoch.id ?? 1) - 1) {
      // Past epochs
      const pastEpoch = epochs[index]
      return {
        status:
          pastEpoch?.completion_percentage === 100 ? 'completed' : 'expired',
        progress: pastEpoch?.completion_percentage ?? 0,
      } as const
    }

    if (index === (currentEpoch.id ?? 1) - 1) {
      // Current epoch
      return {
        status: 'in_progress' as const,
        progress: epochProgress?.completion_percentage ?? 0,
      }
    }

    // Future epochs
    return {
      status: 'locked' as const,
      progress: 0,
    }
  })

  return (
    <div className="space-y-8 text-foreground p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 border-none rounded-lg p-6 text-palette-neutral-900 shadow-pop-lg"
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
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-primary"
          >
            {user?.account?.label
              ? `Welcome back, ${user.account.label}!`
              : `Welcome!`}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-primary/70"
          >
            Are you ready to boost your Intuition?
          </motion.p>
        </div>
      </motion.div>
      <AuthCover
        buttonContainerClassName="h-full flex items-center justify-center"
        blurAmount="blur-none"
      >
        <AggregateIQ
          totalIQ={combinedTotal}
          epochProgress={epochProgress}
          rank={rankData?.rank}
          totalUsers={rankData?.totalUsers}
        />
      </AuthCover>
      <ChapterProgress
        title="Chapters"
        stages={stages}
        currentStageIndex={(currentEpoch?.id ?? 1) - 1}
      />
      <EarnSection quests={earnCards} />
    </div>
  )
}
