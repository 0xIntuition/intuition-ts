import * as React from 'react'

import { ClaimPosition, ClaimPositionType, Currency, CurrencyType } from 'types'

import { Tag, TagSize, TagVariant, Text, TextVariant } from '..'

export interface ActivePositionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  claimPosition?: ClaimPositionType | null
  label?: string
  value: number
  currency?: CurrencyType
}

const ActivePositionCard = ({
  claimPosition,
  label,
  value,
  currency = Currency.ETH,
  ...props
}: ActivePositionCardProps) => {
  let badgeData = {
    variant: TagVariant.for,
    label: 'FOR',
  }

  if (claimPosition === ClaimPosition.claimAgainst) {
    badgeData = {
      variant: TagVariant.against,
      label: 'AGAINST',
    }
  }

  return (
    <div
      className="flex justify-between items-center border border-border/10 rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
      {...props}
    >
      <Text variant={TextVariant.body} className="text-foreground/50">
        {label ?? 'Your Active Position'}
      </Text>
      <div className="flex items-center gap-2">
        {claimPosition && (
          <Tag variant={badgeData.variant} size={TagSize.sm}>
            {badgeData.label}
          </Tag>
        )}
        <Text variant={TextVariant.body}>{`${value} ${currency}`}</Text>
      </div>
    </div>
  )
}

export { ActivePositionCard }
