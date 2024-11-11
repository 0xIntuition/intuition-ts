import { CurrencyType, Identity } from 'types'

import {
  Avatar,
  Button,
  ButtonSize,
  ButtonVariant,
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
    <div className="flex flex-col items-center justify-between self-start w-[230px] gap-2 p-5 bg-primary/5 border border-primary/20 rounded-xl max-sm:h-fit max-sm:gap-px">
      <Avatar
        variant={Identity.nonUser}
        src={imgSrc}
        name={displayName}
        className="w-auto h-[180px] mb-2 rounded-xl"
      />
      <div className="flex flex-col justify-between w-full gap-2">
        <Trunctacular
          value={displayName}
          variant={TextVariant.bodyLarge}
          weight={TextWeight.medium}
          className="text-left text-primary/80"
          maxStringLength={40}
        />
        <Text variant={TextVariant.body} className="text-secondary/50">
          {identitiesCount} identities
        </Text>
      </div>
      <Button
        variant={ButtonVariant.secondary}
        size={ButtonSize.lg}
        className="w-full"
        onClick={onViewClick}
      >
        View List
      </Button>
    </div>
  )
}
