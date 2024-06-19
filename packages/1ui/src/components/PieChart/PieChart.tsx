import * as React from 'react'

export const PieChartSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

export type PieCartSizeType = (typeof PieChartSize)[keyof typeof PieChartSize]

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: PieCartSizeType
  percentage: number
}

const determinePieChartSize = (size: PieCartSizeType) => {
  if (size === PieChartSize.sm) {
    return { size: 22, width: 2 }
  } else if (size === PieChartSize.md) {
    return { size: 80, width: 10 }
  }
  return { size: 120, width: 14 }
}

const PieChart = ({
  size = PieChartSize.md,
  percentage,
  ...props
}: PieChartProps) => {
  const sizeParams = determinePieChartSize(size)
  return (
    <div className="grid" {...props}>
      <span
        className="col-[1] row-[1] rounded-full block"
        style={{
          height: `${sizeParams.size}px`,
          width: `${sizeParams.size}px`,
          background: `conic-gradient(var(--primary) calc(${percentage}*1%),#0000 0)`,
          mask: `radial-gradient(farthest-side,#0000 calc(99% - ${sizeParams.width}px),#000 calc(100% - ${sizeParams.width}px)`,
        }}
      />
      <span
        className={`col-[1] row-[1] border-muted-foreground rounded-full block`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderWidth: `${sizeParams.width}px`,
        }}
      />
    </div>
  )
}

export { PieChart }
