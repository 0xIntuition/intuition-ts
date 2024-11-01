import React, { useRef, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  CurrencyType,
  Icon,
  IconName,
  StakeButton,
  StakeButtonVariant,
  StakeTVL,
} from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  numPositionsFor: number
  numPositionsAgainst: number
  totalTVL: number
  tvlFor: number
  currency?: CurrencyType
  link?: string
}

const ClaimRow = ({
  numPositionsFor,
  numPositionsAgainst,
  totalTVL,
  tvlFor,
  currency = 'ETH',
  className,
  children,
  link,
}: ClaimRowProps) => {
  const navigate = useNavigate()
  const [isInteractiveElement, setIsInteractiveElement] = useState(false)
  const linkRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (!isInteractiveElement && link) {
      navigate(link)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const interactiveElement = target.closest(
      'a, button, .identity-tag, .hover-card',
    )
    setIsInteractiveElement(!!interactiveElement)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !isInteractiveElement && link) {
      navigate(link)
    }
  }

  return (
    <div
      ref={linkRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      role={isInteractiveElement ? undefined : 'button'}
      tabIndex={isInteractiveElement ? undefined : 0}
      className={cn(
        `w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3 p-4`,
        isInteractiveElement ? 'cursor-default' : 'cursor-pointer',
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
