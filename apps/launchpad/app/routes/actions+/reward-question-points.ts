import { invariant } from '@lib/utils/misc'
import type { ActionFunctionArgs } from '@remix-run/node'
import { gql, GraphQLClient } from 'graphql-request'

interface EpochCompletion {
  account_id: string
  question_id: number
  epoch_id: number
  points_awarded: number
  subject_id: number
}

interface InsertEpochCompletionResponse {
  insert_epoch_completions_one: {
    account_id: string
  }
}

const api_url = process.env.HASURA_POINTS_ENDPOINT
const client = new GraphQLClient(api_url!, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_POINTS_SECRET as string,
  },
})

const InsertEpochCompletionMutation = gql`
  mutation InsertEpochCompletion($object: epoch_completions_insert_input = {}) {
    insert_epoch_completions_one(object: $object) {
      account_id
    }
  }
`

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.formData()
  const accountId = formData.get('accountId')
  const questionId = formData.get('questionId')
  const epochId = formData.get('epochId')
  const pointAwardAmount = formData.get('pointAwardAmount')
  const subjectId = formData.get('subjectId')

  invariant(accountId, 'accountId is required')
  invariant(questionId, 'questionId is required')
  invariant(epochId, 'epochId is required')
  invariant(pointAwardAmount, 'pointAwardAmount is required')
  invariant(subjectId, 'subjectId is required')
  invariant(typeof accountId === 'string', 'accountId must be a string')
  invariant(typeof questionId === 'string', 'questionId must be a string')
  invariant(typeof epochId === 'string', 'epochId must be a string')
  invariant(
    typeof pointAwardAmount === 'string',
    'pointAwardAmount must be a string',
  )
  invariant(typeof subjectId === 'string', 'subjectId must be a string')

  const completion: EpochCompletion = {
    account_id: accountId,
    question_id: parseInt(questionId, 10),
    epoch_id: parseInt(epochId, 10),
    points_awarded: parseInt(pointAwardAmount, 10),
    subject_id: parseInt(subjectId, 10),
  }

  try {
    const result = await client.request<InsertEpochCompletionResponse>(
      InsertEpochCompletionMutation,
      {
        object: completion,
      },
    )

    return { success: true, data: result }
  } catch (error) {
    if (error instanceof Response) {
      throw error
    }
    return { success: false, error: 'Failed to record completion' }
  }
}
