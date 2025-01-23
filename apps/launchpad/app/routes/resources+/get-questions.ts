import { pointsClient } from '@lib/graphql/client'
import type { GetQuestionsResponse } from '@lib/graphql/types'
import { GetQuestionsQuery } from '@lib/graphql/types'

export async function loader() {
  const data =
    await pointsClient.request<GetQuestionsResponse>(GetQuestionsQuery)

  return new Response(JSON.stringify({ questions: data.questions }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
