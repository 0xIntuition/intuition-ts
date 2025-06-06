import { Question } from '@lib/services/questions'

export interface Epoch {
  id: number
  name: string
  description: string
  questions: Question[]
  total_points: number
  start_date: string
  end_date: string
  is_active: boolean
  type?: string
  progress?: {
    completed_count: number
    total_points: number
  }
}
