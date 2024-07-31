import { formatWalletAddress } from 'utils'

import {
  Text,
  TextVariantType,
  TextWeightType,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '..'

export interface TrunctacularProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  value: string
  maxStringLength?: number
  variant?: TextVariantType
  weight?: TextWeightType
  disableTooltip?: boolean
}
const isValueWalletAddress = (value: string) =>
  value.substring(0, 2) === '0x' && value.length === 42
const isLongString = (value: string, maxStringLength: number) =>
  value.length > maxStringLength
const truncateStringValue = (value: string) => `${value.substring(0, 11)}...`

const Trunctacular = ({
  value,
  maxStringLength = 12,
  variant,
  weight,
  disableTooltip = false,
  ...props
}: TrunctacularProps) => {
  const textProps = { variant, weight, ...props }
  const content = isValueWalletAddress(value)
    ? formatWalletAddress(value)
    : isLongString(value, maxStringLength)
      ? truncateStringValue(value)
      : value

  if (
    (isValueWalletAddress(value) || isLongString(value, maxStringLength)) &&
    !disableTooltip
  ) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Text {...textProps}>{content}</Text>
          </TooltipTrigger>
          <TooltipContent>{value}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return <Text {...textProps}>{content}</Text>
}
export { Trunctacular }
