import { useGetListDetailsQuery } from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { useQuery } from '@tanstack/react-query'

interface UseQuestionDataProps {
  questionId: number
}

export function useQuestionData({ questionId }: UseQuestionDataProps) {
  const { data: listData, isLoading: isLoadingList } = useGetListDetailsQuery(
    {
      tagPredicateId: 3,
      globalWhere: {
        predicate_id: {
          _eq: 3,
        },
        object_id: {
          _eq: 620,
        },
      },
    },
    {
      queryKey: ['get-list-details', { predicateId: 3, objectId: 620 }],
    },
  )

  const { data: questionData, isLoading: isLoadingQuestion } = useQuery({
    queryKey: ['question', questionId],
    queryFn: async () => {
      const response = await fetch(`/resources/get-questions/${questionId}`)
      const data = await response.json()
      logger('Raw question response:', data)
      return data.question
    },
  })

  const totalUsers =
    listData?.globalTriples?.reduce(
      (sum, triple) =>
        sum + Number(triple.vault?.positions_aggregate?.aggregate?.count ?? 0),
      0,
    ) ?? 0

  logger('List data:', listData)
  logger('Question data:', questionData)

  return {
    title: questionData?.title ?? 'Question',
    description: questionData?.description ?? '',
    enabled: questionData?.enabled ?? false,
    pointAwardAmount: questionData?.point_award_amount ?? 0,
    atoms: listData?.globalTriplesAggregate?.aggregate?.count ?? 0,
    totalUsers,
    isLoading: isLoadingList || isLoadingQuestion,
  }
}
