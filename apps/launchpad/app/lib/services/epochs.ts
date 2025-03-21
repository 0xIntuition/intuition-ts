import logger from '@lib/utils/logger'
import { gql } from 'graphql-request'

import { pointsClient } from '../graphql/client'

export interface Epoch {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  order: number
  total_points: number
}

export interface GetCurrentEpochResponse {
  epochs: Epoch[]
}

export interface EpochQuestion {
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
  tag_object_id?: number | null
}

export interface GetEpochQuestionsResponse {
  epoch_questions: EpochQuestion[]
}

export interface GetEpochQuestionResponse {
  epoch_questions_by_pk: EpochQuestion | null
}

export interface EpochCompletion {
  id: number
  account_id: string
  epoch_id: number
  question_id: number
  points_awarded: number
  completed_at: string
  subject_id: number
}

export interface GetQuestionCompletionResponse {
  epoch_completions: EpochCompletion[]
}

const GetCurrentEpochQuery = gql`
  query GetCurrentEpoch {
    epochs(where: { is_active: { _eq: true } }, limit: 1) {
      id
      name
      description
      start_date
      end_date
      is_active
      created_at
      updated_at
      total_points
    }
  }
`

const GetEpochQuestionsQuery = gql`
  query GetEpochQuestions($epochId: Int!) {
    epoch_questions(
      where: { epoch_id: { _eq: $epochId } }
      order_by: { order: asc }
    ) {
      id
      epoch_id
      title
      description
      point_award_amount
      enabled
      order
      link
      predicate_id
    }
  }
`

const GetEpochQuestionQuery = gql`
  query GetEpochQuestion($id: Int!) {
    epoch_questions_by_pk(id: $id) {
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
      tag_object_id
    }
  }
`

const GetQuestionCompletionQuery = gql`
  query GetQuestionCompletion($accountId: String!, $questionId: Int!) {
    epoch_completions(
      where: {
        account_id: { _eq: $accountId }
        question_id: { _eq: $questionId }
      }
    ) {
      id
      account_id
      epoch_id
      question_id
      points_awarded
      completed_at
      subject_id
    }
  }
`

const GetEpochByIdQuery = gql`
  query GetEpochById($epochId: Int!) {
    epochs(where: { id: { _eq: $epochId } }, limit: 1) {
      id
      name
      description
      order
      start_date
      end_date
      is_active
      created_at
      updated_at
      total_points
    }
  }
`

export async function fetchCurrentEpoch(): Promise<Epoch | null> {
  try {
    const data =
      await pointsClient.request<GetCurrentEpochResponse>(GetCurrentEpochQuery)
    return data.epochs[0] ?? null
  } catch (error) {
    logger('Error fetching current epoch:', error)
    logger('GraphQL Query:', GetCurrentEpochQuery)
    throw error
  }
}

export async function fetchEpochQuestions(
  epochId: number,
): Promise<EpochQuestion[]> {
  try {
    const data = await pointsClient.request<GetEpochQuestionsResponse>(
      GetEpochQuestionsQuery,
      { epochId },
    )
    return data.epoch_questions
  } catch (error) {
    logger('Error fetching epoch questions:', error)
    throw error
  }
}

export async function fetchEpochQuestion(
  id: number,
): Promise<EpochQuestion | null> {
  try {
    const data = await pointsClient.request<GetEpochQuestionResponse>(
      GetEpochQuestionQuery,
      { id },
    )
    return data.epoch_questions_by_pk
  } catch (error) {
    logger('Error fetching epoch question:', error)
    throw error
  }
}

export async function fetchQuestionCompletion(
  accountId: string,
  questionId: number,
): Promise<EpochCompletion | null> {
  try {
    const data = await pointsClient.request<GetQuestionCompletionResponse>(
      GetQuestionCompletionQuery,
      { accountId, questionId },
    )
    return data.epoch_completions[0] ?? null
  } catch (error) {
    logger('Error fetching question completion:', error)
    throw error
  }
}

export async function fetchEpochById(epochId: number): Promise<Epoch | null> {
  try {
    const data = await pointsClient.request<GetCurrentEpochResponse>(
      GetEpochByIdQuery,
      {
        epochId,
      },
    )
    return data.epochs[0] ?? null
  } catch (error) {
    logger('Error fetching epoch by ID:', error)
    logger('GraphQL Query:', GetEpochByIdQuery)
    throw error
  }
}
