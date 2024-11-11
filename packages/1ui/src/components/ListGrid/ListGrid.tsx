import * as React from 'react'

import { ListCard, ListCardProps } from 'components'

export interface ListGridProps extends React.HTMLAttributes<HTMLDivElement> {
  identities?: ListCardProps[]
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
            <ListCard
              key={index}
              {...identity}
              buttonWrapper={(button) => (
                <span
                  role="link"
                  tabIndex={0}
                  className="w-full"
                  onClick={() => console.log('View clicked')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      console.log('View clicked')
                    }
                  }}
                >
                  {button}
                </span>
              )}
            />
          ))
        : React.Children.map(children, (child, index) => (
            <div key={index}>{child}</div>
          ))}
    </div>
  )
}

export { ListGrid }
