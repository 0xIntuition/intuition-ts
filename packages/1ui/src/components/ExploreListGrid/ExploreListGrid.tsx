import * as React from 'react'

export interface ExploreListGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ExploreListGrid: React.FC<ExploreListGridProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
      {...props}
    >
      {children}
    </div>
  )
}

export { ExploreListGrid }
