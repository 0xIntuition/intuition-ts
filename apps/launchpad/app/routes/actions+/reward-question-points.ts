import logger from '@lib/utils/logger'
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

interface GetExistingCompletionResponse {
  epoch_completions: Array<{ id: number }>
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

// Check if completion already exists to prevent duplicates
const GetExistingCompletionQuery = gql`
  query GetExistingCompletion(
    $accountId: String!
    $questionId: Int!
    $epochId: Int!
  ) {
    epoch_completions(
      where: {
        account_id: { _eq: $accountId }
        question_id: { _eq: $questionId }
        epoch_id: { _eq: $epochId }
      }
    ) {
      id
    }
  }
`

export async function action({ request }: ActionFunctionArgs) {
  const logContext = {
    method: request.method,
    url: request.url,
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.formData()
  const accountId = formData.get('accountId')
  const questionId = formData.get('questionId')
  const epochId = formData.get('epochId')
  const pointAwardAmount = formData.get('pointAwardAmount')
  const subjectId = formData.get('subjectId')

  Object.assign(logContext, {
    accountId,
    questionId,
    epochId,
    pointAwardAmount,
    subjectId,
  })

  try {
    // Validate all required fields
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

    const parsedQuestionId = parseInt(questionId, 10)
    const parsedEpochId = parseInt(epochId, 10)
    const parsedPointAwardAmount = parseInt(pointAwardAmount, 10)
    const parsedSubjectId = parseInt(subjectId, 10)

    // Check for NaN values
    if (
      isNaN(parsedQuestionId) ||
      isNaN(parsedEpochId) ||
      isNaN(parsedPointAwardAmount) ||
      isNaN(parsedSubjectId)
    ) {
      logger('Invalid numeric values:', logContext)
      throw new Error('Invalid numeric values provided')
    }

    // Check for existing completion
    const existingCompletion =
      await client.request<GetExistingCompletionResponse>(
        GetExistingCompletionQuery,
        {
          accountId,
          questionId: parsedQuestionId,
          epochId: parsedEpochId,
        },
      )

    if (existingCompletion.epoch_completions.length > 0) {
      logger('Points already awarded:', {
        ...logContext,
        existing: existingCompletion.epoch_completions[0],
      })
      return { success: true, data: existingCompletion.epoch_completions[0] }
    }

    const completion: EpochCompletion = {
      account_id: accountId,
      question_id: parsedQuestionId,
      epoch_id: parsedEpochId,
      points_awarded: parsedPointAwardAmount,
      subject_id: parsedSubjectId,
    }

    const result = await client.request<InsertEpochCompletionResponse>(
      InsertEpochCompletionMutation,
      {
        object: completion,
      },
    )

    logger('Points awarded successfully:', { ...logContext, result })
    return { success: true, data: result }
  } catch (error) {
    logger('Error in reward-question-points:', {
      ...logContext,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        details:
          error instanceof Response ? await error.text() : error.toString(),
      }
    }

    return {
      success: false,
      error: 'Failed to record completion',
      details: 'Unknown error occurred',
    }
  }
}
