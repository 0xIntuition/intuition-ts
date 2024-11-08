import { CurrencyType, Identity } from 'types'

import {
  Avatar,
  Button,
  Icon,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '..'

export interface ListCardProps {
  displayName: string
  imgSrc?: string
  identitiesCount?: number
  savedAmount?: string
  onSaveClick?: () => void
  onViewClick?: () => void
  isSaved?: boolean
  currency?: CurrencyType
}

export const ListCard: React.FC<ListCardProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  onViewClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 h-72 max-sm:h-fit max-sm:gap-px">
      <Avatar
        variant={Identity.nonUser}
        src={imgSrc}
        name={displayName}
        className="mb-2 w-16 h-16"
      />
      <div className="text-center flex flex-col justify-between items-center gap-2">
        <Trunctacular
          value={displayName}
          variant={TextVariant.bodyLarge}
          weight={TextWeight.medium}
          className="text-primary/80"
          maxStringLength={40}
        />
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
