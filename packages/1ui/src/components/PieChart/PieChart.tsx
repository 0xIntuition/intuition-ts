import * as React from 'react'

export const PieChartSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

export const PieChartVariant = {
  default: 'default',
  forVsAgainst: 'forVsAgainst',
  for: 'for',
  against: 'against',
}

export type PieChartSizeType = (typeof PieChartSize)[keyof typeof PieChartSize]

export type PieChartVariantType =
  (typeof PieChartVariant)[keyof typeof PieChartVariant]

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PieChartVariantType
  size?: PieChartSizeType
  percentage: number
}

const determinePieChartSize = (size: PieChartSizeType) => {
  if (size === PieChartSize.sm) {
    return { size: 22, width: 2 }
  } else if (size === PieChartSize.md) {
    return { size: 80, width: 10 }
  }
  return { size: 160, width: 10 }
}

const determinePieChartColorScheme = (variant: PieChartVariantType) => {
  if (variant === PieChartVariant.forVsAgainst) {
    return {
      overlay: `var(--for)`,
      base: 'var(--against)',
    }
  }
  if (variant === PieChartVariant.for) {
    return {
      overlay: `var(--for)`,
      base: 'color-mix(in srgb, var(--background) 10%, transparent)',
    }
  }
  if (variant === PieChartVariant.against) {
    return {
      overlay: 'var(--against)',
      base: 'color-mix(in srgb, var(--background) 10%, transparent)',
    }
  }
  return {
    overlay: `var(--primary)`,
    base: 'color-mix(in srgb, var(--background) 10%, transparent)',
  }
}

const PieChart = ({
  variant = PieChartVariant.default,
  size = PieChartSize.md,
  percentage,
  ...props
}: PieChartProps) => {
  const sizeParams = determinePieChartSize(size)
  const colorScheme = determinePieChartColorScheme(variant)
  return (
    <div className="grid" {...props}>
      <span
        className="col-[1] row-[1] rounded-full block"
        style={{
          height: `${sizeParams.size}px`,
          width: `${sizeParams.size}px`,
          background: `conic-gradient(${colorScheme.overlay} calc(${percentage}*1%),${colorScheme.base} 0)`,
          mask: `radial-gradient(farthest-side,#0000 calc(99% - ${sizeParams.width}px),var(--background) calc(100% - ${sizeParams.width}px)`,
        }}
      />
      <span
        className={`col-[1] row-[1] border-muted-foreground rounded-full block`}
        style={{
          borderWidth: `${sizeParams.width}px`,
        }}
      />
    </div>
  )
}

export { PieChart }
