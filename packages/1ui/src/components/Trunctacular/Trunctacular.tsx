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
  ...props
}: TrunctacularProps) => {
  const textProps = { variant, weight, ...props }

  if (isValueWalletAddress(value) || isLongString(value, maxStringLength)) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Text {...textProps}>
              {isValueWalletAddress(value)
                ? formatWalletAddress(value)
                : truncateStringValue(value)}
            </Text>
          </TooltipTrigger>
          <TooltipContent>{value}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return <Text {...textProps}>{value}</Text>
}

export { Trunctacular }
