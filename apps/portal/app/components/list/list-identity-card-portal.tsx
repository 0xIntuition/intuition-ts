import {
  Avatar,
  Button,
  Currency,
  CurrencyType,
  Icon,
  Identity,
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
  isSaved?: boolean
  currency?: CurrencyType
}

export const ListIdentityCardPortal: React.FC<ListIdentityCardPortalProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  savedAmount,
  onSaveClick,
  isSaved,

  currency = Currency.ETH,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-between"
      style={{ height: '18rem' }}
    >
      <Avatar
        variant={Identity.nonUser as unknown as number}
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
          {displayName}
        </Text>
        <Text variant={TextVariant.body} className="text-secondary/50 mb-2">
          {identitiesCount} identities
        </Text>
      </div>
      {isSaved === true ? (
        <Button variant="secondary" className="mt-4 w-full">
          <Icon name="bookmark-filled" className="w-3 h-3 text-primary mr-2" />
          {savedAmount ? `Saved · ${savedAmount} ${currency}` : 'Saved'}
        </Button>
      ) : (
        <Button variant="primary" className="mt-4 w-full" onClick={onSaveClick}>
          <Icon
            name="bookmark"
            className="w-3 h-3 text-primary-foreground mr-2"
          />
          Save list
        </Button>
      )}
    </div>
  )
}
