import * as React from 'react'

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
  const againstPercentage = (claimsAgainst / (claimsFor + claimsAgainst)) * 100

  return (
    <div className="flex justify-between items-center gap-2" {...props}>
      <div className="flex flex-col justify-between w-[60%]">
        <div className="flex items-center h-[6px] mb-4">
          <span
            className="h-full bg-against block rounded-l-sm"
            style={{ minWidth: `${againstPercentage}%` }}
          />
          <span className="h-full w-full bg-for block rounded-r-sm" />
        </div>
        {children}
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
