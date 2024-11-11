import * as React from 'react'

import { ListCard, ListIdentityCardProps } from 'components'

export interface ListGridProps extends React.HTMLAttributes<HTMLDivElement> {
  identities?: ListIdentityCardProps[]
  children?: React.ReactNode
}

const ListGrid: React.FC<ListGridProps> = ({
  identities,
  children,
  ...props
}) => {
  const gridClasses =
    'w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'

  return (
    <div className={gridClasses} {...props}>
      {identities
        ? identities.map((identity, index) => (
            <ListCard key={index} {...identity} />
          ))
        : React.Children.map(children, (child, index) => (
            <div key={index}>{child}</div>
          ))}
    </div>
  )
}

export { ListGrid }
