import * as React from 'react'

import { Icon, IconName, Text, TextVariant } from '..'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  amountFor: number
  amountAgainst: number
  value: string
}

const ClaimRow = ({
  amountFor,
  amountAgainst,
  value,
  children,
  ...props
}: ClaimRowProps) => {
  const againstPercentage = (amountAgainst / (amountFor + amountAgainst)) * 100
  console.log(againstPercentage)
  return (
    <div className="flex-col gap-2" {...props}>
      <div className="flex justify-between items-center">
        <div className="flex items-center h-[6px] w-[60%]">
          <span
            className="h-full bg-against block rounded-l-sm"
            style={{ width: `${againstPercentage}%` }}
          />
          <span className="h-full w-full bg-for block rounded-r-sm" />
        </div>
        <Text variant={TextVariant.bodyLarge}>{value}</Text>
      </div>
      <div className="flex justify-between items-center">
        {children}
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center">
            <Icon name={IconName.people} className="text-against h-4 w-4" />
            <Text
              variant={TextVariant.body}
              className="text-secondary-foreground"
            >
              {amountAgainst}
            </Text>
          </div>
          <div className="flex gap-1 items-center">
            <Icon name={IconName.people} className="text-for h-4 w-4" />
            <Text
              variant={TextVariant.body}
              className="text-secondary-foreground"
            >
              {amountFor}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ClaimRow }
