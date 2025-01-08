export interface Skill {
  name: string
  level: number
  progress: number
  pointsToNext: number
  points: number
  description: string
  recentAchievement: string
  currentPoints?: number
  requiredPoints?: number
}

export interface SkillLevel {
  name: string
  asset: string
  pointsThreshold: number
}

export interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
  levels: SkillLevel[]
}
