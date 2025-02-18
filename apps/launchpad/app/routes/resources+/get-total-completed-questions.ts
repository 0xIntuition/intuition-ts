import { pointsClient } from '@lib/graphql/client'
import {
  GetTotalCompletedQuestionsDocument,
  GetTotalCompletedQuestionsQuery,
  GetTotalCompletedQuestionsQueryVariables,
  TotalCompletedQuestions,
} from '@lib/services/questions'
import { json } from '@remix-run/node'

export type { TotalCompletedQuestions as GetTotalCompletedQuestionsResponse }

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const accountId = url.searchParams.get('accountId')

  if (!accountId) {
    throw new Error('Account ID is required')
  }

  try {
    const response = await pointsClient.request<
      GetTotalCompletedQuestionsQuery,
      GetTotalCompletedQuestionsQueryVariables
    >(GetTotalCompletedQuestionsDocument, {
      accountId: accountId.toLowerCase(),
    })

    return json({
      count: response.epoch_completions_aggregate.aggregate.count,
    })
  } catch (error) {
    console.error('Error fetching total completed questions:', error)
    throw new Error('Failed to fetch total completed questions')
  }
}
