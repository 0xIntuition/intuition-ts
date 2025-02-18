import { useQuery } from '@tanstack/react-query'

export interface QuestionCompletion {
  id: number
  completed_at: string
  points_awarded: number
  subject_id: number
}

export function useQuestionCompletion(accountId?: string, questionId?: number) {
  return useQuery({
    queryKey: ['question-completion', accountId?.toLowerCase(), questionId],
    queryFn: async () => {
      if (!accountId || !questionId) {
        return null
      }

      const response = await fetch(
        `/resources/get-question-completion?accountId=${accountId.toLowerCase()}&questionId=${questionId}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch question completion')
      }

      const data = await response.json()
      return data.completion as QuestionCompletion | null
    },
    enabled: !!accountId && !!questionId,
    staleTime: 30000, // Consider data fresh for 30 seconds
  })
}
