import { PieChart, PieChartSize } from 'components/PieChart'
import { Text } from 'components/Text'

interface PositionCardOwnershipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  percentOwnership: number
}

const PositionCardOwnership = ({
  percentOwnership,
  className,
}: PositionCardOwnershipProps) => {
  return (
    <div className="flex flex-col">
      <Text variant="caption" className="text-muted-foreground mb-0.5">
        Percent Ownership
      </Text>
      <div className="flex items-center">
        <Text variant="bodyLarge" className={`mr-2 ${className}`}>
          {`${percentOwnership}%`}
        </Text>
        <PieChart percentage={percentOwnership} size={PieChartSize.sm} />
      </div>
    </div>
  )
}

export { PositionCardOwnership }
