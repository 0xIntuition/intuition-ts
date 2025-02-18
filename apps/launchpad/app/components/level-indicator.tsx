import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { LevelIndicatorGraphic } from './svg/level-indicator-graphic'

interface LevelIndicatorProps {
  level: number
  progress: number // 0-100
}

export function LevelIndicator({ level, progress }: LevelIndicatorProps) {
  const circleSize = 200 // Size of the circle in pixels
  const strokeWidth = 8
  const radius = (circleSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative" style={{ width: circleSize, height: circleSize }}>
      {/* Level Display and Graphic */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <LevelIndicatorGraphic level={level} className="text-success/20" />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ marginTop: '-40px' }}
          >
            <div className="text-center gap-0 flex flex-col items-center justify-center">
              <Text variant={TextVariant.heading2} weight={TextWeight.bold}>
                {level}
              </Text>
              <Text
                variant={TextVariant.footnote}
                className="text-primary/50 -mt-3"
              >
                LVL
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Circle */}
      <svg
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        className="rotate-[-90deg]"
      >
        {/* Background Circle */}
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          className="fill-none stroke-primary/10"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          className="fill-none stroke-success"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
    </div>
  )
}
