import React, { useRef, useState } from 'react'

import {
  ClaimStatus,
  ClaimValueDisplay,
  cn,
  CurrencyType,
} from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  claimsFor: number
  claimsAgainst: number
  claimsForValue?: number
  claimsAgainstValue?: number
  tvl: number
  currency?: CurrencyType
  claimLink?: string
}

const ClaimRow = ({
  claimsFor = 0,
  claimsAgainst = 0,
  tvl,
  claimsForValue = 0,
  claimsAgainstValue = 0,
  currency,
  children,
  className,
  claimLink,
}: ClaimRowProps) => {
  const navigate = useNavigate()
  const [isInteractiveElement, setIsInteractiveElement] = useState(false)
  const linkRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !isInteractiveElement &&
      claimLink &&
      event.target === linkRef.current
    ) {
      navigate(claimLink)
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
    if (event.key === 'Enter' && !isInteractiveElement && claimLink) {
      navigate(claimLink)
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
        `flex justify-between items-center gap-2 max-md:flex-col p-6`,
        `hover:bg-secondary/10 transition-colors duration-200 group`,
        isInteractiveElement ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
    >
      <div className="w-[60%] max-md:w-full">
        <ClaimStatus
          claimsFor={claimsFor}
          claimsAgainst={claimsAgainst}
          claimsForValue={claimsForValue}
          claimsAgainstValue={claimsAgainstValue}
        >
          {children}
        </ClaimStatus>
      </div>
      <div className="w-[40%] max-md:w-full">
        <ClaimValueDisplay
          tvl={tvl}
          currency={currency}
          claimsFor={claimsFor}
          claimsAgainst={claimsAgainst}
        />
      </div>
    </div>
  )
}

export { ClaimRow }
