import { gql } from 'graphql-request'

export interface Question {
  title: string
  description: string
  enabled: boolean
  point_award_amount: number
  id: string
}

export interface GetQuestionsResponse {
  questions: Question[]
}

export interface GetQuestionResponse {
  questions_by_pk: Question | null
}

export const GetQuestionsQuery = gql`
  query GetQuestions {
    questions {
      title
      description
      enabled
      point_award_amount
      id
    }
  }
`

export const GetQuestionQuery = gql`
  query GetQuestion($id: Int!) {
    questions_by_pk(id: $id) {
      title
      description
      enabled
      point_award_amount
      id
    }
  }
`
