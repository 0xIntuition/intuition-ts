import { pointsClient } from '@lib/graphql/client'
import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'graphql-request'

interface Question {
  id: number
  epoch_id: number
  title: string
  description: string
  point_award_amount: number
  enabled: boolean
  order: number
  link: string
  predicate_id: number
  object_id: number
  created_at: string
  tag_object_id?: number
}

interface GetQuestionsResponse {
  epoch_questions: Question[]
}

interface GetQuestionsVariables {
  where?: {
    epoch_id?: { _eq: number }
  }
}

const GetQuestionsQuery = gql`
  query GetQuestions($where: epoch_questions_bool_exp) {
    epoch_questions(where: $where, order_by: { order: asc }) {
      id
      epoch_id
      title
      description
      point_award_amount
      enabled
      order
      link
      predicate_id
      object_id
      created_at
      tag_object_id
    }
  }
`

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const epochId = url.searchParams.get('epochId')

  try {
    logger(
      'Fetching questions',
      epochId ? `for epoch ${epochId}` : 'for all epochs',
    )

    const variables: GetQuestionsVariables = {}
    if (epochId) {
      variables.where = {
        epoch_id: { _eq: Number(epochId) },
      }
    }

    const data = await pointsClient.request<
      GetQuestionsResponse,
      GetQuestionsVariables
    >(GetQuestionsQuery, variables)

    return new Response(
      JSON.stringify({ epoch_questions: data.epoch_questions }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
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
