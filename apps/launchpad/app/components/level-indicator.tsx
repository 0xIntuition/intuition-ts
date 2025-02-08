import * as React from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

interface LevelIndicatorProps {
  level: number
  progress?: number // 0-100
}

export function LevelIndicator({ level, progress = 75 }: LevelIndicatorProps) {
  const circleSize = 192 // Size of the circle in pixels
  const strokeWidth = 8
  const radius = (circleSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative" style={{ width: circleSize, height: circleSize }}>
      {/* Level Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Text variant={TextVariant.heading2} className="text-4xl font-bold">
            {level}
          </Text>
          <Text variant={TextVariant.small} className="text-muted-foreground">
            LVL
          </Text>
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
          className="fill-none stroke-primary"
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
