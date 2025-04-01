import { useAtomsWithTagsQuery } from '@lib/graphql'
import { WHITELISTED_ADDRESSES } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useQuery } from '@tanstack/react-query'

const VERIFICATION_ADDRESS = '0x6877daca5e6934982a5c511d85bf12a71a25ac1d'

interface UseQuestionDataProps {
  questionId: number
}

export function useEcosystemQuestionData({ questionId }: UseQuestionDataProps) {
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address?.toLowerCase() ?? ''

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
    enabled: !!currentEpoch,
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
  const tagObjectId = questionData?.tag_object_id
  const { data: atomsData, isLoading: isLoadingAtoms } = useAtomsWithTagsQuery(
    {
      limit: 1000,
      where: {
        _and: [
          {
            as_subject_triples: {
              predicate_id: { _eq: predicateId },
              object_id: { _eq: objectId },
            },
          },
          {
            _or: [
              {
                as_subject_triples: {
                  predicate_id: { _eq: predicateId },
                  object_id: { _eq: objectId },
                  vault: {
                    positions: {
                      account: {
                        id: {
                          _in: WHITELISTED_ADDRESSES,
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
          tagObjectId
            ? {
                as_subject_triples: {
                  object: {
                    vault_id: { _in: [tagObjectId] },
                  },
                },
              }
            : {},
        ],
      },
      tagPredicateIds: [predicateId], // dev - has tag predicate ID
      orderBy: { vault: { total_shares: 'desc' } },
      userPositionAddress: userWallet,
      verifiedPositionAddress: VERIFICATION_ADDRESS,
    },
    {
      enabled: !!questionData && !!predicateId && !!objectId,
      queryKey: [
        'AtomsWithTags',
        // userWallet,
        VERIFICATION_ADDRESS,
        predicateId,
        objectId,
        tagObjectId,
      ],
    },
  )

  const totalUsers =
    atomsData?.atoms?.reduce(
      (sum, atom) =>
        sum + Number(atom.vault?.positions_aggregate?.aggregate?.count ?? 0),
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
    atomsData,
    atoms: atomsData?.total.aggregate?.count ?? 0,
    totalUsers,
    predicateId: questionData?.predicate_id,
    objectId: questionData?.object_id,
    order: questionData?.order,
    isLoading:
      isLoadingQuestion ||
      isLoadingEpoch ||
      isLoadingCompletion ||
      isLoadingAtoms,
  }
}
