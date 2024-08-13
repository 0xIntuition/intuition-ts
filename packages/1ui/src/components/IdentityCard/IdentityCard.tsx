import * as React from 'react'

import { Currency, CurrencyType, Identity, IdentityType } from 'types'

import {
  Avatar,
  Badge,
  BadgeVariant,
  Text,
  TextVariant,
  Trunctacular,
} from '..'

export interface IdentityCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  avatarSrc?: string
  name: string
  value: number
  currency?: CurrencyType
  walletAddress: string
}

const IdentityCard = ({
  variant = Identity.user,
  avatarSrc,
  name,
  value,
  currency = Currency.ETH,
  walletAddress,
  ...props
}: IdentityCardProps) => {
  return (
    <div className="flex gap-2 items-center" {...props}>
      <Avatar variant={variant} src={avatarSrc} name={name} />
      <div>
        <div className="flex gap-2 items-center">
          <Text variant={TextVariant.body} className="text-primary/80">
            {name.toLowerCase()}
          </Text>
          <Badge variant={BadgeVariant.default}>{`${value} ${currency}`}</Badge>
        </div>
        <Trunctacular
          variant={TextVariant.caption}
          value={walletAddress}
          className="text-muted-foreground"
        />
      </div>
    </div>
  )
}

export { IdentityCard }
