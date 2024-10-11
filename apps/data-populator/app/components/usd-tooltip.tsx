import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

export const UsdTooltip = ({
  ethValue,
  usdValue,
}: {
  ethValue: string
  usdValue: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{ethValue} ETH</TooltipTrigger>
        <TooltipContent>${usdValue} USD</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
