import { Identity } from 'types'

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
  buttonWrapper?: (button: React.ReactElement) => React.ReactElement
}

const ListCard: React.FC<ListCardProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  buttonWrapper,
}) => {
  const button = (
    <Button
      variant={ButtonVariant.secondary}
      size={ButtonSize.lg}
      className="w-full"
    >
      View List
    </Button>
  )

  return (
    <div className="relative h-full w-[230px] max-sm:h-fit flex flex-col items-center gap-2 max-sm:gap-px p-5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
      <Avatar
        variant={Identity.nonUser}
        src={imgSrc}
        name={displayName}
        className="h-[180px] w-auto mb-2 rounded-xl"
      />
      <div className="w-full flex flex-col flex-grow gap-2">
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
      {buttonWrapper ? buttonWrapper(button) : button}
    </div>
  )
}

export { ListCard }
