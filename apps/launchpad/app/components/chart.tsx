// TODO: This is from shadcn/ui. We should move this to 1ui along with other new components

import * as React from 'react'

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, children, config, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    )
  },
)
ChartContainer.displayName = 'ChartContainer'

export { ChartContainer }
