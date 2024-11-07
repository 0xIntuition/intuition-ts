import * as React from 'react'

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
const truncateStringValue = (value: string, maxLength: number) =>
  `${value.substring(0, maxLength - 3)}...`

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
      ? truncateStringValue(value, maxStringLength)
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
          <TooltipContent>
            <Text {...textProps}>{value}</Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Text {...textProps} {...props}>
      {content}
    </Text>
  )
}

export { Trunctacular }
