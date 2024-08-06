import * as React from 'react'

import { ClaimStatus, ClaimValueDisplay } from 'components'
import { cn } from 'styles'
import { CurrencyType } from 'types'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  claimsFor: number
  claimsAgainst: number
  claimsForValue: number
  claimsAgainstValue: number
  tvl: number
  currency?: CurrencyType
}

const ClaimRow = ({
  claimsFor = 0,
  claimsAgainst = 0,
  tvl,
  claimsForValue,
  claimsAgainstValue,
  currency,
  children,
  className,
  ...props
}: ClaimRowProps) => {
  return (
    <div
      className={cn(
        `flex justify-between items-center gap-2 max-md:flex-col`,
        className,
      )}
      {...props}
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
