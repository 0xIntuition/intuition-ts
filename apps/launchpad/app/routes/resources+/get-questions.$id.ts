import { pointsClient } from '@lib/graphql/client'
import type { GetQuestionResponse } from '@lib/graphql/types'
import { GetQuestionQuery } from '@lib/graphql/types'
import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
  const questionId = params.id

  if (!questionId) {
    throw new Error('Question ID is required')
  }

  const data = await pointsClient.request<GetQuestionResponse>(
    GetQuestionQuery,
    {
      id: parseInt(questionId, 10),
    },
  )

  logger('Question data:', data)

  return new Response(JSON.stringify({ question: data.questions_by_pk }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
