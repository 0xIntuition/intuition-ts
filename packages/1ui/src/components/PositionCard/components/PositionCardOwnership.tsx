import {
  PieChart,
  PieChartSize,
  PieChartVariantType,
} from 'components/PieChart'
import { Text } from 'components/Text'

interface PositionCardOwnershipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: PieChartVariantType
  percentOwnership: number
}

const PositionCardOwnership = ({
  variant,
  percentOwnership,
  className,
}: PositionCardOwnershipProps) => {
  return (
    <div className="flex flex-col items-end justify-end md:items-start md:justify-start">
      <Text variant="caption" className="text-muted-foreground mb-0.5">
        Percent Ownership
      </Text>
      <div className="flex items-center">
        <Text variant="bodyLarge" className={`mr-2 ${className}`}>
          {`${percentOwnership}%`}
        </Text>
        <PieChart
          percentage={percentOwnership}
          size={PieChartSize.sm}
          variant={variant}
        />
      </div>
    </div>
  )
}

export { PositionCardOwnership }
