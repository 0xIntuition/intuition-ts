import { Button } from 'components/Button'
import { cn } from 'styles'

interface PositionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onButtonClick?: () => void
}

const PositionCard = ({
  children,
  onButtonClick,
  className,
}: PositionCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start w-full min-w-80 p-5 theme-border rounded-xl',
        className,
      )}
    >
      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-medium text-white">Your Position</h3>
      </div>
      <div className="w-full grid grid-cols-2 gap-5">{children}</div>

      <Button
        variant="destructiveOutline"
        onClick={onButtonClick}
        className="w-full mt-5"
      >
        Redeem
      </Button>
    </div>
  )
}

export { PositionCard }
