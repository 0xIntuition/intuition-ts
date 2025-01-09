import { Button, Card, CardContent, Progress } from '@0xintuition/1ui'

import { Lock, Pause } from 'lucide-react'

export const LevelTier = {
  NOVICE: 'NOVICE',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT',
} as const

export type LevelTierType = keyof typeof LevelTier

export interface LevelProgress {
  currentLevel: number
  tier: LevelTierType
  points: number
  requiredPoints: number
  currentPoints: number
}

interface LevelProgressProps {
  progress: LevelProgress
}

export function LevelProgress({ progress }: LevelProgressProps) {
  const progressPercentage =
    (progress.currentPoints / progress.requiredPoints) * 100

  return (
    <Card className="bg-background/5 border-border/10">
      <CardContent className="space-y-8 pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-background/10" />
                <h3 className="text-lg font-medium">
                  LEVEL {progress.currentLevel}: {progress.tier}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {progress.points.toLocaleString()} Points
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-sm">
                  {progress.currentPoints.toLocaleString()}
                </span>
                <span className="text-xs">/</span>
                <span className="text-sm">
                  {progress.requiredPoints.toLocaleString()}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Pause className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2 text-center">
              <div
                className={`mx-auto flex aspect-square w-16 items-center justify-center rounded-full border text-lg font-medium transition-colors
                  ${
                    i <= progress.currentLevel - 1
                      ? 'border-primary bg-primary text-primary-foreground'
                      : i === progress.currentLevel
                        ? 'border-primary/50 bg-background/10 text-primary/50'
                        : 'border-border/10 bg-background/5'
                  }`}
              >
                {i <= progress.currentLevel - 1 ? (
                  <span>{i + 1}</span>
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-muted-foreground">
                  NOVICE
                </div>
                <div className="text-xs text-muted-foreground">25K</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
