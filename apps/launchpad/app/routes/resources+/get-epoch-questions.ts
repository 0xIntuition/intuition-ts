import { pointsClient } from '@lib/graphql/client'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'graphql-request'

interface EpochQuestion {
  id: number
  epoch_id: number
  title: string
  description: string
  point_award_amount: number
  enabled: boolean
  order: number
  tag_object_id: number
}

interface GetEpochQuestionsResponse {
  epoch_questions: EpochQuestion[]
}

const GetEpochQuestionsQuery = gql`
  query GetEpochQuestions($epochId: Int!) {
    epoch_questions(
      where: { epoch_id: { _eq: $epochId } }
      order_by: { order: asc }
    ) {
      id
      title
      description
      point_award_amount
      enabled
      order
      epoch_id
      tag_object_id
    }
  }
`

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const epochId = url.searchParams.get('epochId')

  if (!epochId) {
    return new Response(JSON.stringify({ questions: [] }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await pointsClient.request<GetEpochQuestionsResponse>(
      GetEpochQuestionsQuery,
      { epochId: parseInt(epochId, 10) },
    )

    return new Response(JSON.stringify({ questions: data.epoch_questions }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch epoch questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
