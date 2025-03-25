import { useGetListDetailsQuery } from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useQuery } from '@tanstack/react-query'

interface UseQuestionDataProps {
  questionId: number
}

export function useQuestionData({ questionId }: UseQuestionDataProps) {
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address?.toLowerCase()

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

  const { data: questionData, isLoading: isLoadingQuestion } = useQuery({
    queryKey: ['epoch-question', questionId],
    queryFn: async () => {
      try {
        const response = await fetch(`/resources/get-questions/${questionId}`)
        const data = await response.json()

        if (!response.ok) {
          logger('Error response from server:', data)
          throw new Error(data.error || 'Failed to fetch question')
        }

        return data.question
      } catch (error) {
        logger('Error in useQuestionData:', error)
        if (error instanceof Error) {
          logger('Error details:', error.message)
        }
        throw error
      }
    },
    enabled: true,
  })

  const { data: completionData, isLoading: isLoadingCompletion } = useQuery({
    queryKey: ['question-completion', userWallet, questionId],
    queryFn: async () => {
      const response = await fetch(
        `/resources/get-question-completion?accountId=${userWallet}&questionId=${questionId}`,
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch question completion')
      }

      return data.completion
    },
    enabled: !!userWallet && !!questionId,
  })

  const predicateId = questionData?.predicate_id
  const objectId = questionData?.object_id

  const { data: listData, isLoading: isLoadingList } = useGetListDetailsQuery(
    {
      tagPredicateId: predicateId?.toString(),
      globalWhere: {
        predicate_id: {
          _eq: predicateId,
        },
        object_id: {
          _eq: objectId,
        },
      },
    },
    {
      queryKey: ['get-list-details', { predicateId, objectId }],
      enabled: !!questionData && !!predicateId && !!objectId,
    },
  )

  const totalUsers =
    listData?.globalTriples?.reduce(
      (sum, triple) =>
        sum + Number(triple.vault?.positions_aggregate?.aggregate?.count ?? 0),
      0,
    ) ?? 0

  return {
    title: questionData?.title ?? 'Question',
    description: questionData?.description ?? '',
    enabled: questionData?.enabled ?? false,
    pointAwardAmount: questionData?.point_award_amount ?? 0,
    isCompleted: !!completionData,
    completedAt: completionData?.completed_at,
    isQuestionActive: questionData?.enabled,
    isEpochActive: currentEpoch?.is_active,
    epochId: questionData?.epoch_id,
    currentEpoch,
    listData,
    atoms: listData?.globalTriplesAggregate?.aggregate?.count ?? 0,
    totalUsers,
    predicateId: questionData?.predicate_id,
    objectId: questionData?.object_id,
    order: questionData?.order,
    isLoading:
      isLoadingQuestion ||
      isLoadingEpoch ||
      isLoadingCompletion ||
      isLoadingList,
  }
}
