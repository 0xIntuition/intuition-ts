import { pointsClient } from '@lib/graphql/client'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'graphql-request'

interface EpochCompletion {
  id: number
  completed_at: string
  points_awarded: number
  subject_id: number
}

interface GetQuestionCompletionResponse {
  epoch_completions: EpochCompletion[]
}

const GetQuestionCompletionQuery = gql`
  query GetQuestionCompletion($accountId: String!, $questionId: Int!) {
    epoch_completions(
      where: {
        account_id: { _eq: $accountId }
        question_id: { _eq: $questionId }
      }
    ) {
      id
      completed_at
      points_awarded
      subject_id
    }
  }
`

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const accountId = url.searchParams.get('accountId')
  const questionId = url.searchParams.get('questionId')

  if (!accountId || !questionId) {
    return new Response(JSON.stringify({ completion: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await pointsClient.request<GetQuestionCompletionResponse>(
      GetQuestionCompletionQuery,
      {
        accountId,
        questionId: parseInt(questionId, 10),
      },
    )

    return new Response(
      JSON.stringify({ completion: data.epoch_completions[0] ?? null }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch question completion',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
