import * as React from 'react'

import { Avatar } from 'components/Avatar'
import { Button } from 'components/Button'
import { Text, TextVariant, TextWeight } from 'components/Text'

export interface IdentityDisplay {
  displayName: string
  image?: string | null
  identitiesCount: number
  savedAmount: string
  onSaveClick?: () => void
}

export interface ListGridProps extends React.HTMLAttributes<HTMLDivElement> {
  identities?: IdentityDisplay[]
  children?: React.ReactNode
}

const ListGrid: React.FC<ListGridProps> = ({
  identities,
  children,
  ...props
}) => {
  return (
    <div
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      {...props}
    >
      {identities
        ? identities.map((identity, index) => (
            <div
              key={index}
              className="theme-border p-8 rounded-xl flex flex-col items-center"
            >
              {identity.image && (
                <Avatar
                  variant="non-user"
                  src={identity.image}
                  name={identity.displayName}
                  className="mb-4 w-16 h-16"
                />
              )}
              <div className="text-center">
                {identity.displayName && (
                  <Text
                    variant={TextVariant.bodyLarge}
                    weight={TextWeight.medium}
                    className="text-primary/80 mb-2"
                  >
                    {identity.displayName}
                  </Text>
                )}
                <Text
                  variant={TextVariant.body}
                  className="text-secondary/50 mb-2"
                >
                  {identity.identitiesCount} identities
                </Text>
                <Button
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={identity.onSaveClick}
                >
                  Saved: {identity.savedAmount} ETH
                </Button>
              </div>
            </div>
          ))
        : React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="theme-border p-4 rounded-xl flex flex-col justify-center items-center"
            >
              {child}
            </div>
          ))}
    </div>
  )
}

export { ListGrid }
