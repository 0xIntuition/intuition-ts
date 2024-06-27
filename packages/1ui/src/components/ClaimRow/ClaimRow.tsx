import * as React from 'react'

import { ClaimStatus } from 'components/Dataset'
import { CurrencyType } from 'types'

import { ClaimValueDisplay } from '..'

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
      <ClaimStatus claimsFor={claimsFor} claimsAgainst={claimsAgainst}>
        {children}
      </ClaimStatus>
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
