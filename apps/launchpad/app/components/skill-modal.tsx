import { Dialog, DialogContent, Progress } from '@0xintuition/1ui'

import { Skill, SkillLevel } from 'app/types/rewards'

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
  levels: SkillLevel[]
}

export function SkillModal({
  skill,
  isOpen,
  onClose,
  levels,
}: SkillModalProps) {
  if (!skill) {
    return null
  }

  const currentPoints = Math.floor(skill.points || 0)
  const maxPoints = Math.max(
    ...(levels?.map((level) => level.pointsThreshold) || [0]),
  )
  const progress = (currentPoints / maxPoints) * 100

  const currentLevel = levels
    ? levels.findIndex((level) => currentPoints < level.pointsThreshold) - 1
    : -1
  const nextLevel = Math.min(currentLevel + 1, levels ? levels.length - 1 : 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-black text-white border-gray-800">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-800" />
            <div>
              <h2 className="text-2xl font-bold">{skill.name}</h2>
              <p className="text-dune-copper">
                {currentPoints.toLocaleString()} Points
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-gray-800" />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentPoints.toLocaleString()}</span>
              <span>{maxPoints.toLocaleString()}</span>
            </div>
          </div>

          {/* Level Progression */}
          <div className="flex justify-between items-center pt-4">
            {levels?.map((level, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`
                  relative w-16 h-16 rounded-full flex items-center justify-center
                  ${index <= currentLevel ? 'ring-2 ring-green-500' : ''}
                  ${index === nextLevel ? 'ring-2 ring-blue-500' : ''}
                  ${index > nextLevel ? 'bg-gray-800' : 'bg-gray-900'}
                `}
                >
                  {index <= nextLevel ? (
                    <span className="text-2xl font-bold">{level.asset}</span>
                  ) : (
                    <span className="text-gray-600">🔒</span>
                  )}
                  {index === nextLevel && (
                    <div
                      className="absolute inset-0 rounded-full border-4 border-blue-500"
                      style={{
                        clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`,
                      }}
                    />
                  )}
                </div>
                <span className="text-sm font-medium">{level.name}</span>
                <span className="text-sm text-dune-copper">
                  {level.pointsThreshold.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
