import { useQuery } from '@tanstack/react-query'

import type { Question } from '../services/questions'

export function useGetQuestions(epochId?: number) {
  return useQuery<Question[]>({
    queryKey: epochId ? ['get-questions', epochId] : ['get-questions'],
    queryFn: async () => {
      const url = epochId
        ? `/resources/get-questions?epochId=${epochId}`
        : '/resources/get-questions'
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch questions')
      }
      return data.questions
    },
  })
}
