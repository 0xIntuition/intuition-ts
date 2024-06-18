import * as React from 'react'

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  size?: number
  percentage: number
}

const PieChart = ({
  width = 10,
  size = 80,
  percentage,
  ...props
}: PieChartProps) => {
  return (
    <div className="grid" {...props}>
      <span
        className="col-[1] row-[1] rounded-full block"
        style={{
          height: `${size}px`,
          width: `${size}px`,
          background: `conic-gradient(var(--primary) calc(${percentage}*1%),#0000 0)`,
          mask: `radial-gradient(farthest-side,#0000 calc(99% - ${width}px),#000 calc(100% - ${width}px)`,
        }}
      />
      <span
        className={`col-[1] row-[1] border-muted-foreground rounded-full block`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderWidth: `${width}px`,
        }}
      />
    </div>
  )
}

export { PieChart }
