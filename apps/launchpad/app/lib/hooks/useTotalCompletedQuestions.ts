import { fetchTotalCompletedQuestions } from '@lib/services/questions'
import { usePrivy } from '@privy-io/react-auth'
import { useQuery } from '@tanstack/react-query'

export function useTotalCompletedQuestions() {
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address?.toLowerCase()

  return useQuery({
    queryKey: ['total-completed-questions', userWallet],
    queryFn: async () => {
      if (!userWallet) {
        return null
      }

      return fetchTotalCompletedQuestions(userWallet)
    },
    enabled: !!userWallet,
  })
}
