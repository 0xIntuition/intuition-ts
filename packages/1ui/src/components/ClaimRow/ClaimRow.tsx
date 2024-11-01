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
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'
import { ClaimPosition, ClaimPositionType, CurrencyType } from 'types'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  numPositionsFor: number
  numPositionsAgainst: number
  totalTVL: number
  tvlFor: number
  currency?: CurrencyType
  userPosition?: number
  positionDirection?: ClaimPositionType
}

const ClaimRow = ({
  numPositionsFor,
  numPositionsAgainst,
  totalTVL,
  tvlFor,
  currency = 'ETH',
  className,
  children,
  userPosition,
  positionDirection,
}: ClaimRowProps) => {
  return (
    <div
      className={cn(
        `w-full flex flex-col items-center bg-primary/5 border border-border/10 rounded-lg max-sm:flex-col max-sm:gap-3`,
        className,
      )}
    >
      <div
        className={`w-full flex justify-between items-center p-4 rounded-t-lg ${userPosition && (positionDirection === ClaimPosition.claimFor ? 'bg-gradient-to-r from-transparent to-for' : 'bg-gradient-to-r from-transparent to-against')}`}
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
            direction={ClaimPosition.claimFor}
            positionDirection={positionDirection}
            disabled={positionDirection === ClaimPosition.claimAgainst}
          />
          <StakeButton
            variant={StakeButtonVariant.claimAgainst}
            numPositions={numPositionsAgainst}
            direction={ClaimPosition.claimAgainst}
            positionDirection={positionDirection}
            disabled={positionDirection === ClaimPosition.claimFor}
          />
          <ContextMenu>
            <ContextMenuTrigger>
              <Button variant={ButtonVariant.navigation} size={ButtonSize.icon}>
                <Icon
                  name={IconName.context}
                  className="text-secondary/70 h-4 w-4"
                />
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
      {userPosition && (
        <div
          className={`flex flex-row justify-end px-4 py-0.5 w-full items-center gap-1.5 h-9 ${
            positionDirection === ClaimPosition.claimFor
              ? 'bg-for/10 text-for'
              : 'bg-against/10 text-against'
          }`}
        >
          <Icon name={IconName.arrowUp} className="h-4 w-4" />
          <Text variant={TextVariant.caption} className="text-inherit">
            You have staked {userPosition} {currency} {positionDirection} this
            claim
          </Text>
        </div>
      )}
    </div>
  )
}

export { ClaimRow }
