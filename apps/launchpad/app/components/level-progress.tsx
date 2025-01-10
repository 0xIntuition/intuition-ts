import {
  Card,
  CardContent,
  formatNumber,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { LockIcon } from '@components/skill-modal'
import { Play } from 'lucide-react'

interface Skill {
  name: string
  points: number
}

interface SkillLevel {
  name: string
  pointsThreshold: number
  asset?: string // Optional asset to show instead of roman numeral
}

interface LevelProgressProps {
  skill: Skill | null
  levels: SkillLevel[]
}

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI']

export function LevelProgress({ skill, levels }: LevelProgressProps) {
  if (!skill) {
    return null
  }

  const currentPoints = Math.floor(skill.points || 0)

  // Find current level based on points
  const currentLevel = levels.reduce((acc, level, index) => {
    if (currentPoints >= level.pointsThreshold) {
      return index
    }
    return acc
  }, -1)

  // Calculate progress percentage for current level
  const nextLevelThreshold = levels[currentLevel + 1]?.pointsThreshold
  const currentLevelThreshold = levels[currentLevel]?.pointsThreshold || 0
  const progressPercentage = nextLevelThreshold
    ? ((currentPoints - currentLevelThreshold) /
        (nextLevelThreshold - currentLevelThreshold)) *
      100
    : 100

  return (
    <Card className="rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] px-10 py-12">
      <CardContent className="space-y-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full primary-gradient-subtle" />
              <div>
                <div className="flex items-center gap-2">
                  <Text
                    variant="heading4"
                    weight="normal"
                    className="text-foreground"
                  >
                    Level {romanNumerals[currentLevel + 1]}:{' '}
                    {levels[currentLevel + 1]?.name}
                  </Text>
                </div>
                <Text
                  variant="headline"
                  weight="normal"
                  className="text-accent"
                >
                  {formatNumber(currentPoints, 1)} Points
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-1.5 h-6">
              <div className="relative h-full w-[263px] bg-gradient-to-b from-[#000000] to-[#FFFFFF]/10 rounded-full overflow-hidden p-0.5">
                <div className="bg-[#191919] rounded-full h-full w-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#017CC2] to-[#0F4BA5] transition-all duration-300 rounded-full"
                    style={{
                      width: `${Math.min(Math.max(progressPercentage, 0), 100)}%`,
                    }}
                  />
                  <Text className="absolute inset-0 flex items-center justify-end text-xs text-primary/50 pr-4">
                    {formatNumber(currentPoints - currentLevelThreshold, 1)} /{' '}
                    {formatNumber(
                      nextLevelThreshold - currentLevelThreshold,
                      1,
                    )}
                  </Text>
                </div>
              </div>
              <Play className="h-3 w-3 fill-primary/50 text-transparent" />
              <div className="primary-gradient-subtle rounded-full h-10 w-10 items-center justify-center flex">
                <Text
                  variant={TextVariant.headline}
                  className="font-serif text-primary/50"
                >
                  {romanNumerals[currentLevel + 1]}
                </Text>
              </div>
            </div>
          </div>

          {/* Level Progression */}
          <div className="flex justify-between items-center gap-4">
            {levels?.map((level, index) => (
              <>
                <div key={index} className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div
                      className={`
                        relative w-20 h-20 rounded-full flex items-center justify-center border-[6px] pointer-events-none primary-gradient-subtle
                        ${index <= currentLevel ? 'border-[#34c578]' : ''}
                        ${index === currentLevel + 1 ? 'border-[#191919]' : ''}
                        ${index > currentLevel + 1 ? 'border-[#191919]' : ''}
                      `}
                    >
                      {index <= currentLevel + 1 ? (
                        <Text
                          variant={TextVariant.heading3}
                          className="font-serif text-center"
                        >
                          {level.asset || romanNumerals[index]}
                        </Text>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full p-5">
                          <LockIcon />
                        </div>
                      )}
                    </div>
                    {index === currentLevel + 1 && (
                      <svg
                        className="absolute inset-0 w-20 h-20 -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          className="text-blue-500"
                          strokeWidth="6"
                          stroke="currentColor"
                          fill="transparent"
                          r="47"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${progressPercentage * 3.02} 302`}
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <Text
                      variant={TextVariant.body}
                      className="uppercase font-serif"
                    >
                      {level.name}
                    </Text>
                    <Text className="text-accent font-serif">
                      {formatNumber(level.pointsThreshold, 0)}
                    </Text>
                  </div>
                </div>
                {index < levels.length - 1 && (
                  <Play className="h-3 w-3 fill-primary/50 text-transparent" />
                )}
              </>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
