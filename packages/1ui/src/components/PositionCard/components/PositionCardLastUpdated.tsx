import { Text } from 'components/Text'

interface PositionCardLastUpdatedProps {
  timestamp: string // UTC timestamp
  className?: string
}

const PositionCardLastUpdated = ({
  timestamp,
  className,
}: PositionCardLastUpdatedProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))

  return (
    <div className="flex flex-col max-lg:items-center">
      <Text
        variant="caption"
        weight="medium"
        className="text-muted-foreground mb-0.5"
      >
        Last Updated
      </Text>
      <Text variant="bodyLarge" weight="medium" className={className}>
        {formattedDate}
      </Text>
    </div>
  )
}

export { PositionCardLastUpdated }
