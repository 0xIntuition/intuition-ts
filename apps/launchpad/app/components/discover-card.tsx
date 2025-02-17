import {
  Button,
  ButtonVariant,
  Card,
  cn,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

export interface DiscoverCardProps {
  title: string
  description: string
  buttonText: string
  onAction?: () => void
  className?: string
  imageUrl?: string
}

export function DiscoverCard({
  title,
  description,
  buttonText,
  onAction,
  className,
  imageUrl = 'https://placehold.co/600x400/1a1a1a/ffffff', // Default placeholder
}: DiscoverCardProps) {
  return (
    <Card
      className={cn(
        'rounded-lg shadow-sm overflow-hidden h-80 bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 p-0',
        className,
      )}
    >
      <div className="relative justify-between flex flex-col h-full">
        <div className="w-full relative h-40">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
        </div>
        <div className="p-6 -mt-8 relative space-y-4">
          <div className="flex flex-col gap-2">
            <Text variant={TextVariant.headline} weight={TextWeight.semibold}>
              {title}
            </Text>
            <Text variant={TextVariant.body} className="text-primary/50">
              {description}
            </Text>
          </div>
          <div className="flex border-t border-border/20">
            <Button
              onClick={onAction}
              variant={ButtonVariant.secondary}
              className="w-full justify-center mt-4"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
