import * as React from 'react'

import { Avatar } from 'components/Avatar'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { Text, TextVariant, TextWeight } from 'components/Text'

export interface ListIdentityCardProps {
  displayName: string
  imgSrc?: string
  identitiesCount: number
  savedAmount: string
  onSaveClick?: () => void
  isSaved?: boolean
}

export const ListIdentityCard: React.FC<ListIdentityCardProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  savedAmount,
  onSaveClick,
  isSaved,
}) => {
  return (
    <div
      className="theme-border p-8 rounded-xl flex flex-col items-center justify-between"
      style={{ height: '18rem' }}
    >
      {imgSrc && (
        <Avatar
          variant="non-user"
          src={imgSrc}
          name={displayName}
          className="mb-4 w-16 h-16"
        />
      )}
      <div className="text-center flex-grow flex flex-col justify-between items-center">
        <Text
          variant={TextVariant.bodyLarge}
          weight={TextWeight.medium}
          className="text-primary/80 mb-2"
        >
          {displayName}
        </Text>
        <Text variant={TextVariant.body} className="text-secondary/50 mb-2">
          {identitiesCount} identities
        </Text>
      </div>
      <Button variant="secondary" className="mt-4 w-full" onClick={onSaveClick}>
        {isSaved ? (
          <>
            <Icon
              name="bookmark-filled"
              className="w-3 h-3 text-primary mr-2"
            />
            Saved · {savedAmount} ETH
          </>
        ) : (
          <>Saved: {savedAmount} ETH</>
        )}
      </Button>
    </div>
  )
}
