export interface LevelRange {
  level: number
  min: number
  max: number
}

export const LEVEL_RANGES: LevelRange[] = [
  { level: 1, min: 0, max: 5000 },
  { level: 2, min: 5001, max: 15000 },
  { level: 3, min: 15001, max: 30000 },
  { level: 4, min: 30001, max: 50000 },
  { level: 5, min: 50001, max: 100000 },
  { level: 6, min: 100001, max: 200000 },
  { level: 7, min: 200001, max: 300000 },
  { level: 8, min: 300001, max: 500000 },
  { level: 9, min: 500001, max: 750000 },
  { level: 10, min: 750001, max: 1000000 },
  { level: 11, min: 1000001, max: 1500000 },
  { level: 12, min: 1500001, max: 2000000 },
  { level: 13, min: 2000001, max: 2500000 },
  { level: 14, min: 2500001, max: 3000000 },
  { level: 15, min: 3000001, max: 3500000 },
  { level: 16, min: 3500001, max: 4000000 },
  { level: 17, min: 4000001, max: 4500000 },
  { level: 18, min: 4500001, max: 5000000 },
  { level: 19, min: 5000001, max: 5500000 },
  { level: 20, min: 5500001, max: 6198500 },
]

export function calculateLevelAndProgress(points: number): {
  level: number
  progress: number
} {
  const currentRange =
    LEVEL_RANGES.find((range) => points >= range.min && points <= range.max) ||
    LEVEL_RANGES[LEVEL_RANGES.length - 1]

  const progress = Math.min(
    ((points - currentRange.min) / (currentRange.max - currentRange.min)) * 100,
    100,
  )

  return {
    level: currentRange.level,
    progress: Math.round(progress),
  }
}
