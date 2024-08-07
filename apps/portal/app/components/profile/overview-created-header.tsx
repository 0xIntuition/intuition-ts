import React from 'react'

import { Button, ButtonVariant, Text } from '@0xintuition/1ui'

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
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl border border-neutral-300/20 max-md:items-center"
      {...props}
    >
      <div className="flex w-full gap-10">
        <div className="flex flex-col max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Created {variant === 'claims' ? 'Claims' : 'Identities'}
          </Text>
          <Text variant="bodyLarge" weight="medium" className="items-center">
            {totalCreated ?? 0}
          </Text>
        </div>
        <div className="flex flex-col items-end justify-end ml-auto">
          <Link to={link} prefetch="intent">
            <Button variant={ButtonVariant.secondary} className="w-max mb-1">
              View All {variant === 'claims' ? 'Claims' : 'Identities'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
