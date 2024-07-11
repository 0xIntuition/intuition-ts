import * as React from 'react'

import { ClaimStatus, ClaimValueDisplay } from 'components'
import { cn } from 'styles'
import { CurrencyType } from 'types'

export interface ClaimRowProps extends React.HTMLAttributes<HTMLDivElement> {
  claimsFor: number
  claimsAgainst: number
  amount: number
  currency?: CurrencyType
}

const ClaimRow = ({
  claimsFor = 0,
  claimsAgainst = 0,
  amount,
  currency,
  children,
  className,
  ...props
}: ClaimRowProps) => {
  return (
    <div
      className={cn(`flex justify-between items-center gap-2`, className)}
      {...props}
    >
      <div className="w-[60%]">
        <ClaimStatus claimsFor={claimsFor} claimsAgainst={claimsAgainst}>
          {children}
        </ClaimStatus>
      </div>
      <div className="w-[40%]">
        <ClaimValueDisplay
          value={amount}
          currency={currency}
          claimsFor={claimsFor}
          claimsAgainst={claimsAgainst}
        />
      </div>
    </div>
  )
}

export { ClaimRow }
