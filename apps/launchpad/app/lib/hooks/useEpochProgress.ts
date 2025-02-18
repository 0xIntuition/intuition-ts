import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { EpochProgress } from '@routes/resources+/get-epoch-progress'
import { useQuery } from '@tanstack/react-query'

export function useEpochProgress(epochId?: number) {
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address?.toLowerCase()

  return useQuery({
    queryKey: ['epoch-progress', userWallet, epochId],
    queryFn: async () => {
      if (!userWallet || !epochId) {
        return null
      }

      try {
        const response = await fetch(
          `/resources/get-epoch-progress?accountId=${userWallet}&epochId=${epochId}`,
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch epoch progress')
        }

        return data.progress as EpochProgress
      } catch (error) {
        logger('Error fetching epoch progress:', error)
        return null
      }
    },
    enabled: !!userWallet && !!epochId,
  })
}
