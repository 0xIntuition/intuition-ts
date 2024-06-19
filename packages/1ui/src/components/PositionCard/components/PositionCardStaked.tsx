import { Text } from 'components/Text'

interface PositionCardStakedProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number
}

const PositionCardStaked = ({ amount, className }: PositionCardStakedProps) => {
  const formattedAmount = `${amount.toFixed(3)} ETH`

  return (
    <div className="flex flex-col">
      <Text variant="caption" className="text-muted-foreground mb-0.5">
        Amount Staked
      </Text>
      <Text variant="bodyLarge" weight="medium" className={className}>
        {formattedAmount}
      </Text>
    </div>
  )
}

export { PositionCardStaked }
