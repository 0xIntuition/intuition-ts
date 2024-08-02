import {
  Avatar,
  Button,
  CurrencyType,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

export interface ListIdentityCardPortalProps {
  displayName: string
  imgSrc?: string
  identitiesCount?: number
  savedAmount?: string
  onSaveClick?: () => void
  onViewClick?: () => void
  isSaved?: boolean
  currency?: CurrencyType
}

export const ListIdentityCardPortal: React.FC<ListIdentityCardPortalProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  onViewClick,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-between"
      style={{ height: '18rem' }}
    >
      <Avatar
        variant="non-user"
        src={imgSrc}
        name={displayName}
        className="mb-4 w-16 h-16"
      />

      <div className="text-center flex-grow flex flex-col justify-between items-center">
        <Text
          variant={TextVariant.bodyLarge}
          weight={TextWeight.medium}
          className="text-primary/80 mb-2"
        >
          {displayName.length > 20
            ? `${displayName.substring(0, 17)}...`
            : displayName}
        </Text>

        <Text variant={TextVariant.body} className="text-secondary/50 mb-2">
          {identitiesCount} identities
        </Text>
      </div>
      <Button variant="secondary" className="mt-4 w-full" onClick={onViewClick}>
        View List
        <Icon name="arrow-up-right" className="w-3 h-3 text-primary mr-2" />
      </Button>
    </div>
  )
}
