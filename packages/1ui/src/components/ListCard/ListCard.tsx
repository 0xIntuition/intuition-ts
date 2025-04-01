import { cn } from 'styles'
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
  className?: string
}

const ListCard: React.FC<ListCardProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  buttonWrapper,
  className,
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
    <div
      className={cn(
        'relative flex flex-col min-w-[200px] max-w-[400px] h-auto p-5 bg-primary/5 border border-primary/20 rounded-xl overflow-hidden hover:bg-primary/10 hover:border-primary/50 transition-all duration-300',
        className,
      )}
    >
      <div className="aspect-square w-full">
        <Avatar
          variant={Identity.nonUser}
          src={imgSrc}
          name={displayName}
          className="w-full h-auto rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow mt-4">
        <div>
          <Trunctacular
            value={displayName}
            variant={TextVariant.bodyLarge}
            weight={TextWeight.medium}
            className="text-left text-primary/80"
            maxStringLength={40}
          />
          <Text variant={TextVariant.body} className="text-secondary/50 mt-2">
            {identitiesCount} identities
          </Text>
        </div>
        <div className="mt-4">
          {buttonWrapper ? buttonWrapper(button) : button}
        </div>
      </div>
    </div>
  )
}

export { ListCard }
