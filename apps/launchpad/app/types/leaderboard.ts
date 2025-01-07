export interface User {
  rank: number
  name: string
  score: number
  avatar: string
  level: number
}

export interface Category {
  id: string
  name: string
}

export interface LeaderboardData {
  [key: string]: User[]
}
