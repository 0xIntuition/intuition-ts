import React from 'react'

interface ClaimStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  claimsFor: number
  claimsAgainst: number
}

const ClaimStatus = ({
  claimsFor = 0,
  claimsAgainst = 0,
  children,
}: ClaimStatusProps) => {
  const againstPercentage = (claimsAgainst / (claimsFor + claimsAgainst)) * 100
  return (
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
  )
}

export { ClaimStatus }
