import { pointsClient } from '@lib/graphql/client'
import type { GetQuestionCompletionResponse } from '@lib/services/questions'
import { GetQuestionCompletionDocument } from '@lib/services/questions'
import type { LoaderFunctionArgs } from '@remix-run/node'

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
      GetQuestionCompletionDocument,
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
