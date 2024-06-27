import * as React from 'react'

import { Currency, CurrencyType, Subject, SubjectType } from 'types'
import { formatWalletAddress } from 'utils'

import { Avatar, Badge, BadgeVariant, Text, TextVariant } from '..'

export interface IdentityCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SubjectType
  avatarSrc?: string
  name: string
  value: number
  currency: CurrencyType
  walletAddress: string
}

const IdentityCard = ({
  variant = Subject.identity,
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
        <Text variant={TextVariant.caption} className="text-muted-foreground">
          {formatWalletAddress(walletAddress)}
        </Text>
      </div>
    </div>
  )
}

export { IdentityCard }
