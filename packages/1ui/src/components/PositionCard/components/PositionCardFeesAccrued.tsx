import { Text } from 'components/Text'

interface PositionCardFeesAccruedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  amount: number
}

const PositionCardFeesAccrued = ({
  amount,
  className,
}: PositionCardFeesAccruedProps) => {
  const formattedAmount = `${amount > 0 ? '+' : amount < 0 ? '-' : ''}${Math.abs(amount).toFixed(3)} ETH`
  const amountClass =
    amount > 0
      ? 'text-success'
      : amount < 0
        ? 'text-destructive-foreground'
        : 'text-muted-foreground'

  return (
    <div className="flex flex-col">
      <Text
        variant="caption"
        weight="medium"
        className="text-muted-foreground mb-0.5"
      >
        Fees Accrued
      </Text>
      <Text
        variant="bodyLarge"
        weight="medium"
        className={`${amountClass} ${className}`}
      >
        {formattedAmount}
      </Text>
    </div>
  )
}

export { PositionCardFeesAccrued }
