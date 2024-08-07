import React from 'react'

import {
  Button,
  ButtonVariant,
  IdentityTag,
  MonetaryValue,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { Link } from '@remix-run/react'

export const DataAboutHeaderVariants = {
  positions: 'positions',
  claims: 'claims',
} as const

export type OverviewAboutHeaderVariantType =
  (typeof DataAboutHeaderVariants)[keyof typeof DataAboutHeaderVariants]

interface OverviewAboutHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: OverviewAboutHeaderVariantType
  userIdentity: IdentityPresenter
  totalClaims?: number
  totalPositions?: number
  totalStake: number
  link: string
}

export function OverviewAboutHeader({
  variant,
  userIdentity,
  totalClaims,
  totalPositions,
  totalStake,
  link,
  ...props
}: OverviewAboutHeaderProps) {
  return (
    <div
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl border border-neutral-300/20 max-md:items-center"
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <Text
          variant="body"
          weight="regular"
          className="text-secondary-foreground"
        >
          {variant === 'claims' ? 'Claims about' : 'Positions staked on'}
        </Text>
        <IdentityTag
          imgSrc={userIdentity?.user?.image ?? userIdentity?.image}
          variant={userIdentity?.user ? 'user' : 'non-user'}
        >
          <Trunctacular
            value={
              userIdentity?.user?.display_name ?? userIdentity?.display_name
            }
            maxStringLength={40}
          />
        </IdentityTag>
      </div>
      <div className="flex w-full gap-10">
        <div className="flex flex-col items-end max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            {variant === 'claims' ? 'Claims' : 'Positions'}
          </Text>
          <Text variant="bodyLarge" weight="medium" className="items-center">
            {variant === 'claims' ? totalClaims ?? 0 : totalPositions ?? 0}
          </Text>
        </div>
        <div className="flex flex-col items-end max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Total stake
          </Text>
          <MonetaryValue value={totalStake} currency="ETH" />
        </div>
        <div className="flex flex-col items-end justify-end ml-auto">
          <Link to={link} prefetch="intent">
            <Button variant={ButtonVariant.secondary} className="w-max mb-1">
              View All {variant === 'claims' ? 'Claims' : 'Positions'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
