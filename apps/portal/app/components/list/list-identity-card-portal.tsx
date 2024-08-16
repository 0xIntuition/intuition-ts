import {
  Avatar,
  Button,
  CurrencyType,
  Icon,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export interface ListIdentityCardPortalProps {
  displayName: string
  imgSrc?: string
  identitiesCount?: number
  savedAmount?: string
  onSaveClick?: () => void
  onViewClick?: () => void
  isSaved?: boolean
  currency?: CurrencyType
  navigateLink?: string
}

export const ListIdentityCardPortal: React.FC<ListIdentityCardPortalProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  onViewClick,
  navigateLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 h-72 max-sm:h-fit max-sm:gap-px">
      {navigateLink ? (
        <Link to={navigateLink} prefetch="intent">
          <Avatar
            variant="non-user"
            src={imgSrc}
            name={displayName}
            className="mb-2 w-16 h-16"
          />
        </Link>
      ) : (
        <Avatar
          variant="non-user"
          src={imgSrc}
          name={displayName}
          className="mb-2 w-16 h-16"
        />
      )}
      <div className="text-center flex flex-col justify-between items-center gap-2">
        {navigateLink ? (
          <Link to={navigateLink} prefetch="intent">
            <Trunctacular
              value={displayName}
              variant={TextVariant.bodyLarge}
              weight={TextWeight.medium}
              className="text-primary/80"
              maxStringLength={40}
            />
          </Link>
        ) : (
          <Trunctacular
            value={displayName}
            variant={TextVariant.bodyLarge}
            weight={TextWeight.medium}
            className="text-primary/80"
            maxStringLength={40}
          />
        )}
        <Text variant={TextVariant.body} className="text-secondary/50">
          {identitiesCount} identities
        </Text>
      </div>
      <Button variant="secondary" className="mt-4" onClick={onViewClick}>
        View List
        <Icon name="arrow-up-right" className="w-3 h-3 text-primary" />
      </Button>
    </div>
  )
}
