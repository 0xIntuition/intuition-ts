import React from 'react'

import {
  Button,
  ButtonVariant,
  formatNumber,
  Icon,
  IconName,
  Text,
  TextWeight,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export const OverviewCreatedHeaderVariants = {
  identities: 'identities',
  claims: 'claims',
} as const

export type OverviewCreatedHeaderVariantType =
  (typeof OverviewCreatedHeaderVariants)[keyof typeof OverviewCreatedHeaderVariants]

interface OverviewCreatedHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: OverviewCreatedHeaderVariantType
  totalCreated: number
  link: string
}

export function OverviewCreatedHeader({
  variant,
  totalCreated,
  link,
  ...props
}: OverviewCreatedHeaderProps) {
  return (
    <div
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl theme-border"
      {...props}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <Text
            variant="body"
            weight={TextWeight.medium}
            className="text-foreground/70"
          >
            Created {variant === 'claims' ? 'Claims' : 'Identities'}
          </Text>
          <Text
            variant="bodyLarge"
            weight="medium"
            className="items-center max-sm:items-start"
          >
            {formatNumber(totalCreated ?? 0)}
          </Text>
        </div>
        <div className="flex flex-col items-end justify-end ml-auto">
          <Link to={link} prefetch="intent">
            <Button variant={ButtonVariant.secondary} className="w-max mb-1">
              <Icon
                name={
                  variant === 'claims' ? IconName.claim : IconName.fingerprint
                }
                className="h-4 w-4"
              />{' '}
              View All {variant === 'claims' ? 'Claims' : 'Identities'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
