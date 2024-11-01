import React from 'react'

import { Button, ButtonSize, ButtonVariant } from 'components/Button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'components/ContextMenu'
import { Icon, IconName } from 'components/Icon'
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
        <ContextMenu>
          <ContextMenuTrigger>
            <Button variant={ButtonVariant.navigation} size={ButtonSize.icon}>
              <Icon name={IconName.context} className="h-4 w-4" />
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Settings</ContextMenuItem>
            <ContextMenuItem>Logout</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  )
}

export { IdentityRow }
