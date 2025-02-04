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
import { ErrorPage } from '@components/error-page'
import { ZERO_ADDRESS } from '@consts/general'
import { usePoints } from '@lib/hooks/usePoints'
import { useRelicPoints } from '@lib/hooks/useRelicPoints'
import { fetchPoints, fetchRelicPoints } from '@lib/services/points'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  const address = user?.wallet?.address?.toLowerCase()

  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  if (address) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['get-relic-points', { address }],
        queryFn: async () => {
          const response = await fetchRelicPoints(address.toLowerCase())
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-points', { address }],
        queryFn: async () => {
          const response = await fetchPoints(address.toLowerCase())
          return response
        },
      }),
      await queryClient.prefetchQuery({
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
  console.log('user', user)
  const { data: points } = usePoints(address)
  const { data: relicPoints } = useRelicPoints(address)
  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: address ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })

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

  const combinedTotal =
    (relicPoints?.totalPoints ?? 0) +
    (points?.totalPoints ?? 0) +
    protocolPointsTotal

  return (
    <div className="space-y-8 text-foreground p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 border-none bg-gradient-to-br from-[#060504] to-[#101010] rounded-lg p-6 text-palette-neutral-900 shadow-pop-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Avatar
            className="w-24 h-24"
            src={user?.account?.image ?? ''}
            name={user?.account?.label ?? ''}
          />
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Welcome back, {user?.account?.label}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg opacity-90"
          >
            Ready to boost your Intuition today?
          </motion.p>
        </div>
      </motion.div>
      <AggregateIQ totalIQ={combinedTotal} />
    </div>
  )
}
