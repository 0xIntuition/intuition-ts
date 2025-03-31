import { pointsClient } from '@lib/graphql/client'
import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'graphql-request'

interface Question {
  id: number
  title: string
  description: string
  point_award_amount: number
  enabled: boolean
  order: number
  link: string
  predicate_id: number
  object_id: number
  created_at: string
  tag_object_id: number
}

interface GetQuestionResponse {
  epoch_questions: Question[]
}

const GetQuestionQuery = gql`
  query GetQuestion($id: Int!) {
    epoch_questions(where: { id: { _eq: $id } }, limit: 1) {
      id
      title
      description
      point_award_amount
      enabled
      order
      link
      epoch_id
      predicate_id
      object_id
      created_at
      tag_object_id
    }
  }
`

export async function loader({ params }: LoaderFunctionArgs) {
  const questionId = params.id

  if (!questionId) {
    throw new Error('Question ID is required')
  }

  try {
    const data = await pointsClient.request<GetQuestionResponse>(
      GetQuestionQuery,
      {
        id: parseInt(questionId, 10),
      },
    )

    if (!data.epoch_questions?.[0]) {
      logger('Question not found for ID:', questionId)
      return new Response(
        JSON.stringify({
          error: 'Question not found',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify({ question: data.epoch_questions[0] }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    logger('Error fetching question:', error)
    if (error instanceof Error) {
      logger('Error details:', error.message)
      if ('response' in error) {
        logger('GraphQL response:', JSON.stringify(error.response, null, 2))
      }
    }
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch question',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
