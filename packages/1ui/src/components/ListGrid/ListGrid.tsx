import * as React from 'react'

export interface ListGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  variant?: 'explore' | 'profile'
}

const ListGrid: React.FC<ListGridProps> = ({
  children,
  variant = 'profile',
  ...props
}) => {
  const gridClasses =
    variant === 'explore'
      ? 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4'
      : 'w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  )
}

export { ListGrid }
