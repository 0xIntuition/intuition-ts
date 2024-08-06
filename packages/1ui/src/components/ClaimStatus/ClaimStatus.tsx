import React from 'react'

interface ClaimStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  claimsForValue: string
  claimsAgainstValue: string
}

const ClaimStatus = ({
  claimsForValue = '0',
  claimsAgainstValue = '0',
  children,
}: ClaimStatusProps) => {
  const againstPercentage =
    +(+claimsForValue / (+claimsAgainstValue + +claimsForValue)) * 100

  console.log('againstPercentage', againstPercentage)
  return (
    <div className="flex flex-col justify-between max-md:w-full max-md:justify-center">
      <div className="flex items-center h-[6px] mb-4">
        <span
          className="h-full bg-against block rounded-l-sm"
          style={{ minWidth: `${againstPercentage}%` }}
        />
        <span className="h-full w-full bg-for block rounded-r-sm" />
      </div>
      {children}
    </div>
  )
}

export { ClaimStatus }
