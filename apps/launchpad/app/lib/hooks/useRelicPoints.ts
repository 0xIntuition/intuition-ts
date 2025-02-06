import logger from '@lib/utils/logger'
import { useQuery } from '@tanstack/react-query'

export function useRelicPoints(address?: string) {
  return useQuery({
    queryKey: ['get-relic-points', address?.toLowerCase()],
    queryFn: async () => {
      if (!address) {
        return null
      }

      try {
        const response = await fetch(
          `/resources/get-relic-points?address=${address.toLowerCase()}`,
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch relic points')
        }

        return data.points
      } catch (error) {
        logger('Error fetching relic points:', error)
        return null
      }
    },
    enabled: !!address,
  })
}
