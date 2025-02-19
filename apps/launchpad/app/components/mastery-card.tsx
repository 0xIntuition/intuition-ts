import { cn } from '@0xintuition/1ui'

import { CheckCircle, Lock } from 'lucide-react'

interface MasteryCardProps {
  title: string
  progress: number
  maxProgress: number
  isLocked?: boolean
  isSelected?: boolean
  backgroundPattern?: string
  onClick?: () => void
  className?: string
  align?: string
}

export function MasteryCard({
  title,
  progress,
  maxProgress,
  isLocked = false,
  isSelected = false,
  backgroundPattern,
  onClick,
  className,
  align = 'center',
}: MasteryCardProps) {
  return (
    <button
      className={cn(
        'relative w-full overflow-hidden rounded-lg transition-all duration-200',
        'h-[120px] bg-background/80 backdrop-blur-sm group',
        isLocked && 'opacity-50 cursor-not-allowed',
        !isLocked && 'cursor-pointer',
        isSelected && 'border border-2',
        progress === maxProgress && 'ring-2 ring-success',
        className,
      )}
      onClick={onClick}
      disabled={isLocked}
      aria-pressed={isSelected}
      type="button"
    >
      {/* Background Pattern */}
      <div
        className={cn(
          `absolute inset-0 bg-no-repeat opacity-30`,
          !isLocked && 'group-hover:opacity-100 duration-200',
          isSelected && 'opacity-100',
          align === 'top' && 'bg-top',
          align === 'bottom' && 'bg-bottom',
          align === 'center' && 'bg-center',
        )}
        style={{
          backgroundImage: backgroundPattern
            ? `url(${backgroundPattern})`
            : 'none',
          backgroundSize: 'cover',
        }}
      />

      {/* Content */}
      <div className="relative p-4 flex flex-col justify-between h-full text-left">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          {isLocked && <Lock className="w-5 h-5" />}
          {progress === maxProgress && (
            <CheckCircle className="w-5 h-5 text-success" />
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-1">
            <span>
              Level {progress}/{maxProgress}
            </span>
            <span className="text-primary">
              {Math.round((progress / maxProgress) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-background/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${(progress / maxProgress) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  )
}
