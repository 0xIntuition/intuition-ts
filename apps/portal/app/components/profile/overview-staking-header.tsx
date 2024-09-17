import React from 'react'

import {
  Button,
  ButtonVariant,
  Icon,
  IconName,
  MonetaryValue,
  Text,
  TextWeight,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

interface OverviewStakingHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  totalClaims: number
  totalIdentities: number
  totalStake: number
  link: string
  readOnly?: boolean
}

export function OverviewStakingHeader({
  totalClaims,
  totalIdentities,
  totalStake,
  link,
  ...props
}: OverviewStakingHeaderProps): React.ReactElement {
  return (
    <div
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl theme-border"
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <Text
          variant="body"
          weight={TextWeight.medium}
          className="text-foreground/70"
        >
          Staking
        </Text>
      </div>
      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-5">
        <div className="flex gap-10 max-sm:flex-col max-sm:gap-3 max-sm:items-center">
          <div className="flex gap-10">
            <div className="flex flex-col max-sm:items-center">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                Identities
              </Text>
              <Text variant="bodyLarge" weight="medium">
                {totalIdentities}
              </Text>
            </div>
            <div className="flex flex-col max-sm:items-center">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                Claims
              </Text>
              <Text variant="bodyLarge" weight="medium">
                {totalClaims}
              </Text>
            </div>
          </div>
          <div className="flex flex-col max-sm:items-center">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              TVL
            </Text>
            <MonetaryValue value={totalStake} currency="ETH" />
          </div>
        </div>
        <div className="flex">
          <Link to={link} prefetch="intent">
            <Button
              variant={ButtonVariant.secondary}
              className="w-full md:w-max"
            >
              <Icon name={IconName.ethereum} className="h-4 w-4" /> View All
              Positions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
