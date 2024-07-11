import { Button } from 'components/Button'

interface PositionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onButtonClick?: () => void
}

const PositionCard = ({ children, onButtonClick }: PositionCardProps) => {
  return (
    <div className="flex flex-col justify-start items-start w-[300px] p-5 theme-border rounded-xl">
      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-medium text-white">Your Position</h3>
      </div>
      <div className="w-full grid grid-cols-2 gap-5">{children}</div>

      <Button
        variant="destructiveOutline"
        onClick={onButtonClick}
        className="w-full mt-5"
      >
        Sell
      </Button>
    </div>
  )
}

export { PositionCard }
