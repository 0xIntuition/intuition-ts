import * as React from 'react'

import { ClaimStatus, ClaimValueDisplay } from 'components'
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
  ...props
}: ClaimRowProps) => {
  return (
    <div className="flex justify-between items-center gap-2" {...props}>
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
