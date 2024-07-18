import * as React from 'react'

import { Avatar } from 'components/Avatar'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { Text, TextVariant, TextWeight } from 'components/Text'

export interface IdentityDisplay {
  displayName: string
  imgSrc?: string | null
  identitiesCount: number
  savedAmount: string
  onSaveClick?: () => void
  isSaved?: boolean
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
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7"
      {...props}
    >
      {identities
        ? identities.map((identity, index) => (
            <div
              key={index}
              className="theme-border p-8 rounded-xl flex flex-col items-center justify-between"
              style={{ height: '18rem' }}
            >
              {identity.imgSrc && (
                <Avatar
                  variant="non-user"
                  src={identity.imgSrc}
                  name={identity.displayName}
                  className="mb-4 w-16 h-16"
                />
              )}
              <div className="text-center flex-grow flex flex-col justify-between items-center">
                <Text
                  variant={TextVariant.bodyLarge}
                  weight={TextWeight.medium}
                  className="text-primary/80 mb-2"
                >
                  {identity.displayName}
                </Text>

                <Text
                  variant={TextVariant.body}
                  className="text-secondary/50 mb-2"
                >
                  {identity.identitiesCount} identities
                </Text>
              </div>
              <Button
                variant="secondary"
                className="mt-4 w-full"
                onClick={identity.onSaveClick}
              >
                {identity.isSaved ? (
                  <>
                    <Icon name="bookmark-filled" className="w-3 h-3 mr-2" />
                    Saved · {identity.savedAmount} ETH
                  </>
                ) : (
                  <>Saved: {identity.savedAmount} ETH</>
                )}
              </Button>
            </div>
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
