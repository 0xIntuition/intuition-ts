import type React from 'react'

import { Button, ButtonSize, ButtonVariant } from 'components/Button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'components/ContextMenu'
import { Icon, IconName } from 'components/Icon'
import { Separator } from 'components/Separator'
import { StakeButton, StakeButtonVariant } from 'components/StakeButton'
import { StakeTVL } from 'components/StakeTVL'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'
import { ClaimPosition, type ClaimPositionType, type CurrencyType } from 'types'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  numPositionsFor: number
  numPositionsAgainst: number
  totalTVL: string
  tvlFor: string
  tvlAgainst: string
  currency?: CurrencyType
  userPosition?: string
  positionDirection?: ClaimPositionType
  onStakeForClick?: () => void
  onStakeAgainstClick?: () => void
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
        `w-full flex flex-col items-center border border-border/10 overflow-hidden`,
        isFirst && 'rounded-t-xl',
        isLast && 'rounded-b-xl',
        className,
      )}
    >
      <div
        style={{
          backgroundImage:
            userPosition && userPosition !== '0'
              ? positionDirection === ClaimPosition.claimFor
                ? 'linear-gradient(to right, transparent, rgba(0, 111, 232, 0.3))'
                : 'linear-gradient(to right, transparent, rgba(255, 149, 0, 0.3))'
              : 'none',
        }}
        className={cn(
          `w-full flex flex-col md:flex-row justify-between items-center p-4 max-sm:gap-6`,
          isFirst && 'rounded-t-xl',
        )}
      >
        <div className="flex w-full items-start md:items-center gap-1">
          {children}
          <ContextMenu>
            <ContextMenuTrigger className="sm:hidden ml-auto">
              <Button variant={ButtonVariant.text} size={ButtonSize.icon}>
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
        <Separator className="md:hidden" />
        <div className="flex items-center gap-3 max-sm:w-full">
          <StakeTVL
            totalTVL={+totalTVL}
            tvlFor={+tvlFor}
            tvlAgainst={+tvlAgainst}
            currency={currency}
            isClaim={true}
            numPositionsFor={numPositionsFor}
            numPositionsAgainst={numPositionsAgainst}
          />
          {!!onStakeForClick && !!onStakeAgainstClick && (
            <>
              <StakeButton
                variant={StakeButtonVariant.claimFor}
                numPositions={numPositionsFor}
                direction={ClaimPosition.claimFor}
                positionDirection={positionDirection}
                disabled={positionDirection === ClaimPosition.claimAgainst}
                onClick={onStakeForClick}
                className="max-sm:w-full"
              />
              <StakeButton
                variant={StakeButtonVariant.claimAgainst}
                numPositions={numPositionsAgainst}
                direction={ClaimPosition.claimAgainst}
                positionDirection={positionDirection}
                disabled={positionDirection === ClaimPosition.claimFor}
                onClick={onStakeAgainstClick}
                className="max-sm:w-full"
              />
            </>
          )}
          <ContextMenu>
            <ContextMenuTrigger disabled className="max-sm:hidden">
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
          style={{
            backgroundImage:
              positionDirection === ClaimPosition.claimFor
                ? 'linear-gradient(to right, transparent, rgba(0, 111, 232, 0.3))'
                : 'linear-gradient(to right, transparent, rgba(255, 149, 0, 0.3))',
          }}
          className={cn(
            `flex flex-row justify-center md:justify-end px-4 py-0.5 w-full items-center gap-1.5 h-14 md:h-9`,
            isLast && 'rounded-b-xl',
            positionDirection === ClaimPosition.claimFor
              ? 'text-for'
              : 'text-against',
          )}
        >
          <Icon name={IconName.arrowUp} className="h-4 w-4" />
          <Text variant={TextVariant.caption} className={cn('text-inherit')}>
            You have staked {userPosition} {currency} {positionDirection} this
            claim
          </Text>
        </div>
      )}
    </div>
  )
}

export { ClaimRow }
