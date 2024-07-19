import * as React from 'react'

import { ListIdentityCard, ListIdentityCardProps } from 'components'

export interface ListGridProps extends React.HTMLAttributes<HTMLDivElement> {
  identities?: ListIdentityCardProps[]
  children?: React.ReactNode
}

const ListGrid: React.FC<ListGridProps> = ({
  identities,
  children,
  ...props
}) => {
  return (
    <div
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7"
      {...props}
    >
      {identities
        ? identities.map((identity, index) => (
            <ListIdentityCard key={index} {...identity} />
          ))
        : React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="theme-border p-8 rounded-xl flex flex-col justify-center items-center"
              style={{ height: '18rem' }}
            >
              {child}
            </div>
          ))}
    </div>
  )
}

export { ListGrid }
