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
  totalTVL: string
  tvlFor: string
  tvlAgainst: string
  currency?: CurrencyType
  userPosition?: string
  positionDirection?: ClaimPositionType
  onStakeForClick: () => void
  onStakeAgainstClick: () => void
  isFirst?: boolean
  isLast?: boolean
}

const ClaimRow = ({
  numPositionsFor,
  numPositionsAgainst,
  totalTVL,
  tvlFor,
  tvlAgainst,
  currency = 'ETH',
  className,
  children,
  userPosition,
  positionDirection,
  onStakeForClick,
  onStakeAgainstClick,
  isFirst = true,
  isLast = true,
}: ClaimRowProps) => {
  return (
    <div
      className={cn(
        `w-full flex flex-col items-center bg-primary/5 border border-border/10`,
        isFirst && 'rounded-t-xl',
        isLast && 'rounded-b-xl',
        className,
      )}
    >
      <div
        className={cn(
          `w-full flex justify-between items-center p-4`,
          isFirst && 'rounded-t-xl',
          userPosition &&
            userPosition !== '0' &&
            (positionDirection === ClaimPosition.claimFor
              ? 'bg-gradient-to-r from-transparent to-for'
              : 'bg-gradient-to-r from-transparent to-against'),
        )}
      >
        <div className="flex items-center gap-1">{children}</div>
        <div className="flex items-center gap-3">
          <StakeTVL
            totalTVL={+totalTVL}
            tvlFor={+tvlFor}
            tvlAgainst={+tvlAgainst}
            currency={currency}
            isClaim={true}
            numPositionsFor={numPositionsFor}
            numPositionsAgainst={numPositionsAgainst}
          />
          <StakeButton
            variant={StakeButtonVariant.claimFor}
            numPositions={numPositionsFor}
            direction={ClaimPosition.claimFor}
            positionDirection={positionDirection}
            disabled={positionDirection === ClaimPosition.claimAgainst}
            onClick={onStakeForClick}
          />
          <StakeButton
            variant={StakeButtonVariant.claimAgainst}
            numPositions={numPositionsAgainst}
            direction={ClaimPosition.claimAgainst}
            positionDirection={positionDirection}
            disabled={positionDirection === ClaimPosition.claimFor}
            onClick={onStakeAgainstClick}
          />
          <ContextMenu>
            <ContextMenuTrigger disabled>
              <Button
                variant={ButtonVariant.text}
                size={ButtonSize.icon}
                disabled
              >
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
      {userPosition && userPosition !== '0' && (
        <div
          className={cn(
            `flex flex-row justify-end px-4 py-0.5 w-full items-center gap-1.5 h-9`,
            positionDirection === ClaimPosition.claimFor
              ? 'bg-for/10 text-for'
              : 'bg-against/10 text-against',
          )}
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
