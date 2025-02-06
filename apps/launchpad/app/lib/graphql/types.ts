import { gql } from 'graphql-request'

export interface Question {
  id: number
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

const QuestionFields = gql`
  fragment QuestionFields on questions {
    id
    title
    description
    link
    enabled
    point_award_amount
    predicate_id
    object_id
  }
`

export const GetQuestionsQuery = gql`
  ${QuestionFields}
  query GetQuestions {
    questions {
      ...QuestionFields
    }
  }
`

export const GetQuestionQuery = gql`
  ${QuestionFields}
  query GetQuestion($id: Int!) {
    questions_by_pk(id: $id) {
      ...QuestionFields
    }
  }
`
