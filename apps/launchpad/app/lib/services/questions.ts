export interface Question {
  id: number
  epoch_id: number
  title: string
  description: string
  enabled: boolean
  point_award_amount: number
  link: string
  predicate_id: number
  object_id: number
}

export interface GetQuestionsResponse {
  questions: Question[]
}

export interface GetQuestionResponse {
  questions_by_pk: Question | null
}

export const GetTotalCompletedQuestionsDocument = `
  query GetTotalCompletedQuestions($accountId: String!) {
    epoch_completions_aggregate(where: { account_id: { _eq: $accountId } }) {
      aggregate {
        count
      }
    }
  }
`

export interface GetTotalCompletedQuestionsQuery {
  epoch_completions_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export interface GetTotalCompletedQuestionsQueryVariables {
  accountId: string
}

export interface TotalCompletedQuestions {
  count: number
}

export async function fetchTotalCompletedQuestions(
  address: string,
): Promise<TotalCompletedQuestions> {
  const response = await fetch(
    `/resources/get-total-completed-questions?accountId=${address.toLowerCase()}`,
  )
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch total completed questions')
  }

  return data
}

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('/resources/get-questions')
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch questions')
  }

  return data.questions ?? []
}

export async function fetchQuestion(id: number): Promise<Question | null> {
  const response = await fetch(`/resources/get-questions/${id}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch question')
  }

  return data.question
}
