import { pointsClient } from '@lib/graphql/client'
import logger from '@lib/utils/logger'
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
}

interface GetQuestionsResponse {
  epoch_questions: Question[]
}

const GetQuestionsQuery = gql`
  query GetQuestions {
    epoch_questions(order_by: { order: asc }) {
      id
      title
      description
      point_award_amount
      enabled
      order
      link
      predicate_id
      object_id
      created_at
    }
  }
`

export async function loader() {
  try {
    logger('Fetching all questions')
    const data =
      await pointsClient.request<GetQuestionsResponse>(GetQuestionsQuery)
    logger('Questions response:', data)

    return new Response(JSON.stringify({ questions: data.epoch_questions }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    logger('Error fetching questions:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
