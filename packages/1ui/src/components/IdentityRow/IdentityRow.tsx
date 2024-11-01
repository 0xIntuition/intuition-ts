import React from 'react'

import { ContextMenu } from 'components/ContextMenu'
import { IdentityTag, IdentityTagSize } from 'components/IdentityTag'
import { StakeButton } from 'components/StakeButton'
import { StakeTVL } from 'components/StakeTVL'
import { TagWithValueProps } from 'components/Tags'
import { cn } from 'styles'
import { CurrencyType, Identity, IdentityType } from 'types'

export interface IdentityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  totalTVL: number
  currency?: CurrencyType
  name: string
  description?: string
  claimLink?: string
  avatarSrc: string
  link: string
  ipfsLink: string
  numPositions: number
  tags?: TagWithValueProps[]
}

const IdentityRow = ({
  variant = Identity.user,
  totalTVL,
  currency,
  name,
  avatarSrc,
  link,
  numPositions,
  className,
}: IdentityRowProps) => {
  return (
    <div
      className={cn(
        `w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3 p-4`,
        className,
      )}
    >
      <div className="flex items-center">
        <a href={link}>
          <IdentityTag
            variant={variant}
            imgSrc={avatarSrc}
            size={IdentityTagSize.md}
          >
            {name}
          </IdentityTag>
        </a>
      </div>

      <div className="flex items-center gap-3">
        <StakeTVL totalTVL={totalTVL} currency={currency} />
        <StakeButton numPositions={numPositions} />
        <ContextMenu />
      </div>
    </div>
  )
}

export { IdentityRow }
