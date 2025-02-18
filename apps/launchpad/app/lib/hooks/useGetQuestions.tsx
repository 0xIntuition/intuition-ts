import logger from '@lib/utils/logger'
import { useQuery } from '@tanstack/react-query'

export function useGetQuestions(epochId?: number) {
  return useQuery({
    queryKey: ['get-questions', epochId],
    queryFn: async () => {
      try {
        const response = await fetch(
          epochId
            ? `/resources/get-questions?epochId=${epochId}`
            : '/resources/get-questions',
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch questions')
        }

        return data.questions
      } catch (error) {
        logger('Error fetching questions:', error)
        return []
      }
    },
    enabled: true,
    // This ensures we don't refetch on mount if we already have the data
    staleTime: 30000, // Consider data fresh for 30 seconds
  })
}
