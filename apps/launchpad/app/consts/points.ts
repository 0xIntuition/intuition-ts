export const CATEGORY_MAX_POINTS = {
  PORTAL: [10000, 30000, 60000, 105000, 135000],
  PROTOCOL: [3000, 10000, 25000, 60000, 100000],
  NFT: [50000, 750000, 2000000, 2750000, 3000000],
  COMMUNITY: [10000, 250000, 400000, 750000, 1450000],
  LAUNCHPAD: [
    15000, 35000, 50000, 80000, 100000, 130000, 160000, 190000, 230000, 270000,
    320000, 370000, 420000, 460000, 500000,
  ],
  RELIC: [50000, 750000, 2000000, 3000000, 4500000],
  SOCIAL: [10000, 25000, 40000, 75000, 145000],
}

export const calculateLevelProgress = (points: number, maxPoints: number[]) => {
  const currentLevel = maxPoints.findIndex((max) => points < max) + 1
  const isMaxLevel = currentLevel > maxPoints.length

  return {
    currentLevel: isMaxLevel ? maxPoints.length : currentLevel,
    isMaxLevel,
  }
}

export const calculateLevelProgressForIndex = (
  points: number,
  levelIndex: number,
  maxPoints: number[],
) => {
  const targetPoints = maxPoints[levelIndex]
  const prevLevelPoints = levelIndex > 0 ? maxPoints[levelIndex - 1] : 0

  // If we haven't reached this level's previous threshold, return 0
  if (points < prevLevelPoints) {
    return 0
  }

  // If we've exceeded this level's threshold, return 100
  if (points >= targetPoints) {
    return 100
  }

  // Calculate progress within this level
  return Math.min(
    Math.round(
      ((points - prevLevelPoints) / (targetPoints - prevLevelPoints)) * 100,
    ),
    100,
  )
}
