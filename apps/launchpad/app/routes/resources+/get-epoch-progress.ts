import { pointsClient } from '@lib/graphql/client'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'graphql-request'

export interface EpochProgress {
  completion_percentage: number
  completed_count: number
  total_count: number
  total_points: number
}

interface GetEpochProgressResponse {
  epoch_completions_aggregate: {
    aggregate: {
      count: number
      sum: {
        points_awarded: number
      }
    }
  }
  epoch_questions_aggregate: {
    aggregate: {
      count: number
    }
  }
}

const GetEpochProgressQuery = gql`
  query GetEpochProgress($accountId: String!, $epochId: Int!) {
    epoch_completions_aggregate(
      where: { account_id: { _eq: $accountId }, epoch_id: { _eq: $epochId } }
    ) {
      aggregate {
        count
        sum {
          points_awarded
        }
      }
    }
    epoch_questions_aggregate(where: { epoch_id: { _eq: $epochId } }) {
      aggregate {
        count
      }
    }
  }
`

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const accountId = url.searchParams.get('accountId')
  const epochId = url.searchParams.get('epochId')

  if (!accountId || !epochId) {
    return new Response(JSON.stringify({ progress: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await pointsClient.request<GetEpochProgressResponse>(
      GetEpochProgressQuery,
      {
        accountId,
        epochId: parseInt(epochId, 10),
      },
    )

    const totalQuestions = data.epoch_questions_aggregate.aggregate.count
    const completedQuestions = data.epoch_completions_aggregate.aggregate.count
    const totalPoints =
      data.epoch_completions_aggregate.aggregate.sum?.points_awarded ?? 0

    const progress: EpochProgress = {
      completion_percentage:
        totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0,
      completed_count: completedQuestions,
      total_count: totalQuestions,
      total_points: totalPoints,
    }

    return new Response(JSON.stringify({ progress }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch epoch progress',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
