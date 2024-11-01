import React from 'react'

import { Button, ButtonSize, ButtonVariant } from 'components/Button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'components/ContextMenu'
import { Icon, IconName } from 'components/Icon'
import { StakeButton, StakeButtonVariant } from 'components/StakeButton'
import { StakeTVL } from 'components/StakeTVL'
import { cn } from 'styles'
import { CurrencyType } from 'types'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  numPositionsFor: number
  numPositionsAgainst: number
  totalTVL: number
  tvlFor: number
  currency?: CurrencyType
}

const ClaimRow = ({
  numPositionsFor,
  numPositionsAgainst,
  totalTVL,
  tvlFor,
  currency = 'ETH',
  className,
  children,
}: ClaimRowProps) => {
  return (
    <div
      className={cn(
        `w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3 p-4`,
        className,
      )}
    >
      <div className="flex items-center gap-1">{children}</div>
      <div className="flex items-center gap-3">
        <StakeTVL
          totalTVL={totalTVL}
          tvlFor={tvlFor}
          currency={currency}
          isClaim={true}
        />
        <StakeButton
          variant={StakeButtonVariant.claimFor}
          numPositions={numPositionsFor}
        />
        <StakeButton
          variant={StakeButtonVariant.claimAgainst}
          numPositions={numPositionsAgainst}
        />
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

export { ClaimRow }
