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
  buttonText?: string
  onAction?: () => void
  className?: string
  imageUrl?: string
}

export function DiscoverCard({
  title,
  description,
  onAction,
  className,
  imageUrl = 'https://placehold.co/600x400/1a1a1a/ffffff', // Default placeholder
}: DiscoverCardProps) {
  return (
    <Card
      className={cn(
        'rounded-lg shadow-sm overflow-hidden aspect-square bg-black/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 p-0 relative group',
        className,
      )}
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full -mt-[15%] object-cover object-center"
      />
      <div className="absolute inset-0 to-transparent" />

      <div className="relative h-full p-6 flex flex-col justify-end">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Text
              variant={TextVariant.headline}
              weight={TextWeight.semibold}
              className="text-white"
            >
              {title}
            </Text>
            <Text variant={TextVariant.body} className="text-white/70">
              {description}
            </Text>
          </div>
          <div className="flex border-t border-white/10 pt-4">
            <Button
              onClick={onAction}
              variant={ButtonVariant.secondary}
              className="w-full justify-center bg-white/10 hover:bg-white/20 transition-colors"
            >
              Launch
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
